import React from 'react';
import './item_styles.css';
import { numberWithComma, URL } from '../../utils/constants';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { idProduct } from '../../state';
const MiniItems = (data: any) => {
    const [id, setId] = useRecoilState(idProduct);
    const navigate = useNavigate();
    return (
        <> {data.data.map((e: any) =>
            <div onClick={() => {
                setId(e.id)
                navigate(`/detail_items`);
            }} className='item'>
                <img className='img_item' loading="lazy" src={URL + '/uploads/img/14/products/large/' + e.images} />
                <div className='text_item_1'>{e.name}</div>
                <div className='row_item'>
                    <div className='price'>{numberWithComma(e.priceDrop)}đ</div>
                    <div className='priceDrop'>{numberWithComma(e.price)}đ</div>
                </div>
            </div>
        )}</>
    );
}

export default MiniItems;