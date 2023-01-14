import React, { useState } from 'react';
import { Box, Button, Sheet } from 'zmp-ui';
import cx from '../../utils/cx';
import SheetActionProperties from './home_widgets/sheet_action_properties';
import './home_styles.css';

const ButtonBuy = (price: any) => {
    const [sheetVisible, setSheetVisible] = useState(false);
    return (
        <Box
            m={0}
            p={2}
            className={cx(
                'bg-transparent fixed bottom-0 left-0 right-0 shadow-btn-fixed',
                'z-[99999]',
            )}
        >
            <Box m={0} flex className="gap-3">
                <Button className='btn_buy' fullWidth size="small" onClick={() => {
                    setSheetVisible(true);
                }} >
                    Chọn mua
                </Button>
            </Box>
            <Sheet className='sheet'
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
            >
                <SheetActionProperties price={price.price} idProduct={price.id} img={price.img} name={price.name} />
            </Sheet>
        </Box>
    );
}

export default ButtonBuy;