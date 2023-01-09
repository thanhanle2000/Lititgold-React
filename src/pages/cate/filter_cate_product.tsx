import React, { useState } from 'react';
import './cate_styles.css';
import { Dropdown } from 'react-bootstrap';
import { idSort } from '../../state';
import { useRecoilState } from 'recoil';
function FilterCateProduct() {
    const [title, setTitle] = useState('Chọn lọc')
    const [sort, setSort] = useRecoilState(idSort);
    return (
        <div className='filter'>
            <div> Sắp xếp: </div>
            <Dropdown className='dropdown' color='white'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { setTitle("Giá giảm dần"); setSort("Product.priceDrop desc") }}>Giá giảm dần</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setTitle("Giá tăng dần"); setSort("Product.priceDrop asc") }}>Giá tăng dần</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setTitle("Đánh giá nhiều"); setSort("Product.numberRate asc") }}>Đánh giá nhiều</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setTitle("Mua nhiều nhất"); setSort("Product.isBestSeller asc") }}>Mua nhiều nhất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default FilterCateProduct;