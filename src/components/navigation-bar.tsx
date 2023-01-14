import React, { useEffect, useState } from "react";
import { BottomNavigation, Box, Icon } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './navi_styles.css';

function NavigationBar() {
  const lstCart = JSON.parse(localStorage.getItem('cart') || "[]");
  const [data, setData] = useState(lstCart);
  // lấy tổng sản phẩm từ cart
  let sum = lstCart.reduce(function (prev, current) {
    return prev + +current.qty
  }, 0);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  useEffect(() => {
    setData(lstCart);
    navigate(activeTab);
  }, [activeTab]);
  useEffect(() => {
    if (navItems.find((item) => item.path === location.pathname)) {
      setActiveTab(location.pathname);
    }
  }, [location]);
  const navItems = [
    {
      path: "/",
      label: "Trang chủ",
      icon: <Icon icon="zi-home" />,
    },
    {
      path: "/cate",
      label: "Danh mục",
      icon: <Icon icon="zi-more-grid-solid" />,
    },
    {
      path: "/suface",
      label: "Lướt",
      icon: <LocalFireDepartmentIcon />,
    },
    {
      path: "/cart",
      label: "Giỏ hàng",
      icon: <Box style={{
        position: 'relative',
      }}>
        <div className="cart_number">{sum}</div>
        <ShoppingCartIcon />
      </Box>
    },
    {
      path: "/account",
      label: "Tài khoản",
      icon: <Icon icon="zi-user" />,
    },

  ];
  return (
    <>
      {(location.pathname !== "/detail_items" &&
        location.pathname !== "/cate_detail_product" &&
        location.pathname !== "/search" &&
        location.pathname !== "/item_search" &&
        location.pathname !== "/cart" &&
        location.pathname !== "/confirm_address" &&
        location.pathname !== "/confirm_cart") && (
          <>
            <BottomNavigation
              id="bottom-nav"
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
            >
              {navItems.map(({ path, label, icon }) => (
                <BottomNavigation.Item key={path} label={label} icon={icon} />
              ))}
            </BottomNavigation>
          </>
        )}
    </>
  );
}

export default NavigationBar;
