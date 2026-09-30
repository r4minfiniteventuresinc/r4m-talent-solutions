import { useEffect } from 'react';
import ManpowerHero from '../components/Manpower/ManpowerHero';
import ManpowerDetails from '../components/Manpower/ManpowerDetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function ManpowerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <ManpowerHero />
        <ManpowerDetails />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
