import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Page } from 'zmp-ui';
import { getTabAll } from '../../state';
import FilterCateProduct from '../cate/filter_cate_product';
import ProductItem from '../home/product_item';
import './suface_styles.css';

function SufaceAll() {
    const data = useRecoilValue(getTabAll);
    return (
        <div className='page_detail_cate'>
            <FilterCateProduct />
            <Page>
                <ProductItem data={data} />
            </Page>
        </div>
    );
}

export default SufaceAll;