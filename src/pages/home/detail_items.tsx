import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Page, useNavigate } from 'zmp-ui';
import { dataDetailProduct, getIDPro, getImageChildren, idProduct, images } from '../../state';
import ButtonBuy from './button_buy';
import parse from 'html-react-parser';
import { numberWithComma } from '../../utils/constants';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { URL_IMAGE } from '../../utils/constants';
import './home_styles.css';
const Details = () => {
    const data = useRecoilValue(dataDetailProduct);
    const imageChildren = useRecoilValue(getImageChildren);
    const navigate = useNavigate();
    const [image, setImage] = useRecoilState(images);
    const [id, setId] = useRecoilState(idProduct);
    const [ID, setID] = useRecoilState(getIDPro);
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    let check = false;
    const numberDown = Math.round(100 - (data.data.priceDrop / data.data.price) * 100);
    return (
        <Page className='detail_page' >
            <Box className='detail_page_scroll' >
                <Box style={{
                    position: 'relative',
                }}>
                    <Carousel className='carousel' autoPlay >
                        <div onClick={() => {
                            navigate(`/zoom_images`)
                            setImage(URL_IMAGE + "/products/medium/" + data.data.images)
                        }}>
                            <img loading="lazy" className='1' src={URL_IMAGE + "/products/medium/" + data.data.images} style={{
                                borderRadius: 6
                            }} />
                        </div>
                        <div onClick={() => {
                            navigate(`/zoom_images`)
                            setImage(URL_IMAGE + "/products/medium/" + data.data.images_second)
                        }}>
                            <img loading="lazy" className='1' src={URL_IMAGE + "/products/medium/" + data.data.images_second} style={{
                                borderRadius: 6
                            }} />
                        </div>
                        {imageChildren.data.map((e: any) => <div>
                            <div onClick={() => {
                                navigate(`/zoom_images`)
                                setImage(URL_IMAGE + "/productsimages/medium/" + e.images)
                            }}>
                                <img loading="lazy" className='1' src={URL_IMAGE + "/productsimages/medium/" + e.images} style={{
                                    borderRadius: 6
                                }} />
                            </div>
                        </div>)}
                    </Carousel>
                    <div>
                        {
                            numberDown == 0 ? null : <Box className='price_down' >-{numberDown}%</Box>
                        }
                    </div>
                </Box>

                <Box className='detail_text_title'>
                    {data.data.name}
                </Box>
                <Box className='detail_row'>
                    <Box className='detail_text1'
                    >
                        Gi?? hot h??m nay:
                    </Box>
                    <Box className='detail_down_price' >
                        {numberWithComma(data.data.priceDrop)}??
                    </Box>
                </Box>
                <Box flex flexDirection='row'>
                    <Box flex flexDirection='row'>
                        <Box className='detail_text1' >Gi?? th??? tr?????ng: </Box>
                        <Box className='detail_price' >{numberWithComma(data.data.price)}??</Box>
                    </Box>
                    <Box className='detail_row'>
                        <Box ml={2} > - Ti???t ki???m: </Box>
                        <Box className='detail_pricedrop' > {numberWithComma((data.data.price) - (data.data.priceDrop))}??</Box>
                    </Box>
                    <Box className='detail_price_percent' >(-{Math.round(100 - (data.data.priceDrop / data.data.price) * 100)}%)</Box>
                </Box>
                <Box flex flexDirection='row'>
                    <div style={{
                        fontSize: 14
                    }}>S??? ng?????i ???? mua:</div>
                    <Box className='detail_highlight'>{data.data.numberBuyer}</Box>
                    <div style={{
                        fontSize: 14,
                        marginLeft: 10
                    }}> - Th????ng hi???u:</div>
                    <Box className='detail_highlight'>{data.data.nameTrademark}</Box>
                </Box>
                <div className='p_details'>
                    {parse(data.data.sumary)}
                </div>
                <Box style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {data.data.labelDescription}:
                </Box>
                <div className='z_details' onClick={() => {
                    check = true
                }}>
                    {parse(data.data.description)}
                </div>
            </Box>
            <ButtonBuy price={data.data.priceDrop} onClick={setID(data.data.id)} id={data.data.id} img={data.data.images} name={data.data.name} />
        </Page >
    );
}
export default Details;