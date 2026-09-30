import { Link } from 'react-router-dom';
import '../../styles/components/LogisticsDetails.css';

export default function IndustryTemplateDetails({ data }) {
  if (!data) return null;

  return (
    <section className="r4m-logistics-details">
      <div className="r4m-logistics-details__container">
        
        {/* Main Content Grid */}
        <div className="r4m-logistics-details__grid">
          
          {/* Left Column: Overview & Industry Value */}
          <div className="r4m-logistics-details__content">
            <span className="r4m-logistics-details__label">INDUSTRY EXCELLENCE</span>
            <h2 className="r4m-logistics-details__title">Workforce Solutions for {data.title}</h2>
            
            <p className="r4m-logistics-details__lead">{data.lead}</p>

            <p className="r4m-logistics-details__text">{data.description}</p>

            {/* Key Roles We Staff Section */}
            {data.roles && data.roles.length > 0 && (
              <div className="r4m-logistics-roles-section">
                <h3 className="r4m-logistics-roles-title">Key Talent & Roles We Provide</h3>
                
                <div className="r4m-logistics-roles-grid">
                  {data.roles.map((group, idx) => (
                    <div className="r4m-logistics-role-card" key={idx}>
                      <div className="r4m-logistics-role-card__header">
                        <div className="r4m-logistics-role-card__icon">
                          <i className={`bi ${group.icon}`}></i>
                        </div>
                        <h4>{group.category}</h4>
                      </div>
                      <ul className="r4m-logistics-role-card__list">
                        {group.items.map((item, i) => (
                          <li key={i}>
                            <i className="bi bi-check-circle-fill orange-check"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4 Pillars of R4M Industry Staffing */}
            {data.pillars && data.pillars.length > 0 && (
              <div className="r4m-logistics-pillars">
                <h3 className="r4m-logistics-pillars-title">Why {data.title} Leaders Partner With R4M</h3>
                
                <div className="r4m-logistics-pillars-grid">
                  {data.pillars.map((pillar, i) => (
                    <div className="r4m-logistics-pillar" key={i}>
                      <div className="r4m-logistics-pillar__icon">
                        <i className={`bi ${pillar.icon}`}></i>
                      </div>
                      <h4>{pillar.title}</h4>
                      <p>{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar CTA Box */}
          <div className="r4m-logistics-details__sidebar">
            <div className="r4m-logistics-box">
              <div className="r4m-logistics-box__img-wrap">
                <img
                  src={data.heroImage}
                  alt={`${data.title} Workforce Solutions`}
                  className="r4m-logistics-box__img"
                />
              </div>

              <div className="r4m-logistics-box__body">
                <h3 className="r4m-logistics-box__title">Need {data.title} Staffing?</h3>
                <p className="r4m-logistics-box__desc">
                  Connect with R4M industry specialists to deploy certified {data.title.toLowerCase()} personnel tailored to your operations.
                </p>

                <Link to="/contact" className="r4m-logistics-box__btn">
                  Request {data.title} Talent <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
