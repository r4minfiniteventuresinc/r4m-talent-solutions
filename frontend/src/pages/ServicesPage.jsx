import { useEffect } from 'react';
import ServicesHero from '../components/Services/ServicesHero';
import ServicesDetails from '../components/Services/ServicesDetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <ServicesHero />
        <ServicesDetails />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
