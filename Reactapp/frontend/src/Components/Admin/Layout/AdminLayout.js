import React from 'react'
import AdminHeader from './AdminHeader'
import AdminNav from './AdminNav'
import AdminFooter from './AdminFooter'

const AdminLayout = (props) => {
  return (
    <>
    <AdminHeader />
    <AdminNav />
     {props.children}
    <AdminFooter />
    </>
  )
}

export default AdminLayout
