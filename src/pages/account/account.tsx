import React from "react";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Page, Tabs } from "zmp-ui";
import BookingItem from "../../components/book/booking";
import { bookingsState } from "../../state";

const labels = {
  upcoming: "Sắp đến",
  finished: "Hoàn thành",
};

function AccountPage() {
  const [status, setStatus] = useState<"upcoming" | "finished">("upcoming");
  const allBookings = useRecoilValue(bookingsState);
  const bookings = useMemo(() => {
    return allBookings.filter((b) => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      if (status == "finished") {
        return b.bookingInfo && b.bookingInfo.date < startOfToday;
      } else {
        return !b.bookingInfo || b.bookingInfo.date >= startOfToday;
      }
    });
  }, [status, allBookings]);

  return (
    <Page className="min-h-0">
      Danh sách đơn hàng
    </Page>
  );
}

export default AccountPage;
