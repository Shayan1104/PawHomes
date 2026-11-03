import React from 'react'
import Header from '../Header'
import Footer from '../Components/footer'
import Navebar from '../Components/navebar'
function Layout(props) {
    
  return (
    <>
    <Header />
    <Navebar />
     {props.children}
    <Footer />
    </>
  )
}

export default Layout;
