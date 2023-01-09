import React from 'react';
import { useRecoilState } from 'recoil';
import { Box, Button, useNavigate } from 'zmp-ui';
import { idProduct } from '../../state';
import './home_styles.css';
import { numberWithComma, URL } from '../../utils/constants';
const ProductItem = ({ data }) => {
    const [id, setId] = useRecoilState(idProduct);
    const navigate = useNavigate();
    return (
        <div className='productItem'
        >
            {data.data.map((e: any) => e.price === 0 ? null :
                <div
                    onClick={() => {
                        setId(e.id)
                        navigate(`/detail_items`);
                    }} className='div_items'
                >
                    <Box >
                        <div className='items' >
                            <Box className='items_1' >
                                <img loading="lazy" src={URL + '/uploads/img/14/products/large/' + e.images} className='images_1' />
                            </Box>
                            <Box className='items_2' >
                                <div className='texts'>
                                    {e.name}
                                </div>
                                <div className='row_text'>
                                    <div className='texts_1' >{numberWithComma(e.price)}đ</div>
                                    <div className='texts_2' >{numberWithComma(e.priceDrop)}đ</div>
                                </div>
                            </Box>
                        </div>
                    </Box>
                </div>
            )}
        </div>
    );
}

export default ProductItem;