import { useEffect } from 'react';
import RPOHero from '../components/RPO/RPOHero';
import RPODetails from '../components/RPO/RPODetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function RPOPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <RPOHero />
        <RPODetails />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
