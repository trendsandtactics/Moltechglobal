import React from "react";
import OrderTrackingStep from "./OrderTrackingStep";
import ProductDetails from "./ProductDetails";

const orderTrackingData = [
  { id: 1, status: "Order Confirmed", date: "01 Oct 2024" },
  { id: 2, status: "Shipment Prepared", date: "02 Oct 2024" },
  { id: 3, status: "Delivery In Progress", date: "03 Oct 2024" },
  { id: 4, status: "Order Delivered", date: "04 Oct 2024" },
];

const OrderTrackingContent = () => {
  return (
    <section className="order-tracking-section py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ✅ Product Details Section */}
          <div className="lg:col-span-1">
            <ProductDetails />
          </div>

          {/* ✅ Order Tracking Steps */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-b-4 border-teal-500 inline-block">
                Order Tracking
              </h2>

              <div className="space-y-6 mt-6">
                {orderTrackingData.map((step, index) => (
                  <OrderTrackingStep
                    key={step.id}
                    status={step.status}
                    date={step.date}
                    isLast={index === orderTrackingData.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTrackingContent;
