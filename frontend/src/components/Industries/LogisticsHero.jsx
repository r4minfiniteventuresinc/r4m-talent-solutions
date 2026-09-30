import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/LogisticsHero.css';

export default function LogisticsHero() {
  return (
    <section className="r4m-logistics-hero">
      <div className="r4m-logistics-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-logistics-hero__content">
          <div className="r4m-logistics-hero__breadcrumb">
            <Link to="/" className="r4m-logistics-hero__link">Home</Link>
            <span className="r4m-logistics-hero__dot">•</span>
            <span className="r4m-logistics-hero__current">Industries</span>
            <span className="r4m-logistics-hero__dot">•</span>
            <span className="r4m-logistics-hero__current">Logistics & Supply Chain</span>
          </div>

          <h1 className="r4m-logistics-hero__title">Logistics & Supply Chain</h1>
          <p className="r4m-logistics-hero__subtitle">
            Powering seamless end-to-end supply chain operations with vetted warehouse, fleet, freight, and distribution talent.
          </p>
          <div className="r4m-logistics-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-logistics-hero__accent-grey"></div>
      <div className="r4m-logistics-hero__accent-orange"></div>
    </section>
  );
}
