import GradientBG from '@/components/home/GradientBG'
import Hero from '@/components/home/Hero.js'
import Feature from '@/components/home/Feature'
import Use from '@/components/home/Use'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import AvatarMenu from '@/components/Avatar/AvatarMenu'

export default function Home({ sess }) {
  return (
    <>
      <Navbar />
      <GradientBG />
      <Hero />
      <Feature />
      <Use />
      <Footer />
    </>
  )
}
