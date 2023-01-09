import React from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "zmp-ui";
import { useRestaurant } from "../hooks";
import { getConfig } from "./config-provider";

function AppHeader() {
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
