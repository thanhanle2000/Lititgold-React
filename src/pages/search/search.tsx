import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Input, useNavigate } from 'zmp-ui';
import { idKey, topKeySearch } from '../../state';
import './search_styles.css';
function SearchPage() {
    // khai báo dữ liệu đầu vào từ state
    const json = useRecoilValue(topKeySearch);
    const [key, setKey] = useRecoilState(idKey);

    //kiểm tra và lưu dữ liệu vào localStorage
    let str = localStorage.getItem('array');
    let myArray = [''];
    if (str != null) {
        myArray = JSON.parse(str);
    }
    if (!myArray.includes(key)) {
        myArray.push(key);
    }

    // lấy dữ liệu từ localStorage và kiểm tra
    const jsonArray = JSON.stringify(myArray);
    localStorage.setItem('array', jsonArray);

    // xử lí chuyển trang
    const navigate = useNavigate();
    return (
        <div className='page_search'>
            <div className='search'>
                <Input.Search
                    label="Nhập vào sản phẩm cần tìm"
                    onSearch={(text) => {
                        navigate('/item_search')
                        setKey(text)
                    }
                    }
                />
            </div>
            <div>
                <div className='text_title'>Top tìm kiếm hàng đầu:</div>
                <div className='top_key'>
                    {json.data.map((e: any) => <div onClick={() => {
                        setKey(e.name);
                        navigate('/item_search');
                    }}>
                        <Tag className='tag' color="green" >{e.name}</Tag>
                    </div>)}
                </div>
            </div>
            <div>
                <div className='text_title'>Lịch sử tìm kiếm:</div>
                <div className='top_key'>
                    {myArray.filter((item, index) => index > 4).map((e: any) =>
                        <div>
                            {e === '' ? null :
                                <div onClick={() => {
                                    navigate('/item_search');
                                }}>
                                    <Tag className='tag' color="green" >{e}</Tag>
                                </div>
                            }
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default SearchPage;