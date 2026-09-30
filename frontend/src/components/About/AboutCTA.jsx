import { Link } from "react-router-dom";
import "../../styles/components/AboutCTA.css";

export default function AboutCTA() {
  return (
    <section className="r4m-about-cta" id="get-started">
      <div className="r4m-about-cta__container">

        {/* Cityscape Dark Banner matching user mockup */}
        <div className="r4m-about-cta__banner">

          {/* Background Image Overlay */}
          <div className="r4m-about-cta__banner-bg"></div>

          {/* Right Diagonal Orange Slash Accent */}
          {/* <div className="r4m-about-cta__banner-slash"></div> */}

          {/* Content Block */}
          <div className="r4m-about-cta__banner-content">
            <span className="r4m-about-cta__eyebrow">OUR APPROACH</span>

            <h2 className="r4m-about-cta__banner-title">
              Let's Move <span className="orange">Forward</span><br />
              Together.
            </h2>

            <p className="r4m-about-cta__banner-desc">
              Whether you're building your team or exploring your next opportunity, R4M is here to connect people and businesses and help create meaningful paths forward
            </p>

            <div className="r4m-about-cta__actions">
              <Link to="/contact" className="r4m-about-cta__btn r4m-about-cta__btn--primary">
                Find the Right People <i className="bi bi-arrow-right"></i>
              </Link>
              <Link to="/contact" className="r4m-about-cta__btn r4m-about-cta__btn--outline">
                Talk to Our Experts
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
