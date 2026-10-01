import "../../styles/components/CoreValuesDetails.css";

const REFORM_VALUES = [
  {
    letter: "R",
    title: "RELIABILITY",
    desc: "We do what we say we will do. We earn trust by being dependable, accountable, and consistent in every commitment we make."
  },
  {
    letter: "E",
    title: "EXCELLENCE",
    desc: "We never settle for average. We continuously improve our people, processes, and performance to deliver exceptional results."
  },
  {
    letter: "F",
    title: "FOCUS",
    desc: "We prioritize what matters most. We stay aligned with our goals, make disciplined decisions, and execute with purpose."
  },
  {
    letter: "O",
    title: "OWNERSHIP",
    desc: "We take responsibility for outcomes. We act like owners, solve problems proactively, and are accountable for our actions and results."
  },
  {
    letter: "R",
    title: "RESPECT",
    desc: "We value people and relationships. We treat everyone with professionalism, fairness, empathy, and integrity."
  },
  {
    letter: "M",
    title: "MEANINGFUL PARTNERSHIPS",
    desc: "We grow together. We build long-term relationships with our clients, employees, and partners based on trust, collaboration, and shared success."
  }
];

export default function CoreValuesDetails() {
  return (
    <section className="r4m-reform-values">
      <div className="r4m-reform-values__container">

        {/* Left Column: Image */}
        <div className="r4m-reform-values__media">
          <img
            src="https://res.cloudinary.com/uoueul6i/image/upload/v1790882669/R4MWebDesign-image66-Y8pO8.png"
            alt="R4M Core Values Team Collaboration"
            className="r4m-reform-values__img"
          />
        </div>

        {/* Right Column: R-E-F-O-R-M Acronym Values */}
        <div className="r4m-reform-values__content">

          {/* Category Tag Header */}
          <div className="r4m-reform-values__header">
            <span className="r4m-reform-values__tag">OUR CORE VALUES</span>
          </div>

          {/* R-E-F-O-R-M Values List */}
          <div className="r4m-reform-values__list">
            {REFORM_VALUES.map((val, idx) => (
              <div key={idx} className="r4m-reform-item">
                <div className="r4m-reform-item__badge">
                  {val.letter}
                </div>
                <div className="r4m-reform-item__body">
                  <h3 className="r4m-reform-item__title">{val.title}</h3>
                  <p className="r4m-reform-item__desc">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
