import { Link } from "react-router-dom";
import "../../styles/components/Industries.css";

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

export default function Industries() {
  return (
    <section className="r4m-industries" id="industries">
      <div className="r4m-industries__container">
        {/* Header Block */}
        <div className="r4m-industries__header">
          <span className="r4m-industries__tag">FOR BUSINESSES</span>
          <h2 className="r4m-industries__title">
            INDUSTRIES WE <span className="orange">SERVE</span>
          </h2>
          <p className="r4m-industries__subtitle">
            R4M works with organizations across industries with different workforce requirements.
          </p>
        </div>

        {/* 3-Column Card Grid matching Target Market style */}
        <div className="r4m-industries__grid">
          {INDUSTRIES_SERVED.map((ind, idx) => (
            <Link
              to={`/industries/${ind.slug}`}
              key={idx}
              className="r4m-industry-card"
            >
              {/* Banner Image */}
              <div className="r4m-industry-card__image-wrapper">
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="r4m-industry-card__img"
                />
              </div>

              {/* Overlapping Orange Icon Badge */}
              <div className="r4m-industry-card__badge">
                <i className={`bi ${ind.icon}`}></i>
              </div>

              {/* Bottom Title Bar & Arrow */}
              <div className="r4m-industry-card__title-bar">
                <h3 className="r4m-industry-card__title">{ind.title}</h3>
                <span className="r4m-industry-card__arrow" aria-label="Learn more">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

