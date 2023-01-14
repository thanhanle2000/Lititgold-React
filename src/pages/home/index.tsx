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
import './home_styles.css';
import SliderImage from "./home_widgets/slider";
import RatingProduct from "./home_widgets/rating_product";
import BestSaleProduct from "./home_widgets/best_sale_product";
const HomePage = () => {
  const data = useRecoilValue(getDataProductHome);
  return (
    <div className="home_index" >
      <HeaderHome />
      <Page className="page">
        <CateFueture />
        <SliderImage />
        <CateProduct />
        <RatingProduct />
        <BestSaleProduct />
        <ProductItem data={data} />
      </Page>
    </div>
  );
};

export default HomePage;
