import React from 'react';
import { Box, useNavigate } from 'zmp-ui';
import './home_styles.css';
function CateFueture() {
    const navigate = useNavigate();
    return (
        <Box className='catefueture'>
            <div className='Item' onClick={() => { navigate('/cate') }}>
                <img className='img' loading="lazy" src={"https://icon.fchat.vn/categories/menu-icon.png"} />
                <Box style={{ fontSize: 14 }}>
                    Danh mục
                </Box>
            </div>
            <div className='Item' onClick={() => { navigate('/suface_sale') }}>
                <img className='img' loading="lazy" src={"https://cdn-icons-png.flaticon.com/512/5305/5305244.png"} />
                <Box style={{ fontSize: 14 }}>
                    Khuyến mãi
                </Box>
            </div>
            <div className='Item' onClick={() => { navigate('/suface_hot') }}>
                <img className='img' loading="lazy" src={"https://i0.wp.com/nemwean.com/wp-content/uploads/2019/10/icon-hot.png?fit=200%2C150&ssl=1"} />
                <Box style={{ fontSize: 14 }}>
                    Bán chạy
                </Box>
            </div>
            <div className='Item' onClick={() => { navigate('/suface_new') }}>
                <img className='img' loading="lazy" src={"https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-new-product-sticker-latest-fresh-png-image_5243715.png"} />
                <Box style={{ fontSize: 14 }}>
                    Mới nhất
                </Box>
            </div>
        </Box >
    );
}

export default CateFueture;