import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, useSnackbar } from 'zmp-ui';
import { getProperties } from '../../../state';
import { numberWithComma } from '../../../utils/constants';
import './action_styles.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const SheetActionProperties = (price: any) => {
    // khai báo dữ liệu đầu vào từ state
    const data = useRecoilValue(getProperties);
    const [selectedDrink, setSelectedDrink] = useState<String>();
    const [changePrice, setChangePrice] = useState(price.price)
    const [changeValue, setChangeValue] = useState('')
    // type
    const [typePro, setTypePro] = useState('');
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDrink(event.target.value);
    };
    const [id, setId] = useState(0);
    const [numberQuanti, setNumberQuanti] = useState(1);
    const { openSnackbar } = useSnackbar();

    function btnConfirm(id: any, qty: number, price: number, image: string, type: string, name: string) {
        let courses = JSON.parse(localStorage.getItem('cart') || "[]");
        let course = {
            id: id,
            qty: qty,
            price: price,
            image: image,
            type: type,
            name: name
        }
        let checker = false;
        courses.forEach(element => {
            if (element.id == course.id) {
                element.qty = element.qty + course.qty
                checker = true;
            }
        });

        if (!checker) {
            courses.push(course);
        }
        if (course.qty !== 0 || course.id !== '0') {
            localStorage.setItem('cart', JSON.stringify(courses))
        }

    }
    return (
        <div className='column_action'>
            <div>
                <div>
                    {
                        data.data.length === 0 ? null : <div className='radio'>
                            <div className='row_radio'>
                                <div className='text_radio'> Chọn Thuộc Tính</div>
                                <div className='text_requied'>*</div>
                            </div>
                            <div className='radio_btn' >
                                {
                                    data.data.map((e: any) => <p>
                                        <input
                                            type="radio"
                                            name="drink"
                                            value="Coffee"
                                            id="coffee"
                                            onChange={() => {
                                                radioHandler
                                                setChangePrice(e.priceDrop)
                                                setChangeValue(e.priceDrop)
                                                setId(e.id)
                                                setTypePro(e.name)
                                            }}
                                        />
                                        <label htmlFor="coffee">{e.name}</label>
                                    </p>)
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className='radio'>
                    <div className='row_radio'>
                        <div className='text_radio'> Chọn Số Lượng</div>
                        <div className='text_requied'>*</div>
                    </div>
                    <div className='row_quanti'>
                        <div className='circle' onClick={() => {
                            numberQuanti <= 1 ? null : setNumberQuanti(numberQuanti - 1)
                        }}>
                            <RemoveIcon />
                        </div>
                        <div className='number_quanti' >{numberQuanti}</div>
                        <div className='circle' onClick={() => {
                            setNumberQuanti(numberQuanti + 1);
                        }}>
                            <AddIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row_action'>
                {
                    data.data.length === 0 ?
                        <Button className='btn_buy_cart' onClick={() => {
                            btnConfirm(price.idProduct, numberQuanti, price.price, price.img, typePro, price.name)
                            openSnackbar({
                                position: 'top',
                                type: 'success',
                                text: "Thêm sản phẩm vào giỏ hàng thành công",
                                action: {
                                    text: "Đóng",
                                    close: true
                                }
                            });
                        }}>Thêm vào giỏ hàng</Button> :
                        <Button className='btn_buy_cart' onClick={() => {
                            changeValue === '' ? null : btnConfirm(id, numberQuanti, price.price, price.img, typePro, price.name)
                            changeValue === '' ? null : openSnackbar({
                                position: 'top',
                                type: 'success',
                                text: "Thêm sản phẩm vào giỏ hàng thành công",
                                action: {
                                    text: "Đóng",
                                    close: true
                                }
                            });
                        }}> {changeValue === '' ? 'Chọn thuộc tính' : 'Thêm vào giỏ hàng'}</Button>
                }

                <div className='row_price'>
                    <div className='text1'>Giá tiền:</div>
                    <div className='text2'>{numberWithComma(changePrice * numberQuanti ?? price.price * numberQuanti)}đ</div>
                </div>
            </div>
        </div >
    );
}

export default SheetActionProperties;