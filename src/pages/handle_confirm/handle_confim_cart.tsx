import React from 'react';
import './handle_confirm_styles.css';
const HandleConfirmCart = ({ page1, page2, page3 }) => {
    let active;
    if (page1 == true && page2 == false && page3 == false) {
        active = <div className='row_page'>
            <div className='column_item'>
                <div className='cirle_active'>1</div>
                <div className='text_press'>Giỏ hàng</div>
            </div>
            <div className='line' />
            <div className='column_item'>
                <div className='cirle'>2</div>
                <div className='text_press'>Địa chỉ</div>
            </div>
            <div className='line' />
            <div className='column_item'>
                <div className='cirle'>3</div>
                <div className='text_press'>Xác nhận</div>
            </div>
        </div>
    } else if (page1 == false && page2 == true && page3 == false) {
        active = <div className='row_page'>
            <div className='column_item'>
                <div className='cirle_active'>1</div>
                <div className='text_press'>Giỏ hàng</div>
            </div>
            <div className='line_active' />
            <div className='column_item'>
                <div className='cirle_active'>2</div>
                <div className='text_press'>Địa chỉ</div>
            </div>
            <div className='line' />
            <div className='column_item'>
                <div className='cirle'>3</div>
                <div className='text_press'>Xác nhận</div>
            </div>
        </div>
    } else if (page1 == false && page2 == false && page3 == true) {
        active = <div className='row_page'>
            <div className='column_item'>
                <div className='cirle_active'>1</div>
                <div className='text_press'>Giỏ hàng</div>
            </div>
            <div className='line_active' />
            <div className='column_item'>
                <div className='cirle_active'>2</div>
                <div className='text_press'>Địa chỉ</div>
            </div>
            <div className='line_active' />
            <div className='column_item'>
                <div className='cirle_active'>3</div>
                <div className='text_press'>Xác nhận</div>
            </div>
        </div>
    }
    return (active);
}

export default HandleConfirmCart;