import "../../styles/components/MissionVisionDetails.css";

export default function MissionVisionDetails() {
  return (
    <div className="r4m-mv-showcase">

      {/* =========================================================
         1. OUR MISSION SECTION (Asymmetric Photo Gallery Design)
      ========================================================= */}
      <section className="r4m-mission-gallery">
        <div className="r4m-mission-gallery__container">

          {/* Header Block */}
          <div className="r4m-mission-gallery__header">
            <span className="r4m-mission-gallery__tag">OUR MISSION</span>
            <div className="r4m-mission-gallery__headline-wrap">
              <i className="bx bxs-quote-alt-left r4m-mission-gallery__quote"></i>
              <h2 className="r4m-mission-gallery__title">
                <span className="black">Reforming businesses.</span><br />
                <span className="orange">Transforming lives.</span>
              </h2>
            </div>
          </div>

          {/* Asymmetric Photo Gallery Grid */}
          <div className="r4m-mission-gallery__grid">
            <div className="r4m-mission-gallery__item r4m-mission-gallery__item--1">
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790842422/R4MWebDesign-image54-H1PFK.png"
                alt="Colleagues looking at tablet"
              />
            </div>
            <div className="r4m-mission-gallery__item r4m-mission-gallery__item--2">
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790847798/R4MWebDesign-image62-MI0Qn.png"
                alt="Business meeting"
              />
            </div>
            <div className="r4m-mission-gallery__item r4m-mission-gallery__item--3">
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790842524/R4MWebDesign-image55-msjTs.png"
                alt="Team discussion"
              />
            </div>
            <div className="r4m-mission-gallery__item r4m-mission-gallery__item--4">
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790842544/R4MWebDesign-image56-QORHm.png"
                alt="Collaborating around laptop"
              />
            </div>
            <div className="r4m-mission-gallery__item r4m-mission-gallery__item--5">
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790847603/R4MWebDesign-image61-hJkT3.png"
                alt="Corporate presentation"
              />
            </div>
            <div className="r4m-mission-gallery__item r4m-mission-gallery__item--6">
              <img
                src="https://res.cloudinary.com/uoueul6i/image/upload/v1790847882/R4MWebDesign-image63-9mgDU.png"
                alt="Happy office team"
              />
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
         2. OUR VISION SECTION (Dark Grey Banner with Matching Style)
      ========================================================= */}
      <section className="r4m-vision-clean-banner" id="vision">
        <div className="r4m-vision-clean-banner__container">
          <span className="r4m-vision-clean-banner__tag">OUR VISION</span>

          <div className="r4m-vision-clean-banner__headline-wrap">
            <i className="bx bxs-quote-alt-left r4m-vision-clean-banner__quote"></i>
            <h2 className="r4m-vision-clean-banner__statement">
              To become a multi-billion-peso talent solutions leader, transforming the lives of more than <span className="orange-text">20,000 Filipinos</span> through decent and meaningful work.
            </h2>
          </div>

          <div className="r4m-vision-clean-banner__cta">
            <a href="#about" className="r4m-vision-clean-banner__btn">
              LEARN ABOUT OUR STORY
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
