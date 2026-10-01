import "../../styles/components/YourBusinessOurPeople.css";

export default function YourBusinessOurPeople() {
  return (
    <section className="r4m-business-people">
      <div className="r4m-business-people__container">

        {/* Left Column: Text Copy */}
        <div className="r4m-business-people__content">
          <h2 className="r4m-business-people__title">
            <span className="orange">Your Business.</span><br />
            <span className="black">Our People.</span>
          </h2>

          <h3 className="r4m-business-people__lead">
            Every business is only as strong as the people behind it.
          </h3>

          <p className="r4m-business-people__p">
            Behind every business ready to grow are people with the power to make it happen.
          </p>

          <p className="r4m-business-people__p">
            Whether you're scaling operations, filling critical roles, building new teams, or strengthening your workforce, R4M Talent Solutions connects you with the people you need to perform, grow, and move forward.
          </p>

          <p className="r4m-business-people__p">
            We take the time to understand your business, your challenges, and what needs to change. Then we build talent solutions around those needs—connecting the right capabilities with the right opportunities to create meaningful impact.
          </p>

          <p className="r4m-business-people__p">
            From individual hires to large-scale workforce requirements, we help organizations build stronger teams while creating opportunities for people to grow, succeed, and transform their lives.
          </p>

          <p className="r4m-business-people__highlight">
            Because the right people do more than fill roles. They reform businesses. And the right opportunities transform lives.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="r4m-business-people__media">
          <img
            src="https://res.cloudinary.com/uoueul6i/image/upload/v1790818244/R4MWebDesign-image30-xoXO1.png"
            alt="Business team collaborating at R4M Talent Solutions"
            className="r4m-business-people__img"
          />
        </div>

      </div>
    </section>
  );
}
