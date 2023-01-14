import React from 'react';
import { useRecoilValue } from 'recoil';
import { getDataBestSaleProduct } from '../../../state';
import MiniItems from '../../item/mini_items';
import './widgets.css';

function BestSaleProduct() {
    const data = useRecoilValue(getDataBestSaleProduct);
    return (
        <div className='column_r'>
            <div className='row_title'>
                <div className='row_title_1'>
                    <img className='img_icon' src={"https://cdn-icons-png.flaticon.com/128/650/650817.png"} />
                    <div className='text_title'>Được Mua Nhiều Nhất</div>
                </div>
                <div className='text_all'>See all</div>
            </div>
            <div className='page_item'>
                <MiniItems data={data.data} />
            </div>
        </div>
    );
}

export default BestSaleProduct;