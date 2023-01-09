import React, { } from "react";
import { Page } from "zmp-ui";
import {
  useRecoilValue,
} from "recoil";
import {
  getDataProductHome,
} from "../../state";
import HeaderHome from "./header_home";
import CateFueture from "./cate_fueture_home";
import CateProduct from "./cate_product_home";
import ProductItem from "./product_item";

const HomePage = () => {
  const data = useRecoilValue(getDataProductHome);
  return (
    <div style={{ overflow: 'hidden' }}>
      <HeaderHome />
      <Page>
        <CateFueture />
        <CateProduct />
        <ProductItem data={data} />
      </Page>
    </div>
  );
};

export default HomePage;
