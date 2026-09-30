import "../../styles/components/Services.css";

const SERVICES_DATA = [
  {
    id: "manpower",
    title: "Manpower Outsourcing",
    titleLine1: "Manpower",
    titleLine2: "Outsourcing",
    description:
      "Leverage our specialised industry expertise, and global reach to champion your story and connect you with the best professionals who will transform your business.",
    href: "#manpower",
    variant: "card-1",
  },
  {
    id: "rpo",
    title: "Recruitment Process Outsourcing",
    titleLine1: "Recruitment Process",
    titleLine2: "Outsourcing",
    description:
      "Experience agile recruitment outsourcing solutions tailored to your unique requirements, seamlessly scalable to match your evolving needs and objectives.",
    href: "#rpo",
    variant: "card-2",
  },
  {
    id: "eor",
    title: "Employer of Records",
    titleLine1: "Employer of",
    titleLine2: "Records",
    description:
      "Expand your team globally without administrative burdens. R4M’s Employer of Record (EOR) services handle payroll, compliance, and HR so you can focus on growth.",
    href: "#eor",
    variant: "card-3",
  },
];

export default function Services() {
  return (
    <section className="r4m-services" id="services">
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
            <div className={`r4m-service-card r4m-service-card--${service.variant}`} key={service.id}>
              {/* Top Graphic Banner */}
              <div className="r4m-service-card__banner">
                <div className="r4m-service-card__shape r4m-service-card__shape--1"></div>
                <div className="r4m-service-card__shape r4m-service-card__shape--2"></div>
                <div className="r4m-service-card__shape r4m-service-card__shape--3"></div>
                <h3 className="r4m-service-card__title">
                  <span>{service.titleLine1}</span>
                  <span>{service.titleLine2}</span>
                </h3>
              </div>

              {/* Bottom Card Content */}
              <div className="r4m-service-card__content">
                <p className="r4m-service-card__desc">{service.description}</p>
                <a href={service.href} className="r4m-service-card__link">
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
