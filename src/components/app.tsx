import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages/home";
import Header from "./header";
import NavigationBar from "./navigation-bar";
import RestaurantPage from "../pages/restaurant";
import CalendarPage from "../pages/suface/suface";
import Cart from "./cart";
import { ConfigProvider, getConfig } from "./config-provider";
import CatePage from "../pages/cate/cate";
import AccountPage from "../pages/account/account";
import DetailItem from "../pages/detail_items/detail_items";
import Details from "../pages/home/detail_items";
import CateProduct from "../pages/home/cate_product_home";
import CateDetailProduct from "../pages/cate/cate_detail_product";
import SearchPage from "../pages/search/search";
import ItemSearch from "../pages/search/item_search";
import SufaceSale from "../pages/suface/suface_sale";
import SufaceNew from "../pages/suface/suface_new";
import SufaceHot from "../pages/suface/suface_hot";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-secondary-color": getConfig((c) => c.template.secondaryColor),
        }}
      >
        <App>
          <Suspense>
            <SnackbarProvider>
              <ZMPRouter>
                <Cart />
                <Header />
                <AnimationRoutes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/restaurant" element={<RestaurantPage />}></Route>
                  <Route path="/suface" element={<CalendarPage />}></Route>
                  <Route path="/cate" element={<CatePage />}></Route>
                  <Route path="/account" element={<AccountPage />}></Route>
                  <Route path="/detail_items" element={<Details />}></Route>
                  <Route path="/cate_detail_product" element={<CateDetailProduct />}></Route>
                  <Route path="/search" element={<SearchPage />}></Route>
                  <Route path="/item_search" element={<ItemSearch />}></Route>
                  <Route path="/suface_sale" element={<SufaceSale />}></Route>
                  <Route path="/suface_hot" element={<SufaceHot />}></Route>
                  <Route path="/suface_new" element={<SufaceNew />}></Route>
                </AnimationRoutes>
                <NavigationBar />
              </ZMPRouter>
            </SnackbarProvider>
          </Suspense>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
