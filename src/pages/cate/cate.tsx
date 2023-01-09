import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Icon, Page, useNavigate } from "zmp-ui";
import { getDataCateProduct, idCate, } from "../../state";
import './cate_styles.css';
import { URL_IMAGE } from "../../utils/constants";

function CatePage() {
  const data = useRecoilValue(getDataCateProduct);
  const [item, setItems] = useState(54);
  const navigate = useNavigate();
  const [id, setId] = useRecoilState(idCate);
  return (
    <Page className="min-h-0" >
      <Box className="cate_row">
        <Box className="row_1">
          {data.data.map((e: any) => <div className={e.id == item ? "active" : ""} >
            {e.parentId == 0 ? <div className="items_row_left" onClick={() => { setItems(e.id); }}>
              <img className="img_cate" src={URL_IMAGE + "/categorysproducts/large/" + e.images} />
              <div className="text_cate_right">{e.name}</div>
            </div> : null}
          </div>)}
        </Box>
        <Box className="row_2">
          {
            data.data.map((e: any) =>
              <Box ml={1} >
                {e.id != item ? null :
                  <div className="title_right" onClick={() => { navigate("/cate_detail_product"); setId(e.id) }}><div>{e.name}</div><Icon icon="zi-chevron-right" /></div>}
                <Box mr={1} ml={1}>
                  {e.id != item ? null :
                    <img className="img_banner" src={URL_IMAGE + "/CategorysProducts/Large/" + e.imagesBanner} />}
                </Box>
                {e.parentId != item ? null : <div onClick={() => { setId(e.id); navigate("/cate_detail_product"); }} className="Item_right">
                  <div >{e.name}</div>
                  <div className="tat_ca">TẤT CẢ</div>
                </div>}
              </Box>)
          }
        </Box>
      </Box>
    </Page>
  );
}

export default CatePage;
