import "../../styles/components/OurStoryDetails.css";

const STORY_PILLARS = [
  {
    icon: "bi-people-fill",
    title: "People First",
    desc: "We believe the right people have the power to create lasting change."
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Growth Mindset",
    desc: "We create opportunities that help people grow, succeed, and build better futures."
  },
  {
    icon: "bi-link-45deg",
    title: "Stronger Together",
    desc: "We build partnerships that help businesses and people move forward together."
  }
];

export default function OurStoryDetails() {
  return (
    <section className="r4m-story-details">
      <div className="r4m-story-details__container">

        {/* Left Column: Our Journey Headline & Copy */}
        <div className="r4m-story-details__left">
          <span className="r4m-story-details__tag">OUR STORY</span>

          <h2 className="r4m-story-details__title">
            <span className="black-text">This is </span>
            <span className="orange-text">R4M</span>
          </h2>

          <div className="r4m-story-details__lead">
            <p>The <span className="orange-text">right people</span> can reform a business.</p>
            <p>The <span className="orange-text">right opportunity</span> can transform a life.</p>
          </div>

          <div className="r4m-story-details__body">
            <p>At R4M Talent Solutions, we bring the two together.</p>
            <p>We partner with businesses to understand the people they need—not simply to fill roles, but to build stronger teams, improve performance, and support sustainable growth.</p>
            <p>For talent, we create opportunities to grow, succeed, and build better futures.</p>
            <p className="r4m-story-details__highlight">
              Because when the right people and the right businesses come together, everyone moves forward.
            </p>
          </div>
        </div>

        {/* Right Column: 3 Value Pillars Cards */}
        <div className="r4m-story-details__right">
          {STORY_PILLARS.map((pillar, idx) => (
            <div key={idx} className="r4m-story-pillar">
              <div className="r4m-story-pillar__icon-wrap">
                <i className={`bi ${pillar.icon}`}></i>
              </div>
              <div className="r4m-story-pillar__content">
                <h3 className="r4m-story-pillar__title">{pillar.title}</h3>
                <p className="r4m-story-pillar__desc">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
