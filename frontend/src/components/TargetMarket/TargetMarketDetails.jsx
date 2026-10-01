import { Link } from "react-router-dom";
import "../../styles/components/TargetMarketDetails.css";

const CLIENT_ITEMS = [
  {
    icon: "bi-graph-up-arrow",
    title: "Growing Businesses"
  },
  {
    icon: "bi-buildings",
    title: "Established Corporations"
  },
  {
    icon: "bi-people",
    title: "High-Volume Employers"
  },
  {
    icon: "bi-arrows-angle-expand",
    title: "Organizations Transforming or Expanding"
  },
  {
    icon: "bi-person-check",
    title: "Companies Strengthening Recruitment"
  }
];

const CANDIDATE_ITEMS = [
  {
    icon: "bi-person-badge",
    title: "Frontline & Skilled Workers"
  },
  {
    icon: "bi-mortarboard",
    title: "Early-Career Talent"
  },
  {
    icon: "bi-briefcase",
    title: "Technical & Specialized Professionals"
  },
  {
    icon: "bi-star",
    title: "Experienced Professionals"
  }
];

const INDUSTRIES_SERVED = [
  {
    title: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    icon: "bi-truck",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790831815/R4MWebDesign-image37-cWZfZ.png"
  },
  {
    title: "Manufacturing",
    slug: "manufacturing",
    icon: "bi-gear-fill",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790832343/R4MWebDesign-image38-vaUqt.png"
  },
  {
    title: "Retail & FMCG",
    slug: "retail-fmcg",
    icon: "bi-cart-fill",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790832409/R4MWebDesign-image39-AjfXk.png"
  },
  {
    title: "Hospitality, Food & Beverage",
    slug: "hospitality-food-beverage",
    icon: "bi-cup-hot-fill",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790832794/R4MWebDesign-image40-Wb8dm.png"
  },
  {
    title: "Construction & Engineering",
    slug: "construction-engineering",
    icon: "bi-hammer",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790833017/R4MWebDesign-image41-4UxBp.png"
  },
  {
    title: "E-Commerce",
    slug: "e-commerce",
    icon: "bi-bag-check-fill",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790833703/R4MWebDesign-image44-Amkqj.png"
  },
  {
    title: "Financial Services & FinTech",
    slug: "financial-services-fintech",
    icon: "bi-graph-up-arrow",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790833409/R4MWebDesign-image42-4v3du.png"
  },
  {
    title: "Technology & Digital",
    slug: "technology-digital",
    icon: "bi-display",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790833595/R4MWebDesign-image43-USk5y.png"
  }
];

export default function TargetMarketDetails() {
  return (
    <>
      {/* Top White Section: Two Audiences & Organizations/Individuals */}
      <section className="r4m-tm-details">
        <div className="r4m-tm-details__container">

          {/* Top Header Block */}
          <div className="r4m-tm-details__header">
            <span className="r4m-tm-details__tag">OUR TARGET MARKETS</span>
            <h2 className="r4m-tm-details__title">
              Two Audiences. <span className="orange-text">One Purpose.</span>
            </h2>
          </div>

          {/* Dual Hero Cards Row */}
          <div className="r4m-tm-cards-grid">

            {/* Card 1: For Clients */}
            <div className="r4m-tm-card-hero r4m-tm-card-hero--client">
              <div className="r4m-tm-card-hero__stripe r4m-tm-card-hero__stripe--left"></div>
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790848421/R4MWebDesign-image64-QLoQX.png"
                alt="For Clients"
                className="r4m-tm-card-hero__bg"
              />
              <div className="r4m-tm-card-hero__overlay"></div>

              <div className="r4m-tm-card-hero__content">
                <span className="r4m-tm-card-hero__tag">FOR CLIENTS</span>
                <h3 className="r4m-tm-card-hero__title">
                  Businesses that know the right people make the difference.
                </h3>
                <p className="r4m-tm-card-hero__desc">
                  Find skilled, qualified people for your workforce needs—at every stage of growth.
                </p>
                <a href="/#contact" className="r4m-tm-card-hero__btn">
                  Explore Client Solutions <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Card 2: For Candidates */}
            <div className="r4m-tm-card-hero r4m-tm-card-hero--candidate">
              <div className="r4m-tm-card-hero__stripe r4m-tm-card-hero__stripe--right"></div>
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790848664/R4MWebDesign-image65-ocxGw.png"
                alt="For Candidates"
                className="r4m-tm-card-hero__bg"
              />
              <div className="r4m-tm-card-hero__overlay"></div>

              <div className="r4m-tm-card-hero__content">
                <span className="r4m-tm-card-hero__tag">FOR CANDIDATES</span>
                <h3 className="r4m-tm-card-hero__title">
                  Talent at every stage. Opportunities that move lives forward.
                </h3>
                <p className="r4m-tm-card-hero__desc">
                  R4M Talent Solutions connects people with opportunities where they can contribute, grow, and build better futures.
                </p>
                <a href="/#jobs" className="r4m-tm-card-hero__btn">
                  Explore Opportunities <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Two Columns Section */}
          <div className="r4m-tm-columns-grid">

            {/* Left Column: Organizations */}
            <div className="r4m-tm-col">
              <span className="r4m-tm-col__tag">OUR SOLUTIONS ARE DESIGNED FOR:</span>
              <h2 className="r4m-tm-col__title">Organizations</h2>
              <p className="r4m-tm-col__desc">
                R4M Talent Solutions partners with organizations of different sizes and stages of growth—from emerging businesses building their teams to established companies strengthening and scaling their workforce.
              </p>

              <div className="r4m-tm-list">
                {CLIENT_ITEMS.map((item, idx) => (
                  <div key={idx} className="r4m-tm-pill">
                    <div className="r4m-tm-pill__icon">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <span className="r4m-tm-pill__text">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Individuals */}
            <div className="r4m-tm-col">
              <span className="r4m-tm-col__tag">WE CREATE OPPORTUNITIES FOR:</span>
              <h2 className="r4m-tm-col__title">Individuals</h2>
              <p className="r4m-tm-col__desc">
                From individuals entering the workforce to experienced professionals and senior leaders ready for their next challenge, we help candidates find opportunities that match their skills, experience, ambitions, and potential.
              </p>

              <div className="r4m-tm-list">
                {CANDIDATE_ITEMS.map((item, idx) => (
                  <div key={idx} className="r4m-tm-pill">
                    <div className="r4m-tm-pill__icon">
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <span className="r4m-tm-pill__text">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Separate Dedicated Grey Section: Industries We Serve */}
      <section className="r4m-tm-industries-section">
        <div className="r4m-tm-industries-container">

          <div className="r4m-tm-industries__header">
            <span className="r4m-tm-industries__tag">OUR EXPERTISE</span>
            <h2 className="r4m-tm-industries__title">
              Industries We <span className="orange-text">Serve</span>
            </h2>
            <p className="r4m-tm-industries__subtitle">
              We work with organizations and talent across multiple industries to create lasting opportunities.
            </p>
          </div>

          <div className="r4m-tm-industries__grid">
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <Link
                to={`/industries/${ind.slug}`}
                key={idx}
                className="r4m-tm-ind-card"
                style={{ textDecoration: 'none' }}
              >

                {/* Image Banner */}
                <div className="r4m-tm-ind-card__banner">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="r4m-tm-ind-card__img"
                  />
                </div>

                {/* Overlapping Orange Icon Badge */}
                <div className="r4m-tm-ind-card__badge">
                  <i className={`bi ${ind.icon}`}></i>
                </div>

                {/* Bottom Title Bar & Arrow */}
                <div className="r4m-tm-ind-card__bar">
                  <h3 className="r4m-tm-ind-card__title">{ind.title}</h3>
                  <span className="r4m-tm-ind-card__arrow" aria-label="Learn more">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </div>

              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

