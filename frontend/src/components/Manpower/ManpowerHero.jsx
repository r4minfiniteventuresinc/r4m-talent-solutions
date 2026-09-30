import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/ManpowerHero.css';

export default function ManpowerHero() {
  return (
    <section className="r4m-manpower-hero">
      <div className="r4m-manpower-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-manpower-hero__content">
          <div className="r4m-manpower-hero__breadcrumb">
            <Link to="/" className="r4m-manpower-hero__link">Home</Link>
            <span className="r4m-manpower-hero__dot">•</span>
            <Link to="/services" className="r4m-manpower-hero__link">Services</Link>
            <span className="r4m-manpower-hero__dot">•</span>
            <span className="r4m-manpower-hero__current">Manpower Outsourcing</span>
          </div>

          <h1 className="r4m-manpower-hero__title">Manpower Outsourcing</h1>
          <p className="r4m-manpower-hero__subtitle">
            Empowering enterprises with flexible, compliant, and scalable workforce solutions.
          </p>
          <div className="r4m-manpower-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-manpower-hero__accent-grey"></div>
      <div className="r4m-manpower-hero__accent-orange"></div>
    </section>
  );
}
