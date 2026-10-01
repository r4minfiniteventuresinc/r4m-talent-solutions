import { Link } from "react-router-dom";
import "../../styles/components/FindJobBanner.css";

export default function FindJobBanner() {
  return (
    <section className="r4m-job-banner">
      <div className="r4m-job-banner__container">
        <span className="r4m-job-banner__tag">WE SEARCH FOR YOU</span>
        <h2 className="r4m-job-banner__title">Let’s find you a job.</h2>
        <p className="r4m-job-banner__desc">
          Tired of searching for jobs all on your own? Let us do the heavy lifting and find an opportunity that’s right for you. Share your resume with us and we’ll bring jobs that fit your experience and aspiration to you.
        </p>
        <div className="r4m-job-banner__cta">
          <Link to="/jobs" className="r4m-job-banner__btn">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
