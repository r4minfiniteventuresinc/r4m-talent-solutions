import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/SpecializedHero.css';

export default function SpecializedHero() {
  return (
    <section className="r4m-specialized-hero">
      <div className="r4m-specialized-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-specialized-hero__content">
          <div className="r4m-specialized-hero__breadcrumb">
            <Link to="/" className="r4m-specialized-hero__link">Home</Link>
            <span className="r4m-specialized-hero__dot">•</span>
            <Link to="/services" className="r4m-specialized-hero__link">Services</Link>
            <span className="r4m-specialized-hero__dot">•</span>
            <span className="r4m-specialized-hero__current">Specialized & Technical Roles</span>
          </div>

          <h1 className="r4m-specialized-hero__title">Specialized & Technical Roles</h1>
          <p className="r4m-specialized-hero__subtitle">
            Precision talent acquisition and executive search for high-impact technical, engineering, and managerial positions.
          </p>
          <div className="r4m-specialized-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-specialized-hero__accent-grey"></div>
      <div className="r4m-specialized-hero__accent-orange"></div>
    </section>
  );
}
