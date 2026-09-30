import { useEffect } from 'react';
import SolutionsHero from '../components/Solutions/SolutionsHero';
import SolutionsComparison from '../components/Solutions/SolutionsComparison';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function SolutionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <SolutionsHero />
        <SolutionsComparison />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
