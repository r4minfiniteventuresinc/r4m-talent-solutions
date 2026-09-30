import Hero from '../components/Home/Hero'
import AboutUs from '../components/Home/AboutUs'
import Services from '../components/Home/Services'
import FindJobBanner from '../components/Home/FindJobBanner'
import Industries from '../components/Home/Industries'
import WorkforceCTA from '../components/Home/WorkforceCTA'
import ForTalents from '../components/Home/ForTalents'
import Insights from '../components/Home/Insights'
import Vision from '../components/Home/Vision'
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <FindJobBanner />
        <Industries />
        <WorkforceCTA />
        <ForTalents />
        <Insights />
        <Vision />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}

export default Home