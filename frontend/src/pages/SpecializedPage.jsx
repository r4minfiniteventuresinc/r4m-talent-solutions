import { useEffect } from 'react';
import SpecializedHero from '../components/Specialized/SpecializedHero';
import SpecializedDetails from '../components/Specialized/SpecializedDetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function SpecializedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <SpecializedHero />
        <SpecializedDetails />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
