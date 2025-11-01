import React from "react";
import OrderTrackSearch from "@/components/Order/OrderTrackSearch";
import OrderTrackingContent from "@/components/Order/OrderTrackingContent";
import BraidcrumbStyleTwo from "@/components/BreadCrumb/BraidcrumbStyleTwo";

const OrderTracking = () => {
  return (
    <>
      <BraidcrumbStyleTwo title={"Order Track"} />
      <OrderTrackSearch />
      <OrderTrackingContent />
    </>
  );
};

export default OrderTracking;
