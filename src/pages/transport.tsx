import React from 'react'
import dynamic from 'next/dynamic';

const TransportSection = dynamic(
    () => import("@/features/Transport/components/TransportSection")
    // {
    //   loading: () => <Loader />,
    // }
);

const Transport = () => {
  return (
    <div>
        <TransportSection />
    </div>
  )
}

export default Transport