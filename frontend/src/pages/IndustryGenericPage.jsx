import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { INDUSTRY_DATA } from '../data/industryData';
import IndustryTemplateHero from '../components/Industries/IndustryTemplateHero';
import IndustryTemplateDetails from '../components/Industries/IndustryTemplateDetails';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

export default function IndustryGenericPage({ slug: propSlug }) {
  const params = useParams();
  const activeSlug = propSlug || params.slug;

  const data = INDUSTRY_DATA[activeSlug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSlug]);

  if (!data) {
    return (
      <>
        <main style={{ padding: '120px 20px', textAlign: 'center', fontFamily: 'Montserrat, sans-serif' }}>
          <h2>Industry Not Found</h2>
          <p>We could not find the industry page you are looking for.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <IndustryTemplateHero data={data} />
        <IndustryTemplateDetails data={data} />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
