import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/SolutionsHero.css';

export default function SolutionsHero() {
  return (
    <section className="r4m-solutions-hero">
      <div className="r4m-solutions-hero__container">
        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content Block */}
        <div className="r4m-solutions-hero__content">
          <div className="r4m-solutions-hero__breadcrumb">
            <Link to="/" className="r4m-solutions-hero__link">Home</Link>
            <span className="r4m-solutions-hero__dot">•</span>
            <Link to="/services" className="r4m-solutions-hero__link">Services</Link>
            <span className="r4m-solutions-hero__dot">•</span>
            <span className="r4m-solutions-hero__current">Find the Right Solutions</span>
          </div>

          <h1 className="r4m-solutions-hero__title">Find the Right Solutions</h1>
          <p className="r4m-solutions-hero__subtitle">
            Compare Manpower Outsourcing, RPO, and Employer of Record (EOR) to choose the optimal talent solution for your business.
          </p>
          <div className="r4m-solutions-hero__underline"></div>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="r4m-solutions-hero__accent-grey"></div>
      <div className="r4m-solutions-hero__accent-orange"></div>
    </section>
  );
}
