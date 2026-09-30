import { Link } from 'react-router-dom';
import '../../styles/components/RPODetails.css';

export default function RPODetails() {
  return (
    <section className="r4m-rpo-details">
      <div className="r4m-rpo-details__container">
        
        {/* Main Content Grid */}
        <div className="r4m-rpo-details__grid">
          
          {/* Left Column: What is Recruitment Process Outsourcing (RPO) */}
          <div className="r4m-rpo-details__content">
            <span className="r4m-rpo-details__label">OVERVIEW</span>
            <h2 className="r4m-rpo-details__title">What is Recruitment Process Outsourcing (RPO)?</h2>
            
            <p className="r4m-rpo-details__lead">
              Recruitment Process Outsourcing (RPO) is a strategic business model where an enterprise transfers all or part of its recruitment operations to an external talent acquisition specialist.
            </p>

            <p className="r4m-rpo-details__text">
              Unlike traditional headhunting or transactional staffing, an RPO partner acts as a seamless extension of your internal HR department. The RPO provider delivers dedicated recruiters, technology infrastructure, candidate sourcing pipelines, screening, and employer branding to manage the full hiring lifecycle with lower cost-per-hire and accelerated time-to-fill metrics.
            </p>

            {/* Core Pillars Grid */}
            <div className="r4m-rpo-details__pillars">
              
              <div className="r4m-rpo-pillar-card">
                <div className="r4m-rpo-pillar-card__icon">
                  <i className="bi bi-diagram-3-fill"></i>
                </div>
                <h3>Scalable Hiring Infrastructure</h3>
                <p>Dynamically scale recruiter capacity and talent pipelines up or down to align with business expansion and hiring spikes.</p>
              </div>

              <div className="r4m-rpo-pillar-card">
                <div className="r4m-rpo-pillar-card__icon">
                  <i className="bi bi-funnel-fill"></i>
                </div>
                <h3>Targeted Sourcing & Screening</h3>
                <p>Deploy advanced candidate sourcing, automated screening tools, and structured competency evaluations for higher hiring quality.</p>
              </div>

              <div className="r4m-rpo-pillar-card">
                <div className="r4m-rpo-pillar-card__icon">
                  <i className="bi bi-stopwatch-fill"></i>
                </div>
                <h3>Reduced Time & Cost-Per-Hire</h3>
                <p>Streamline talent acquisition workflows to significantly lower recruitment overhead and shorten candidate deployment windows.</p>
              </div>

              <div className="r4m-rpo-pillar-card">
                <div className="r4m-rpo-pillar-card__icon">
                  <i className="bi bi-award-fill"></i>
                </div>
                <h3>Employer Brand Enhancement</h3>
                <p>Enhance candidate experience, build proprietary talent pools, and strengthen corporate market reputation in key sectors.</p>
              </div>

            </div>

          </div>

          {/* Right Column: Sidebar Box & Action */}
          <div className="r4m-rpo-details__sidebar">
            <div className="r4m-rpo-box">
              <div className="r4m-rpo-box__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Recruitment Process Outsourcing"
                  className="r4m-rpo-box__img"
                />
              </div>

              <div className="r4m-rpo-box__body">
                <h3 className="r4m-rpo-box__title">Optimize Your Hiring Process</h3>
                <p className="r4m-rpo-box__desc">
                  Learn how R4M RPO solutions streamline end-to-end recruitment tailored to your corporate objectives.
                </p>

                <Link to="/contact" className="r4m-rpo-box__btn">
                  Talk to Our RPO Experts <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
