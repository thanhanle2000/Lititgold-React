import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Button, Input, Page, useNavigate } from 'zmp-ui';
import { getHuyen, getTinh, getXa, idHuyen, idXa } from '../../state';
import cx from '../../utils/cx';
import { getInfoUserCart, idAddress } from '../cart/state_cart/state_cart';
import HandleConfirmCart from '../handle_confirm/handle_confim_cart';
import './confim_address_styles.css';

function ConFirmAddress() {
    // title form
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    //title
    const [titleTinh, setTitleTinh] = useState('Chọn tỉnh/thành');
    const [titleHuyen, setTitleHuyen] = useState('Chọn quận/huyện');
    const [titleXa, setTitleXa] = useState('Chọn phường/xã');
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    // lấy data tỉnh /thành
    const tinhThanh = useRecoilValue(getTinh);
    // lấy id tỉnh / thành
    const [idTinh, setIdTinh] = useRecoilState(idHuyen);
    // lấy dữ liệu cho quận / huyện
    const quanHuyen = useRecoilValue(getHuyen);
    const [idxa, setIdxa] = useRecoilState(idXa);
    // lấy dữ liệu cho phường /xã
    const phuongXa = useRecoilValue(getXa);
    const [idPhuongXa, setIdPhuongXa] = useState(0);
    // address
    const [id, setId] = useRecoilState(idAddress);
    // infocart
    const [info, setInfo] = useRecoilState(getInfoUserCart);
    useEffect(() => {
        setTitleHuyen('Chọn quận/huyện');
        setTitleXa('Chọn phường/xã');
    }, [idTinh])

    const navigate = useNavigate();

    return (
        <div className='column_page'>
            <HandleConfirmCart page1={false} page2={true} page3={false} />
            <form className='form' onSubmit={handleSubmit}>
                <div className='row_form'>
                    <div className='column_form'>
                        <div className='text_form'>Họ</div>
                        <Input type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div style={{ width: 20 }}></div>
                    <div className='column_form'>
                        <div className='text_form'>Tên</div>
                        <Input type='text' value={surname} onChange={(e) => { setSurname(e.target.value) }} />
                    </div>
                </div>
                <div style={{ height: 10 }}></div>
                <div className='column_form'>
                    <div className='text_form'>Địa chỉ nhận hàng</div>
                    <Input type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div style={{ height: 10 }}></div>
                <div className='column_form'>
                    <div className='text_form'>Tỉnh/Thành</div>
                    <Dropdown className='dropdown_item' color='white'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {titleTinh}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {tinhThanh.data.map((e: any) => <Dropdown.Item onClick={() => {
                                setTitleTinh(e.itemY);
                                setIdTinh(e.itemT);
                            }}>{e.itemY}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ height: 10 }}></div>
                <div className='column_form'>
                    <div className='text_form'>Quận/Huyện</div>
                    <Dropdown className='dropdown_item' color='white'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {titleHuyen}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {quanHuyen.data.map((e: any) => <Dropdown.Item onClick={() => {
                                setTitleHuyen(e.itemY);
                                setIdxa(e.itemT);
                            }}>{e.itemY}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ height: 10 }}></div>
                <div className='column_form'>
                    <div className='text_form'>Quận/Huyện</div>
                    <Dropdown className='dropdown_item' color='white'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {titleXa}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {phuongXa.data.map((e: any) => <Dropdown.Item onClick={() => {
                                setTitleXa(e.itemY);
                                setIdPhuongXa(e.itemT);
                            }}>{e.itemY}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </form>

            <Box m={0}
                pl={2}
                pr={2}
                pb={1}
                className={cx(
                    'bg-white fixed bottom-0 left-0 right-0 shadow-btn-fixed',
                    'z-[99999]',
                )}>
                <Box m={0} mb={2} mt={2} flex className="gap-3">
                    <Button className='btn_buy_cart' fullWidth size="large" onClick={() => {
                        navigate('/confirm_cart')
                        setId({ address: { idPro: idTinh, idDis: idxa, idWard: idPhuongXa } });
                        setInfo({ infoCart: { surname: surname, name: name, address: address } });
                    }} >
                        Tiếp tục
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default ConFirmAddress;