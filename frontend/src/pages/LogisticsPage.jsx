import { useEffect } from 'react';
import LogisticsHero from '../components/Industries/LogisticsHero';
import LogisticsDetails from '../components/Industries/LogisticsDetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function LogisticsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <LogisticsHero />
        <LogisticsDetails />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
