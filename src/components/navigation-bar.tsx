import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
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
    path: "/account",
    label: "Tài khoản",
    icon: <Icon icon="zi-user" />,
  },
];

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  useEffect(() => {
    navigate(activeTab);
  }, [activeTab]);
  useEffect(() => {
    if (navItems.find((item) => item.path === location.pathname)) {
      setActiveTab(location.pathname);
    }
  }, [location]);

  return (
    <>
      {(location.pathname !== "/detail_items" &&
        location.pathname !== "/cate_detail_product" &&
        location.pathname !== "/search" &&
        location.pathname !== "/item_search") && (
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
