import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/ServicesDetails.css';

// =========================================================
// SERVICES DATA
// =========================================================
const SERVICES_DATA = [
  {
    id: "manpower-outsourcing",
    badge: "WORKFORCE SOLUTIONS",
    title: "Manpower Outsourcing",
    description: "Leverage our specialised industry expertise, and global reach to champion your story and connect you with the best professionals who will transform your business.",
    details: "Whether you need high-volume frontline staffing, skilled technical labor, or flexible project-based teams, R4M's manpower outsourcing solutions provide vetted, dependable workforce capacity tailored to your operational demands.",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790824406/R4MWebDesign-image32-kWG3D.png",
    link: "/manpower-outsourcing",
    highlights: [
      "Vetted frontline labor, skilled technicians, and operations staff on demand",
      "Flexible staffing models tailored to changing operational requirements",
      "End-to-end workforce onboarding, compliance management, and payroll administration"
    ]
  },
  {
    id: "recruitment-process-outsourcing",
    badge: "TALENT ACQUISITION",
    title: "Recruitment Process Outsourcing",
    description: "Experience agile recruitment outsourcing solutions tailored to your unique requirements, seamlessly scalable to match your evolving needs and objectives.",
    details: "R4M serves as a seamless extension of your internal talent acquisition team. We handle the end-to-end recruitment lifecycle, driving efficiency, reducing time-to-hire, and delivering top-tier candidates.",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790824415/R4MWebDesign-image33-VRuXk.png",
    link: "/recruitment-process-outsourcing",
    highlights: [
      "End-to-end recruitment lifecycle management from candidate sourcing to hire",
      "Scalable talent acquisition capacity to handle peak hiring volumes",
      "Rigorous candidate screening, skill assessments, and hiring analytics"
    ]
  },
  {
    id: "employer-of-record",
    badge: "GLOBAL HR & COMPLIANCE",
    title: "Employer of Records",
    description: "Expand your team globally without administrative burdens. R4M’s Employer of Record (EOR) services handle payroll, compliance, and HR so you can focus on growth.",
    details: "Hire talent anywhere with confidence. R4M acts as the legal employer for your team, managing contracts, local statutory compliance, payroll withholdings, and HR support while you direct day-to-day work.",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790824424/R4MWebDesign-image34-5wMPk.png",
    link: "/employer-of-record",
    highlights: [
      "Full local employment compliance and statutory risk mitigation",
      "Timely payroll processing, tax filings, and employee benefits administration",
      "Streamlined onboarding and dedicated HR support for your remote workforce"
    ]
  }
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
                        to={service.link || "/contact"}
                        className="r4m-services-detail-card__btn r4m-services-detail-card__btn--primary"
                      >
                        Learn More <i className="bi bi-arrow-right"></i>
                      </Link>
                      <Link
                        to="/contact"
                        className="r4m-services-detail-card__btn r4m-services-detail-card__btn--outline"
                      >
                        Contact Us
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
