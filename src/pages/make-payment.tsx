import dynamic from "next/dynamic";
import React from "react";

const MakePaymentSection = dynamic(
  () => import("@/features/MakePayment/components/MakePayment")
  // {
  //   loading: () => <Loader />,
  // }
);

const MakePayment = () => {
  return (
    <div>
      <MakePaymentSection />
    </div>
  );
};

export default MakePayment;
