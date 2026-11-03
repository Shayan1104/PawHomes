import Layout from "../Layout/Layout";
import ControlledCarousel from "../Components/hero";
import React from 'react'
import AboutUs from "../Components/aboutus";
import Pets from "../Components/cards";

const Home=()=> {
  return (
    <>
      <Layout>
        <ControlledCarousel />
        <Pets/>
        <AboutUs />
      </Layout>
    </>
  )
}
export default Home;