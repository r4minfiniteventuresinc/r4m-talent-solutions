import "../../styles/components/AboutUs.css";

export default function AboutUs() {
    return (
        <section className="r4m-about" id="about">
            <div className="r4m-about__container">
                {/* Left: Overlapping image cards with floating speech badges */}
                <div className="r4m-about__media">
                    <div className="r4m-about__image-group">
                        {/* Top / Back Image Card */}
                        <div className="r4m-about__card r4m-about__card--top">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                                alt="Right People - R4M Talent Solutions"
                                className="r4m-about__img"
                            />
                        </div>

                        {/* Bottom / Front Image Card */}
                        <div className="r4m-about__card r4m-about__card--bottom">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                                alt="Right Opportunity - R4M Talent Solutions"
                                className="r4m-about__img"
                            />
                        </div>

                        {/* Floating Speech Badges (On Top of Both Images) */}
                        <div className="r4m-about__badge r4m-about__badge--orange">
                            <span>Right People</span>
                            <div className="r4m-about__badge-pointer"></div>
                        </div>

                        <div className="r4m-about__badge r4m-about__badge--dark">
                            <span>Right Opportunity</span>
                            <div className="r4m-about__badge-pointer"></div>
                        </div>
                    </div>
                </div>

                {/* Right: Content Copy & CTA */}
                <div className="r4m-about__content">
                    <span className="r4m-about__label">ABOUT US</span>
                    <h2 className="r4m-about__title">
                        This is <span className="orange">R4M</span>
                    </h2>

                    <p className="r4m-about__subtitle">
                        At R4M Talent Solutions, we bring the two together.
                    </p>

                    <div className="r4m-about__body">
                        <p>
                            We partner with businesses to understand the people they need—not simply to fill roles, but to build stronger teams, improve performance, and support sustainable growth.
                        </p>
                        <p>
                            For talent, we create opportunities to grow, succeed, and build better futures.
                        </p>
                        <p>
                            Because when the right people and the right businesses come together, everyone moves forward.
                        </p>
                    </div>

                    <div className="r4m-about__cta">
                        <a href="#learn-more" className="r4m-about__btn">
                            <span>Learn More</span>
                        </a>
                        <a href="#learn-more" className="r4m-about__btn-icon" aria-label="Learn More Arrow">
                            <svg className="r4m-about__arrow-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 25H34M34 25L24 15M34 25L24 35" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
