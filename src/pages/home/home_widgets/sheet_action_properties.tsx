import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, useSnackbar } from 'zmp-ui';
import { getProperties } from '../../../state';
import { numberWithComma } from '../../../utils/constants';
import './action_styles.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const SheetActionProperties = (price: any, idProduct: number) => {
    // khai báo dữ liệu đầu vào từ state
    const data = useRecoilValue(getProperties);
    const [selectedDrink, setSelectedDrink] = useState<String>();
    const [changePrice, setChangePrice] = useState(price.price)
    const [changeValue, setChangeValue] = useState('')
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDrink(event.target.value);
    };
    const [numberQuanti, setNumberQuanti] = useState(1);
    const { openSnackbar } = useSnackbar();

    function btnConfirm(id: any, qty: number) {
        var courses = JSON.parse(localStorage.getItem('course') || "[]")
        var course = {
            idPro: id,
            qty: qty
        }
        if (courses != null) {
            courses.push(course)
        }
        console.log(course)
        if (course.qty !== 0 || course.idPro !== '0') {
            localStorage.setItem('course', JSON.stringify(courses))
        }
    }
    return (
        <div className='column_action'>
            <div>
                <div>
                    {
                        data.data.length === 0 ? null : <div className='radio'>
                            <div className='row_radio'>
                                <div className='text_radio'> Chọn Thuộc Tính</div>
                                <div className='text_requied'>*</div>
                            </div>
                            <div className='radio_btn' >
                                {
                                    data.data.map((e: any) => <p>
                                        <input
                                            type="radio"
                                            name="drink"
                                            value="Coffee"
                                            id="coffee"
                                            onChange={() => {
                                                radioHandler
                                                setChangePrice(e.priceDrop)
                                                setChangeValue(e.priceDrop)
                                            }}
                                        />
                                        <label htmlFor="coffee">{e.name}</label>
                                    </p>)
                                }
                            </div>
                        </div>
                    }
                </div>
                <div className='radio'>
                    <div className='row_radio'>
                        <div className='text_radio'> Chọn Số Lượng</div>
                        <div className='text_requied'>*</div>
                    </div>
                    <div className='row_quanti'>
                        <div className='circle' onClick={() => {
                            numberQuanti <= 1 ? null : setNumberQuanti(numberQuanti - 1)
                        }}>
                            <RemoveIcon />
                        </div>
                        <div className='number_quanti' >{numberQuanti}</div>
                        <div className='circle' onClick={() => {
                            setNumberQuanti(numberQuanti + 1);
                        }}>
                            <AddIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row_action'>
                {/* {
                    data.data.length === 0 ?
                        <Button onClick={() => {
                            setIdPro(price.idProduct)
                            // setIdP(price.idProduct)
                            openSnackbar({
                                position: 'top',
                                type: 'success',
                                text: "Thêm sản phẩm vào giỏ hàng thành công",
                                action: {
                                    text: "Đóng",
                                    close: true
                                }
                            });
                        }}>Thêm vào giỏ hàng</Button> :
                        <Button onClick={() => {
                            changeValue === '' ? null : setIdPro(id)
                            changeValue === '' ? null : openSnackbar({
                                position: 'top',
                                type: 'success',
                                text: "Thêm sản phẩm vào giỏ hàng thành công",
                                action: {
                                    text: "Đóng",
                                    close: true
                                }
                            });
                        }}> {changeValue === '' ? 'Chọn thuộc tính' : 'Thêm vào giỏ hàng'}</Button>
                } */}
                <Button onClick={() => {
                    btnConfirm(price.idProduct, price.idProduct)
                    // setIdPro(price.idProduct)
                    // setIdP(price.idProduct)
                    openSnackbar({
                        position: 'top',
                        type: 'success',
                        text: "Thêm sản phẩm vào giỏ hàng thành công",
                        action: {
                            text: "Đóng",
                            close: true
                        }
                    });
                }}>Thêm vào giỏ hàng</Button>
                <div className='row_price'>
                    <div className='text1'>Giá tiền:</div>
                    {/* <div>{parsedArray.map((e: any) => <div>{e}</div>)}</div> */}
                    <div className='text2'>{numberWithComma(changePrice * numberQuanti ?? price.price * numberQuanti)}đ</div>
                </div>
            </div>
        </div >
    );
}

export default SheetActionProperties;