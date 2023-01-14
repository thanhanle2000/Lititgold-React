import React from 'react';
import { useRecoilValue } from 'recoil';
import { Page } from 'zmp-ui';
import { getDataCart } from '../../state';
import HandleConfirmCart from '../handle_confirm/handle_confim_cart';
import './confirm_cart_styles.css';

function ConfirmCart() {
    const data = useRecoilValue(getDataCart);
    console.log(data);
    return (
        <Page className='column_page' >
            <HandleConfirmCart page1={false} page2={false} page3={true} />
            {/* <div>
            {data.data.map((e: any) => <div>{e.productName}</div>)}
        </div> */}
        </Page>

    );
}

export default ConfirmCart;