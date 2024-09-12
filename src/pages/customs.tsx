import React from 'react'
import dynamic from 'next/dynamic';

const Customs = dynamic(
  () => import("@/features/Customs/components/Customs")
  // {
  //   loading: () => <Loader />,
  // }
);

const CustomsPage = () => {
  return (
    <div>
      <Customs/>
    </div>
  )
}

export default CustomsPage