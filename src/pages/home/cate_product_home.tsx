import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, useNavigate } from 'zmp-ui';
import { cateRepresentative, idCate } from '../../state';
import { URL_IMAGE } from '../../utils/constants';
import './home_styles.css';

function CateProduct() {
    const data = useRecoilValue(cateRepresentative);
    const navigate = useNavigate();
    const [id, setId] = useRecoilState(idCate);
    return (
        <div>
            <Box flexDirection='column' flexWrap p={1} style={{ background: 'white' }}>
                <div className='row_tilte'>
                    <div className='line' />
                    <Box className='title_cate'>Danh Mục Nổi Bật </Box>
                    <div className='line' />
                </div>
                <div className='row_wrap'>
                    {data.data.map((e: any) => <div onClick={() => {
                        setId(e.id);
                        navigate("/cate_detail_product");

                    }}>
                        {
                            <div className='cateProduct' >
                                {
                                    <img loading="lazy" src={URL_IMAGE + '/categorysproducts/large/' + e.images} className='img_cate_product' />}
                                <div className='text_item'>{e.name}</div>
                            </div>
                        }
                    </div>)}
                </div>
            </Box>
        </div>
    );
}

export default CateProduct;