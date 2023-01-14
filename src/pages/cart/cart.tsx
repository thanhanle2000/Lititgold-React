import './cart_styles.css';
import React, { useEffect, useState } from 'react';
import { numberWithComma, URL } from '../../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Icon, Page, useNavigate } from 'zmp-ui';
import cx from '../../utils/cx';
import HandleConfirmCart from '../handle_confirm/handle_confim_cart';

function CartPage() {
    const [numberQuanti, setNumberQuanti] = useState(1);
    const lstCart = JSON.parse(localStorage.getItem('cart') || "[]");
    const [data, setData] = useState(lstCart);
    const [items, setItems] = useState(lstCart);
    // lấy tổng sản phẩm từ cart
    let sum = data.reduce(function (prev, current) {
        return prev + +current.qty
    }, 0);
    // lấy tổng tiền
    let total = data.reduce(function (prev, current) {
        return prev + +(current.price * current.qty)
    }, 0);
    // khởi tạo giá trị thay đổi theo storage
    useEffect(() => {
        setData(lstCart);
    }, [numberQuanti, items])
    // chuyển trang
    const navigate = useNavigate();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const param = {
    //             "voucherCode": "",
    //             "provId": 0,
    //             "cityId": 0,
    //             "areaId": 0,
    //             "lstProds": lstCart
    //         }
    //         const response = await axios.post(URL + cart_url + "/GetDataShopCarts?domainName=litigold.vn", param);
    //         // danh sách giỏ hàng
    //         console.log(response.status);
    //         setData(response.data.data.lstProds);
    //     };
    //     fetchData();
    // }, [numberQuanti]);// set lstCart để cập nhật data cho cart
    function handleDeleteItem(id: any) {
        setItems(lstCart.filter((item: { id: any; }) => item.id !== id))
        if (items != null) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }
    function handleQtyProduct(id: string, qty: number, type: number) {
        let course = {
            id: id,
            qty: qty
        }
        let checker = false;
        lstCart.forEach((element: { id: string; qty: number; }) => {
            if (element.id == course.id) {
                element.qty = type == 1 ? element.qty - course.qty : element.qty + course.qty
                checker = true;
                if (element.qty == 0) {
                }
            }
        });
        if (!checker) {
        }
        if (course.qty >= 1 || course.id !== '0') {
            localStorage.setItem('cart', JSON.stringify(lstCart))
        }
    }
    return (
        sum == 0 ? <div className='column_no_product'>
            <img className='img_no_product' src={"https://stdh.vn/theme/images/empty_cart.png"} />
            <Button onClick={() => { navigate('/') }} className='btn_no_product'>Tiếp tục mua sắm</Button>
        </div> : <Page>
            <Box className={cx(
                'bg-white fixed top-15 left-2 right-0 shadow-btn-fixed',
                'z-[99999]',
            )}>
                <HandleConfirmCart page1={true} page2={false} page3={false} />
                <div className='title_cart'>
                    <div className='text_1'>Tổng số sản phẩm:</div>
                    <div className='text_2'> {sum}</div>
                </div >
            </Box>
            <div className='column_cart'>
                <Box className='detail_page_scroll'>
                    {data.map((e: any, index: any) => <div key={index} onClick={() => {
                    }} className='item_cart'>
                        <img className='img_item' src={URL + '/uploads/img/14/products/large/' + e.image} />
                        <div className='info_item'>
                            <div className='row_price'>
                                <div className='text_info'>
                                    {e.name}
                                </div>
                                <div onClick={() => { handleDeleteItem(e.id) }}>
                                    <Icon className='delete' icon="zi-close" size={23} />
                                </div>
                            </div>
                            <div className='row_price_info'>
                                <div className='name_price_info'>Giá:</div>
                                <div className='price_info'>{numberWithComma(e.price * e.qty)}đ</div>
                            </div>
                            <>
                                {
                                    e.type == "" ? null : <div className='properties_info'>
                                        <div className='type'>Thuộc tính:</div>
                                        <div className='name_type'>{e.type}</div>
                                    </div>
                                }
                            </>

                            <div className='row_price_info'>
                                <RemoveIcon onClick={() => {
                                    e.qty <= 1 ? null : setNumberQuanti(numberQuanti - 1)
                                    e.qty <= 1 ? null : handleQtyProduct(e.id, 1, 1)
                                }} className='circle' />
                                <div className='number_qty_info'>{e.qty}</div>
                                <AddIcon onClick={() => {
                                    handleQtyProduct(e.id, 1, 2)
                                    setNumberQuanti(numberQuanti + 1);
                                }} className='circle' />
                            </div>
                        </div>
                    </div>
                    )
                    }</Box>
            </div>
            <Box m={0}
                pl={2}
                pr={2}
                pb={1}
                className={cx(
                    'bg-white fixed bottom-0 left-0 right-0 shadow-btn-fixed',
                    'z-[99999]',
                )}>
                {/* <div className='line' /> */}
                <div className='row_total'>
                    <div className='sum_total'>Tổng tiền:</div>
                    <div className='total'>{numberWithComma(total)}đ</div>
                </div>
                <Box m={0} mb={2} mt={2} flex className="gap-3">
                    <Button className='btn_buy_cart' fullWidth size="large" onClick={() => {
                        navigate('/confirm_address')
                    }} >
                        Tiếp tục
                    </Button>
                </Box>
            </Box>
        </Page >
    );
}

export default CartPage;