import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Page, useNavigate } from "zmp-ui";
import { getImageChildren, images, dataDetailProduct } from "../../state";
import ButtonBuy from "../home/button_buy";
import parse from 'html-react-parser';
import { URL_IMAGE } from "../../utils/constants";
const DetailItem = () => {
    const data = useRecoilValue(dataDetailProduct);
    const imageChildren = useRecoilValue(getImageChildren);
    const navigate = useNavigate();
    const [image, setImage] = useRecoilState(images);
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    let check = false;
    return (
        <Page style={{
            background: 'white',
            padding: 0,
            margin: 0
        }}>
            <Box m={1} style={{
                overflowY: 'scroll',
            }}>
                <Box style={{
                    position: 'relative',

                }}>
                    <div>
                    </div>
                    <Carousel autoPlay >
                        <div onClick={() => {
                            navigate(`/zoom_images`)
                            setImage(URL_IMAGE + "/products/medium/" + data.data.images)
                        }}>
                            <img src={URL_IMAGE + "/products/medium/" + data.data.images} style={{
                                borderRadius: 6
                            }} />
                        </div>
                        <div onClick={() => {
                            navigate(`/zoom_images`)
                            setImage(URL_IMAGE + "/products/medium/" + data.data.images_second)
                        }}>
                            <img src={URL_IMAGE + "/products/medium/" + data.data.images_second} style={{
                                borderRadius: 6
                            }} />
                        </div>

                    </Carousel>
                    <div>
                        {imageChildren.data.map((e) => {
                            <div>
                                console.log(e.name);

                                {e.name}
                            </div>
                        })}
                    </div>
                    <Box ml={1} style={{
                        fontWeight: 'bold', fontSize: 16, color: 'red', position: 'absolute', left: 10, top: 0, height: 10, width: 10
                    }}>-{Math.round(100 - (data.data.priceDrop / data.data.price) * 100)}%</Box>
                </Box>

                <Box style={{
                    fontSize: 16,
                    fontWeight: 'bold'

                }}>
                    {data.data.name}
                </Box>
                <Box flex flexDirection='row'>
                    <Box style={{
                        fontSize: 13
                    }}>
                        Giá hot hôm nay:
                    </Box>
                    <Box ml={1} style={{
                        fontSize: 18,
                        color: 'red',
                        fontWeight: 'bold'
                    }}>
                        {(data.data.priceDrop).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Box>

                </Box>
                <Box flex flexDirection='row'>
                    <Box flex flexDirection='row'>
                        <Box style={{
                            fontSize: 13
                        }}>Giá thị trường: </Box>
                        <Box ml={1} style={{
                            fontSize: 13, fontStyle: 'italic', textDecorationLine: 'line-through'
                        }}>{(data.data.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Box>
                    </Box>
                    <Box ml={1} style={{
                        fontSize: 13
                    }}>- Tiết kiệm: {((data.data.price) - (data.data.priceDrop)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</Box>
                    <Box ml={1} style={{
                        fontSize: 13, color: 'red'
                    }}>(-{Math.round(100 - (data.data.priceDrop / data.data.price) * 100)}%)</Box>
                </Box>
                <Box flex flexDirection='row'>
                    <div style={{
                        fontSize: 14
                    }}>Số người đã mua:</div>
                    <Box ml={1} style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>{data.data.numberBuyer}</Box>
                    <div style={{
                        fontSize: 14,
                        marginLeft: 10
                    }}>Thương hiệu:</div>
                    <Box ml={1} style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                    }}>{data.data.nameTrademark}</Box>
                </Box>
                <Box ml={8} className={'info'} style={{
                    fontSize: 20 + '!important'
                }}>
                    {parse(data.data.sumary)}
                </Box>
                <Box style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {data.data.labelDescription}:
                </Box>
                <div className={'info'} style={{
                    fontSize: 20 + '!important'
                    , marginLeft: 8,
                }} onClick={() => {
                    check = true
                }}>
                    {parse(data.data.description)}
                </div>
            </Box>
            <ButtonBuy />
        </Page >
    );


}

export default DetailItem;