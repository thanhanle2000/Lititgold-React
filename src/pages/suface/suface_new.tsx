import React from 'react';
import { useRecoilValue } from 'recoil';
import { Page } from 'zmp-ui';
import { getTabNew } from '../../state';
import FilterCateProduct from '../cate/filter_cate_product';
import ProductItem from '../home/product_item';

function SufaceNew() {
    const data = useRecoilValue(getTabNew);
    return (
        <div className='page_detail_cate'>
            <FilterCateProduct />
            <Page>
                <ProductItem data={data} />
            </Page>
        </div>
    );
}

export default SufaceNew;