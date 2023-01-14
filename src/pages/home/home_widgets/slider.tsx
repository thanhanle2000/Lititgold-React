import React from 'react';
import { Slide } from 'react-slideshow-image';
import { useRecoilValue } from 'recoil';
import { bannerApp } from '../../../state';
import 'react-slideshow-image/dist/styles.css'
import './widgets.css';
function SliderImage() {
    const data = useRecoilValue(bannerApp);
    console.log(data)
    return (
        <Slide>
            {data.data.map((e: any) => <img className='img_a' src={"https://web.hvnet.vn/uploads/img/14/imagesoptions/large/" + e.images} />)}
        </Slide>
    );
}
export default SliderImage;