import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/RPOHero.css';

export default function RPOHero() {
  return (
    <section className="r4m-rpo-hero">
      <div className="r4m-rpo-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-rpo-hero__content">
          <div className="r4m-rpo-hero__breadcrumb">
            <Link to="/" className="r4m-rpo-hero__link">Home</Link>
            <span className="r4m-rpo-hero__dot">•</span>
            <Link to="/services" className="r4m-rpo-hero__link">Services</Link>
            <span className="r4m-rpo-hero__dot">•</span>
            <span className="r4m-rpo-hero__current">Recruitment Process Outsourcing</span>
          </div>

          <h1 className="r4m-rpo-hero__title">Recruitment Process Outsourcing</h1>
          <p className="r4m-rpo-hero__subtitle">
            Transforming internal recruitment capabilities with scalable, data-driven talent acquisition solutions.
          </p>
          <div className="r4m-rpo-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-rpo-hero__accent-grey"></div>
      <div className="r4m-rpo-hero__accent-orange"></div>
    </section>
  );
}
