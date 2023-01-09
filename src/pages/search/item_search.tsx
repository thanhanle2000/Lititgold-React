import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box } from 'zmp-ui';
import { getDataGetKey, getKey } from '../../state';
import ProductItem from '../home/product_item';
import './search_styles.css';

function ItemSearch() {
    // khai báo dữ liệu từ state
    const data = useRecoilValue(getDataGetKey);
    const key = useRecoilValue(getKey);

    return (
        <div>
            <Box className='row_search'>
                <Box>
                    {data.total === 0 ? <Box className='search_texts_1'>
                        0
                    </Box> : <Box className='search_texts_1'>
                        {data.data.length}
                    </Box>}
                </Box>
                <Box className='search_texts_2'>
                    kết quả tìm kiếm phù hợp với "{key}"
                </Box>
            </Box>
            {data.total === 0 ?
                <img className='img_search' src={"https://www.bagbazaars.com/assets/img/no-product-found.png"} />
                : <ProductItem data={data} />}
        </div>
    );
}

export default ItemSearch;