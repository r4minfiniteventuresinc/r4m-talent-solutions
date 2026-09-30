import { Link } from 'react-router-dom';
import '../../styles/components/SpecializedDetails.css';

export default function SpecializedDetails() {
  return (
    <section className="r4m-specialized-details">
      <div className="r4m-specialized-details__container">
        
        {/* Main Content Grid */}
        <div className="r4m-specialized-details__grid">
          
          {/* Left Column: What is Specialized & Technical Roles Talent Acquisition */}
          <div className="r4m-specialized-details__content">
            <span className="r4m-specialized-details__label">OVERVIEW</span>
            <h2 className="r4m-specialized-details__title">What is Specialized & Technical Talent Acquisition?</h2>
            
            <p className="r4m-specialized-details__lead">
              Specialized and technical recruitment is a targeted talent placement service designed to identify, evaluate, and secure high-value professionals with niche domain expertise, advanced engineering skills, or executive leadership capabilities.
            </p>

            <p className="r4m-specialized-details__text">
              In today's fast-evolving industrial, tech, logistics, and manufacturing sectors, critical roles cannot be filled through generic job postings. Specialized recruitment relies on proactive candidate mapping, deep industry networks, rigorous technical vetting, and confidential headhunting to connect enterprise leaders with top 5% talent.
            </p>

            {/* Core Pillars Grid */}
            <div className="r4m-specialized-details__pillars">
              
              <div className="r4m-specialized-pillar-card">
                <div className="r4m-specialized-pillar-card__icon">
                  <i className="bi bi-gear-wide-connected"></i>
                </div>
                <h3>Targeted Industry Headhunting</h3>
                <p>Direct outreach to passive, highly qualified candidates actively succeeding in niche technical and engineering domains.</p>
              </div>

              <div className="r4m-specialized-pillar-card">
                <div className="r4m-specialized-pillar-card__icon">
                  <i className="bi bi-check2-square"></i>
                </div>
                <h3>Technical Competency Vetting</h3>
                <p>Comprehensive qualification checks, technical portfolio validation, and background verifications before candidate presentation.</p>
              </div>

              <div className="r4m-specialized-pillar-card">
                <div className="r4m-specialized-pillar-card__icon">
                  <i className="bi bi-person-workspace"></i>
                </div>
                <h3>High-Retention Executive Search</h3>
                <p>Focus on long-term organizational alignment, cultural fit, and leadership stability for critical managerial vacancies.</p>
              </div>

              <div className="r4m-specialized-pillar-card">
                <div className="r4m-specialized-pillar-card__icon">
                  <i className="bi bi-lock-fill"></i>
                </div>
                <h3>Confidential Candidate Sourcing</h3>
                <p>Discreet candidate mapping and engagement protocols for sensitive restructuring or confidential leadership hires.</p>
              </div>

            </div>

          </div>

          {/* Right Column: Sidebar Box & Action */}
          <div className="r4m-specialized-details__sidebar">
            <div className="r4m-specialized-box">
              <div className="r4m-specialized-box__img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Specialized & Technical Talent"
                  className="r4m-specialized-box__img"
                />
              </div>

              <div className="r4m-specialized-box__body">
                <h3 className="r4m-specialized-box__title">Need Technical Talent?</h3>
                <p className="r4m-specialized-box__desc">
                  Connect with R4M headhunting experts to secure specialized technical professionals for your business.
                </p>

                <Link to="/contact" className="r4m-specialized-box__btn">
                  Talk to Our Search Experts <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
