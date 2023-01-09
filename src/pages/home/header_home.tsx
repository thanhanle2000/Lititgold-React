import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, Icon, useNavigate } from 'zmp-ui';
import { userInfoState } from '../../state';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './home_styles.css';
function HeaderHome() {
    const navigate = useNavigate();
    const data = useRecoilValue(userInfoState);
    return (
        <Box flex flexDirection='column' p={1} pr={2} style={{ background: '#bbdefb' }}>
            <Box flex flexDirection='row' alignItems='center' style={{ flexWrap: 'nowrap' }} justifyContent={"space-between"} mb={2}>
                <div className="flex flex-row items-center" style={{ height: "50px", justifyContent: 'center', padding: 2 }}>
                    <img src={"https://web.hvnet.vn/uploads/img/14/headers/large/" + data.data.h_logoHeader} alt="Logo"
                        width={190} />
                </div>
                <Box className='row_icon'>
                    <ShoppingCartIcon className='icon1' />
                    <NotificationsIcon className='icon1' />
                </Box>
            </ Box >
            <Button onClick={() => { navigate("/search") }} style={{
                background: 'white',
                color: 'black',
                padding: 2,
                margin: 2,
                fontSize: 16,
                fontStyle: 'italic'
            }} size="small">Nhập vào sản phẩm cần tìm?</Button>
        </Box>
    );
}

export default HeaderHome;