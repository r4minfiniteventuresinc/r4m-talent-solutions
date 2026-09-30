import { Link } from "react-router-dom";
import "../../styles/components/Industries.css";

const INDUSTRIES_SERVED = [
  {
    title: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    icon: "bi-truck",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Manufacturing",
    slug: "manufacturing",
    icon: "bi-gear-fill",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Retail & FMCG",
    slug: "retail-fmcg",
    icon: "bi-cart-fill",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Hospitality, Food & Beverage",
    slug: "hospitality-food-beverage",
    icon: "bi-cup-hot-fill",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Construction & Engineering",
    slug: "construction-engineering",
    icon: "bi-hammer",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "E-Commerce",
    slug: "e-commerce",
    icon: "bi-bag-check-fill",
    image: "https://images.unsplash.com/photo-1556742049-0a67daf64f42?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Financial Services & FinTech",
    slug: "financial-services-fintech",
    icon: "bi-graph-up-arrow",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Technology & Digital",
    slug: "technology-digital",
    icon: "bi-display",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
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

