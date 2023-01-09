import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { dataCateProduct } from '../../state';
import ProductItem from '../home/product_item';
import FilterCateProduct from './filter_cate_product';
import './cate_styles.css';
import { Page } from 'zmp-ui';

function CateDetailProduct() {
    const data = useRecoilValue(dataCateProduct);
    const handleScroll = () => {

        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

        if (bottom) {
            console.log('at the bottom');
        }
    };
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='page_detail_cate' >
            <FilterCateProduct />
            <Page>
                <ProductItem data={data} />
            </Page>
        </div>
    );
}

export default CateDetailProduct;