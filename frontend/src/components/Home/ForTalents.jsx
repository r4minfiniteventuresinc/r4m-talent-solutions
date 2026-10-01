import { Link } from "react-router-dom";
import "../../styles/components/ForTalents.css";

const TALENT_CATEGORIES = [
  {
    id: "frontline",
    titleLine1: "Frontline & Skilled",
    titleLine2: "Workers",
    icon: "bxs:wrench",
  },
  {
    id: "early-career",
    titleLine1: "Early-Career",
    titleLine2: "Talent",
    icon: "fluent:hat-graduation-12-filled",
  },
  {
    id: "specialized",
    titleLine1: "Specialized & Technical",
    titleLine2: "Roles",
    icon: "ant-design:code-filled",
  },
  {
    id: "experienced",
    titleLine1: "Experienced",
    titleLine2: "Professionals",
    icon: "bxs:briefcase",
  },
];

export default function ForTalents() {
  return (
    <section className="r4m-talents" id="talents">
      <div className="r4m-talents__container">
        {/* Header Block */}
        <div className="r4m-talents__header">
          <span className="r4m-talents__tag">FOR TALENTS</span>
          <h2 className="r4m-talents__title">
            The <span className="orange">Right Opportunity</span><br />
            Can <span className="orange">Transform</span> a Life.
          </h2>
          <p className="r4m-talents__subtitle">
            Whether you're entering the workforce, building experience, advancing your career, or looking for your next leadership opportunity, R4M connects talent with opportunities aligned with their skills, experience, ambitions, and potential.
          </p>
        </div>

        {/* 4-Column Category Items */}
        <div className="r4m-talents__grid">
          {TALENT_CATEGORIES.map((item) => (
            <Link to="/jobs" className="r4m-talent-card" key={item.id} style={{ textDecoration: 'none' }}>
              <div className="r4m-talent-card__icon-wrapper">
                <iconify-icon icon={item.icon} class="r4m-talent-card__icon"></iconify-icon>
              </div>
              <h3 className="r4m-talent-card__title">
                <span>{item.titleLine1}</span>
                <span>{item.titleLine2}</span>
              </h3>
            </Link>
          ))}
        </div>

        {/* Explore Opportunities CTA Button */}
        <div className="r4m-talents__cta">
          <Link to="/jobs" className="r4m-talents__btn">
            EXPLORE OPPORTUNITIES
          </Link>
        </div>
      </div>
    </section>
  );
}
