import React from 'react';
import { useRecoilValue } from 'recoil';
import { Page } from 'zmp-ui';
import { getTabHot } from '../../state';
import FilterCateProduct from '../cate/filter_cate_product';
import ProductItem from '../home/product_item';
import './suface_styles.css';


function SufaceHot() {
    const data = useRecoilValue(getTabHot);
    return (
        <div className='page_detail_cate'>
            <FilterCateProduct />
            <Page>
                <ProductItem data={data} />
            </Page>
        </div>
    );
}

export default SufaceHot;