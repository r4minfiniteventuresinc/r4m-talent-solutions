import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/EORHero.css';

export default function EORHero() {
  return (
    <section className="r4m-eor-hero">
      <div className="r4m-eor-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-eor-hero__content">
          <div className="r4m-eor-hero__breadcrumb">
            <Link to="/" className="r4m-eor-hero__link">Home</Link>
            <span className="r4m-eor-hero__dot">•</span>
            <Link to="/services" className="r4m-eor-hero__link">Services</Link>
            <span className="r4m-eor-hero__dot">•</span>
            <span className="r4m-eor-hero__current">Employer of Record</span>
          </div>

          <h1 className="r4m-eor-hero__title">Employer of Record (EOR)</h1>
          <p className="r4m-eor-hero__subtitle">
            Compliant employment infrastructure, automated payroll management, and full legal HR governance.
          </p>
          <div className="r4m-eor-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-eor-hero__accent-grey"></div>
      <div className="r4m-eor-hero__accent-orange"></div>
    </section>
  );
}
