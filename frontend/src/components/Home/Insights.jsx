import { Link } from "react-router-dom";
import "../../styles/components/Insights.css";

const INSIGHTS_DATA = [
  {
    id: "businesses",
    badge: "For Businesses",
    title: "Hiring & Workforce Insights",
    description: "Practical perspectives on recruitment, workforce planning, and business growth.",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790836451/R4MWebDesign-image49-inVeS.png",
    link: "/insights?category=For Businesses",
  },
  {
    id: "talents",
    badge: "For Candidates",
    title: "Career Advice & Candidate Growth",
    description: "Practical perspectives on career growth, resume building, and job navigation.",
    image: "https://res.cloudinary.com/uoueul6i/image/upload/v1790836653/R4MWebDesign-image50-caASO.png",
    link: "/insights?category=For Candidates",
  },
];

export default function Insights() {
  return (
    <section className="r4m-insights" id="insights">
      <div className="r4m-insights__container">
        {/* Header Block */}
        <div className="r4m-insights__header">
          <h2 className="r4m-insights__title">
            Insights That Help<br />
            You <span className="orange">Move Forward</span>
          </h2>
          <p className="r4m-insights__subtitle">
            Practical insights, advice, and perspectives to help businesses make informed workforce decisions and talent navigate their next career opportunity.
          </p>
        </div>

        {/* 2 Cards Grid */}
        <div className="r4m-insights__grid">
          {INSIGHTS_DATA.map((item) => (
            <div className="r4m-insight-card" key={item.id}>
              {/* Top Image Banner with Orange Badge */}
              <Link to={item.link} className="r4m-insight-card__image-wrapper" style={{ display: 'block' }}>
                <img src={item.image} alt={item.title} className="r4m-insight-card__img" />
                <div className="r4m-insight-card__badge">{item.badge}</div>
              </Link>

              {/* Bottom Card Content */}
              <div className="r4m-insight-card__content">
                <h3 className="r4m-insight-card__title">{item.title}</h3>
                <p className="r4m-insight-card__desc">{item.description}</p>
                <Link to={item.link} className="r4m-insight-card__link">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
