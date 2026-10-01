import { Link } from "react-router-dom";
import "../../styles/components/Services.css";

const SERVICES_DATA = [
  {
    id: "manpower",
    titleLine1: "Manpower",
    titleLine2: "Outsourcing",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790824406/R4MWebDesign-image32-kWG3D.png",
    description:
      "Leverage our specialised industry expertise, and global reach to champion your story and connect you with the best professionals who will transform your business.",
    href: "/manpower-outsourcing",
  },
  {
    id: "rpo",
    titleLine1: "Recruitment Process",
    titleLine2: "Outsourcing",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790824415/R4MWebDesign-image33-VRuXk.png",
    description:
      "Experience agile recruitment outsourcing solutions tailored to your unique requirements, seamlessly scalable to match your evolving needs and objectives.",
    href: "/recruitment-process-outsourcing",
  },
  {
    id: "eor",
    titleLine1: "Employer of",
    titleLine2: "Records",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790824424/R4MWebDesign-image34-5wMPk.png",
    description:
      "Expand your team globally without administrative burdens. R4M’s Employer of Record (EOR) services handle payroll, compliance, and HR so you can focus on growth.",
    href: "/employer-of-record",
  },
];

export default function Services() {
  return (
    <section className="r4m-services" id="services">
      {/* Giant R4M Watermark Text Background */}
      <div className="r4m-services__bg-watermark" aria-hidden="true">
        R4M
      </div>

      <div className="r4m-services__container">
        {/* Header Block */}
        <div className="r4m-services__header">
          <span className="r4m-services__label">OUR SERVICES</span>
          <h2 className="r4m-services__title">
            <span className="orange">Solutions</span> Built<br />
            Around Your <span className="orange">Business</span>
          </h2>
          <p className="r4m-services__subtitle">
            Different businesses have different workforce challenges. R4M builds talent solutions around what your organization needs to perform, grow, and move forward.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="r4m-services__grid">
          {SERVICES_DATA.map((service) => (
            <div className="r4m-service-card" key={service.id}>
              {/* Top Graphic Banner Image with Text Overlay */}
              <Link to={service.href} className="r4m-service-card__banner" style={{ display: 'block', textDecoration: 'none' }}>
                <img
                  src={service.image}
                  alt={`${service.titleLine1} ${service.titleLine2}`}
                  className="r4m-service-card__banner-img"
                />
                <div className="r4m-service-card__banner-overlay">
                  <h3 className="r4m-service-card__title">
                    <span>{service.titleLine1}</span>
                    <span>{service.titleLine2}</span>
                  </h3>
                  <div className="r4m-service-card__title-line"></div>
                </div>
              </Link>

              {/* Bottom Card Content */}
              <div className="r4m-service-card__content">
                <p className="r4m-service-card__desc">{service.description}</p>
                <Link to={service.href} className="r4m-service-card__link">
                  <span className="r4m-service-card__link-text">Learn more</span>
                  <span className="r4m-service-card__arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
