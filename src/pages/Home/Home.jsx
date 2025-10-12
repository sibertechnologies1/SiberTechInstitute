import React from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import HeroVideo from '../../components/Herovideo/HeroVideo'
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel'
import Upcoming from '../../components/Upcoming/Upcoming'
import Hero2 from '../../components/Hero2/Hero2'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import FactsWithVideo from '../../components/FactsWithVideo/FactsWithVideo'
import ContactUs from '../../components/ContactUs/ContactUs'
import Footer from '../../components/Footer/Footer'
import ChatWidget from '../../components/ChatWidget/ChatWidget'

function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <HeroVideo />
      <HomeCarousel />
      <Upcoming />
      <Hero2 />
      <PopularCourses />
      <FactsWithVideo />
      <ContactUs />
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default Home
