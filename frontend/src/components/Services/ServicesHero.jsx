import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/ServicesHero.css';

export default function ServicesHero() {
  return (
    <section className="r4m-services-hero">
      <div className="r4m-services-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-services-hero__content">
          <div className="r4m-services-hero__breadcrumb">
            <Link to="/" className="r4m-services-hero__link">Home</Link>
            <span className="r4m-services-hero__dot">•</span>
            <span className="r4m-services-hero__current">Services</span>
          </div>

          <h1 className="r4m-services-hero__title">Explore Our Services</h1>
          <p className="r4m-services-hero__subtitle">
            Comprehensive workforce solutions, manpower outsourcing, RPO, and specialized talent acquisition tailored to drive your enterprise growth.
          </p>
          <div className="r4m-services-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-services-hero__accent-grey"></div>
      <div className="r4m-services-hero__accent-orange"></div>
    </section>
  );
}
