import dynamic from 'next/dynamic';
import React from 'react'

const UsingInfoSection = dynamic(
  () => import("@/features/UsingInfo/components/UsingInfoSection")
  // {
  //   loading: () => <Loader />,
  // }
);

const Usinginfo = () => {
  return (
    <div><UsingInfoSection /></div>
  )
}

export default Usinginfo