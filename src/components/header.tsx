import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "zmp-ui";
import { useRestaurant } from "../hooks";
import { getConfig } from "./config-provider";

function AppHeader() {
  const lstCart = JSON.parse(localStorage.getItem('cart') || "[]");
  const [data, setData] = useState(lstCart);
  useEffect(() => {
    setData(lstCart);
  }, [])
  // lấy tổng sản phẩm từ cart
  let sum = lstCart.reduce(function (prev, current) {
    return prev + +current.qty
  }, 0);
  const total = "Giỏ hàng" + (" " + sum + " sản phẩm");
  console.log(total);
  const location = useLocation();

  const restaurant = useRestaurant(
    Number(new URLSearchParams(location.search).get("id"))
  );

  const title = useMemo(() => {
    if (location.pathname === "/suface") {
      return "Lướt tin";
    } if (location.pathname === "/cate") {
      return "Danh mục sản phẩm";
    } if (location.pathname === "/account") {
      return "Tài khoản";
    }
    if (location.pathname === "/detail_items") {
      return "Chi tiết sản phẩm";
    }
    if (location.pathname === "/cate_detail_product") {
      return "Sản phẩm theo danh mục";
    } if (location.pathname === "/search") {
      return "Tìm kiếm sản phẩm";
    } if (location.pathname === "/item_search") {
      return "Danh sách theo từ khóa";
    } if (location.pathname === "/cart") {
      return "Giỏ hàng";
    } if (location.pathname === "/confirm_address") {
      return "Địa chỉ nhận hàng";
    } if (location.pathname === "/confirm_cart") {
      return "Xác nhận đơn hàng";
    }
    return getConfig((c) => c.app.title);
  }, [location.pathname]);

  return (
    <>
      <Header
        className="sticky top-0"
        title={title}
        style={{ backgroundColor: getConfig((c) => c.app.statusBarColor) }}
        showBackIcon={location.pathname !== "/"}
      />
    </>
  );
}

export default AppHeader;
