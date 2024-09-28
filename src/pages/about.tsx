import dynamic from 'next/dynamic';
import React from 'react'

const AboutUsSection = dynamic(
    () => import("@/features/AboutUs/components/AboutUsSection"),
    // {
    //   loading: () => <LoadingSpinner fullscreen={true} size="large" />,
    // }
);

const About = () => {
  return (
    <div>
        <AboutUsSection/>
    </div>
  )
}

export default About