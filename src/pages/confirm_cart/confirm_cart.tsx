import React from 'react';
import { useRecoilValue } from 'recoil';
import { Page } from 'zmp-ui';
import { getDataCart } from '../../state';
import HandleConfirmCart from '../handle_confirm/handle_confim_cart';
import { numberWithComma, URL } from '../../utils/constants';
import { getInfoUserCart } from '../cart/state_cart/state_cart';
import './confirm_cart_styles.css';

function ConfirmCart() {
    const data = useRecoilValue(getDataCart);
    const info = useRecoilValue(getInfoUserCart);
    console.log(data);
    console.log(info);
    return (
        <Page className='column_page' >
            <HandleConfirmCart page1={false} page2={false} page3={true} />
            <div className='lst_product'>
                <div className='row_item'>
                    <div className='title_lst'>
                        Sản Phẩm:
                    </div>
                    <div className='number_qty'>{data.data.totalQuanlity}</div>

                </div>
                <>
                    {data.data.lstProds.map((e: any) =>
                        <div className='item'>
                            <img className='img_item' src={URL + '/uploads/img/14/products/large/' + e.images} />
                            <div className='column_item'>
                                <div className='name_product'>{e.productName}</div>
                                <div className='row_item'>
                                    <div className='text_1'>SL:</div>
                                    <div className='text_name'>{e.quanlity}</div>
                                </div>
                                <>{e.productChildCode == null ? null :
                                    <div className='row_item'>
                                        <div className='text_1'>{e.productParentCode}:</div>
                                        <div className='text_name'>{e.productChildCode}</div>
                                    </div>}</>
                                <div className='row_item'>
                                    <div className='text_1'>Giá:</div>
                                    <div className='text_name'>{numberWithComma(e.total)}đ</div>
                                </div>
                            </div>
                        </div>
                    )}</>
                <div style={{ height: 10 }}></div>
                <div className='column_payment'>
                    <div className='title_lst'>Chi Tiết Thanh Toán</div>
                    <div className='row_payment'>
                        <div className='text_1'>Ship:</div>
                        <>{data.data.shipPrice == 0 ? <div className='text_free_ship'>Free Ship</div> : <div className='text_payment'>{numberWithComma(data.data.shipPrice)}đ</div>}</>
                    </div>
                    <div className='row_payment'>
                        <div className='text_1'>Tổng đơn hàng:</div>
                        <div className='text_payment'>{numberWithComma(data.data.totalPrice)}đ</div>
                    </div>
                    <div className='row_payment'>
                        <div className='text_1'>Tổng thanh toán:</div>
                        <div className='text_payment'>{numberWithComma(data.data.totalPayment)}đ</div>
                    </div>
                </div>
                <div style={{ height: 10 }}></div>
                <div className='column_payment'>
                    <div className='title_lst'>Thông Tin Nhận Hàng</div>

                </div>
            </div>
        </Page>

    );
}

export default ConfirmCart;