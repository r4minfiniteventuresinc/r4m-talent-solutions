import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/WorkforceCTA.css";

const WORKFORCE_FEATURES = [
  {
    id: "scale",
    icon: "bi-graph-up-arrow",
    title: "Scale your workforce",
    description: "Adapt your workforce to changing operational requirements.",
  },
  {
    id: "strengthen",
    icon: "bi-people-fill",
    title: "Strengthen recruitment",
    description: "Extend your recruitment capacity when your team needs additional support.",
  },
  {
    id: "build",
    icon: "bi-rocket-takeoff-fill",
    title: "Build for growth",
    description: "Connect the capabilities you need with the opportunities available.",
  },
];

export default function WorkforceCTA() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="r4m-workforce" id="workforce">
      <div className="r4m-workforce__container">
        {/* Main Title */}
        <h2 className="r4m-workforce__title">
          Need the Right People<br />
          to Move Your <span className="orange">Business</span><br />
          <span className="orange">Forward?</span>
        </h2>

        <div className="r4m-workforce__grid">
          {/* Left Column: Video Player + Consultation CTA */}
          <div className="r4m-workforce__media">
            <div className="r4m-workforce__video-wrapper">
              {isPlaying ? (
                <iframe
                  src="https://drive.google.com/file/d/1Nai-jbdWZ--hHWHkf2Z02dakYhSJ6fxf/preview"
                  className="r4m-workforce__iframe"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="R4M Workforce Video"
                ></iframe>
              ) : (
                <div
                  className="r4m-workforce__poster-container"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src="https://res.cloudinary.com/uoueul6i/image/upload/v1790835103/R4MWebDesign-image46-Sdk6K.png"
                    alt="R4M Workforce Video Poster"
                    className="r4m-workforce__poster-img"
                  />
                  <div className="r4m-workforce__video-overlay"></div>
                  <button className="r4m-workforce__play-btn" aria-label="Play Video">
                    <i className="bi bi-play-fill"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Request Consultation Button */}
            <div className="r4m-workforce__cta">
              <Link to="/contact" className="r4m-workforce__btn">
                REQUEST A CONSULTATION
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards */}
          <div className="r4m-workforce__cards">
            {WORKFORCE_FEATURES.map((item) => (
              <div className="r4m-workforce-card" key={item.id}>
                <div className="r4m-workforce-card__icon-wrapper">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <div className="r4m-workforce-card__text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
