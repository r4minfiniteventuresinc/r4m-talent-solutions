import { useEffect } from 'react';
import EORHero from '../components/EOR/EORHero';
import EORDetails from '../components/EOR/EORDetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function EORPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <EORHero />
        <EORDetails />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
