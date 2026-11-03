import ControlledCarousel from "../../Components/hero"
import React from 'react'
import AboutUs from "../../Components/aboutus"
import AdminLayout from "./Layout/AdminLayout";
import PetsList from "../cards";

const AdminHome=()=> {
  return (
    <>
      <AdminLayout>
        <ControlledCarousel />
        <PetsList />
        <AboutUs />
      </AdminLayout>
    </>
  )
}
export default AdminHome;