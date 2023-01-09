import React from "react";
import { useRecoilValue } from "recoil";
import { Tabs } from "zmp-ui";
import { getTabAll, getTabHot, getTabSale } from "../../state";
import SufaceHot from "./suface_hot";
import SufaceAll from "./suface_all";
import SufaceSale from "./suface_sale";
import './suface_styles.css';
function CalendarPage() {
  return (
    <div className="tab_title">
      <Tabs id="contact-list">
        <Tabs.Tab key="tab1" label="Tất cả sản phẩm">
          <SufaceAll />
        </Tabs.Tab>
        <Tabs.Tab key="tab2" label="Bán chạy nhất">
          <SufaceSale />
        </Tabs.Tab>
        <Tabs.Tab key="tab3" label="Khuyến mãi hot">
          <SufaceHot />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default CalendarPage;
