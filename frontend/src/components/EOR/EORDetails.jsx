import { Link } from 'react-router-dom';
import '../../styles/components/EORDetails.css';

export default function EORDetails() {
  return (
    <section className="r4m-eor-details">
      <div className="r4m-eor-details__container">
        
        {/* Main Content Grid */}
        <div className="r4m-eor-details__grid">
          
          {/* Left Column: What is Employer of Record (EOR) */}
          <div className="r4m-eor-details__content">
            <span className="r4m-eor-details__label">OVERVIEW</span>
            <h2 className="r4m-eor-details__title">What is Employer of Record (EOR)?</h2>
            
            <p className="r4m-eor-details__lead">
              An Employer of Record (EOR) is a legal service provider that officially hires, pays, and manages employment compliance for personnel on behalf of another company.
            </p>

            <p className="r4m-eor-details__text">
              By utilizing an EOR framework, organizations can hire and onboard local or distributed talent without needing to set up complex legal entities or navigate unfamiliar labor regulations. While your business maintains full operational control over day-to-day employee tasks and goals, the EOR partner handles legal employment contracts, payroll tax withholdings, statutory benefits administration, and labor compliance.
            </p>

            {/* Core Pillars Grid */}
            <div className="r4m-eor-details__pillars">
              
              <div className="r4m-eor-pillar-card">
                <div className="r4m-eor-pillar-card__icon">
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
                <h3>Legal Employment & Compliance</h3>
                <p>Ensure 100% adherence to local labor laws, employment contracts, termination policies, and statutory regulations.</p>
              </div>

              <div className="r4m-eor-pillar-card">
                <div className="r4m-eor-pillar-card__icon">
                  <i className="bi bi-bank2"></i>
                </div>
                <h3>Payroll & Tax Administration</h3>
                <p>Automate monthly salary disbursements, tax withholdings, currency conversions, and government filings seamlessly.</p>
              </div>

              <div className="r4m-eor-pillar-card">
                <div className="r4m-eor-pillar-card__icon">
                  <i className="bi bi-heart-pulse-fill"></i>
                </div>
                <h3>Statutory Benefits Management</h3>
                <p>Provide comprehensive employee healthcare, insurance coverage, social security, and mandatory local benefits.</p>
              </div>

              <div className="r4m-eor-pillar-card">
                <div className="r4m-eor-pillar-card__icon">
                  <i className="bi bi-globe2"></i>
                </div>
                <h3>Entity-Free Expansion</h3>
                <p>Onboard top talent instantly in new markets without establishing costly local corporate entities or business registrations.</p>
              </div>

            </div>

          </div>

          {/* Right Column: Sidebar Box & Action */}
          <div className="r4m-eor-details__sidebar">
            <div className="r4m-eor-box">
              <div className="r4m-eor-box__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Employer of Record Solutions"
                  className="r4m-eor-box__img"
                />
              </div>

              <div className="r4m-eor-box__body">
                <h3 className="r4m-eor-box__title">Expand Without HR Friction</h3>
                <p className="r4m-eor-box__desc">
                  Learn how R4M Employer of Record services empower compliant workforce expansion with zero entity setup.
                </p>

                <Link to="/contact" className="r4m-eor-box__btn">
                  Talk to Our EOR Specialists <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
