import React from 'react';
import { useRecoilValue } from 'recoil';
import { getDataRatingProduct } from '../../../state';
import MiniItems from '../../item/mini_items';
import './widgets.css';
function RatingProduct() {
    const data = useRecoilValue(getDataRatingProduct);
    return (
        <div className='column_r'>
            <div className='row_title'>
                <div className='row_title_1'>
                    <img className='img_icon' src={"https://cdn-icons-png.flaticon.com/512/4001/4001136.png"} />
                    <div className='text_title'>Đánh Giá Cao Nhất</div>
                </div>
                <div className='text_all'>See all</div>
            </div>
            <div className='page_item'>
                <MiniItems data={data.data} />
            </div>
        </div>
    );
}

export default RatingProduct;