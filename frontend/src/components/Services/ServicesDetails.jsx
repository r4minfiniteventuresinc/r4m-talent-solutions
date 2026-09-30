import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/ServicesDetails.css';

// =========================================================
// SERVICES DATA (Ready for your custom services content)
// =========================================================
const SERVICES_DATA = [
  /*
  {
    id: 'sample-service',
    badge: 'BADGE / CATEGORY',
    title: 'Service Title',
    description: 'Short summary of the service...',
    details: 'Full detailed breakdown of the service...',
    image: 'https://images.unsplash.com/...',
    highlights: [
      'Key capability 1',
      'Key capability 2'
    ]
  }
  */
];

export default function ServicesDetails() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section className="r4m-services-page-section">
      <div className="r4m-services-page-container">
        {SERVICES_DATA.length === 0 ? (
          <div className="r4m-services-placeholder">
            <div className="r4m-services-placeholder__icon">
              <i className="bi bi-briefcase-fill"></i>
            </div>
            <h2 className="r4m-services-placeholder__title">Services Content</h2>
            <p className="r4m-services-placeholder__text">
              We are ready to add your customized services details here. Share your service titles, descriptions, and features, and we will format them instantly.
            </p>
            <Link to="/contact" className="r4m-services-placeholder__btn">
              Get in Touch <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="r4m-services-page-nav">
              <button
                className={`r4m-services-page-tab ${activeTab === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Services
              </button>
              {SERVICES_DATA.map((service) => (
                <button
                  key={service.id}
                  className={`r4m-services-page-tab ${activeTab === service.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(service.id)}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Services List */}
            <div className="r4m-services-page-list">
              {(activeTab === 'all' ? SERVICES_DATA : SERVICES_DATA.filter(s => s.id === activeTab)).map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`r4m-services-detail-card ${index % 2 === 1 ? 'r4m-services-detail-card--reverse' : ''}`}
                >
                  {service.image && (
                    <div className="r4m-services-detail-card__image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="r4m-services-detail-card__img"
                      />
                      {service.badge && <span className="r4m-services-detail-card__badge">{service.badge}</span>}
                    </div>
                  )}

                  <div className="r4m-services-detail-card__content">
                    <h2 className="r4m-services-detail-card__title">{service.title}</h2>
                    {service.description && <p className="r4m-services-detail-card__desc">{service.description}</p>}
                    {service.details && <p className="r4m-services-detail-card__details">{service.details}</p>}

                    {service.highlights && service.highlights.length > 0 && (
                      <div className="r4m-services-detail-card__highlights">
                        <h4 className="r4m-services-detail-card__highlights-title">Key Capabilities:</h4>
                        <ul>
                          {service.highlights.map((point, i) => (
                            <li key={i}>
                              <i className="bi bi-check-circle-fill orange-check"></i>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="r4m-services-detail-card__actions">
                      <Link
                        to="/contact"
                        className="r4m-services-detail-card__btn r4m-services-detail-card__btn--primary"
                      >
                        Contact Us <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
