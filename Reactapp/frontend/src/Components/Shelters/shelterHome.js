import React from 'react'
import ControlledCarousel from '../hero'
import ShelterNav from './Layout/shelterNav'
import PetsList from '../cards'
import AboutUs from '../aboutus'
import Footer from '../footer'
import Navebar from '../navebar'

const ShelterHome = () => {
  return (
    <div>
      <ShelterNav/>
      <Navebar />
      <ControlledCarousel />
      <PetsList />
      <AboutUs />
      <Footer />
    </div>
  )
}

export default ShelterHome;
