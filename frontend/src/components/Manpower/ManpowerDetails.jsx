import { Link } from 'react-router-dom';
import '../../styles/components/ManpowerDetails.css';

export default function ManpowerDetails() {
  return (
    <section className="r4m-manpower-details">
      <div className="r4m-manpower-details__container">

        {/* Main Content Grid */}
        <div className="r4m-manpower-details__grid">

          {/* Left Column: What is Manpower Outsourcing */}
          <div className="r4m-manpower-details__content">
            <span className="r4m-manpower-details__label">OVERVIEW</span>
            <h2 className="r4m-manpower-details__title">What is Manpower Outsourcing?</h2>

            <p className="r4m-manpower-details__lead">
              Manpower outsourcing is a strategic business solution where an organization partners with a specialized third-party talent provider to recruit, deploy, and manage skilled personnel for operational needs.
            </p>

            <p className="r4m-manpower-details__text">
              Instead of incurring heavy internal HR overhead, hiring delays, and long-term administrative liabilities, enterprises leverage manpower outsourcing to access ready-to-deploy talent pools. The outsourcing partner handles recruitment, onboarding, payroll, labor compliance, and ongoing management, allowing businesses to remain focused on core operational goals.
            </p>

            {/* Core Pillars Grid */}
            <div className="r4m-manpower-details__pillars">

              <div className="r4m-manpower-pillar-card">
                <div className="r4m-manpower-pillar-card__icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h3>Workforce Elasticity</h3>
                <p>Seamlessly scale workforce capacity up or down to align with peak seasons, project deadlines, and shifting market demand.</p>
              </div>

              <div className="r4m-manpower-pillar-card">
                <div className="r4m-manpower-pillar-card__icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3>Compliance & Risk Mitigation</h3>
                <p>Ensure full adherence to local labor laws, employment contracts, mandatory benefits, and regulatory standards.</p>
              </div>

              <div className="r4m-manpower-pillar-card">
                <div className="r4m-manpower-pillar-card__icon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <h3>Rapid Deployment</h3>
                <p>Minimize time-to-fill with pre-screened, qualified candidates who are ready for immediate field integration.</p>
              </div>

              <div className="r4m-manpower-pillar-card">
                <div className="r4m-manpower-pillar-card__icon">
                  <i className="bi bi-piggy-bank-fill"></i>
                </div>
                <h3>Cost & Overhead Efficiency</h3>
                <p>Reduce recruitment, training, and administrative expenses while maintaining total financial flexibility.</p>
              </div>

            </div>

          </div>

          {/* Right Column: Visual Feature Box & Call to Action */}
          <div className="r4m-manpower-details__sidebar">
            <div className="r4m-manpower-box">
              <div className="r4m-manpower-box__img-wrap">
                <img
                  src="https://res.cloudinary.com/uoueul6i/image/upload/v1790831815/R4MWebDesign-image37-cWZfZ.png"
                  alt="Manpower Outsourcing Team"
                  className="r4m-manpower-box__img"
                />
              </div>

              <div className="r4m-manpower-box__body">
                <h3 className="r4m-manpower-box__title">Ready to Scale Your Workforce?</h3>
                <p className="r4m-manpower-box__desc">
                  Discover how R4M Talent Solutions delivers tailored manpower outsourcing to power your operational growth.
                </p>

                <Link to="/contact" className="r4m-manpower-box__btn">
                  Talk to Our Experts <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
