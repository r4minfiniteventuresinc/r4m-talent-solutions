import { useState } from 'react';
import { Link } from 'react-router-dom';
import r4mLogo from '../../assets/r4m-logo.png';
import '../../styles/components/JobSingleView.css';

export default function JobSingleView({ job }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    message: ''
  });

  // Default fallback data matching screenshot mockup
  const currentJob = job || {
    id: 1,
    title: "Sample Job 1",
    category: "Recruitment & RPO",
    location: "Makati City, Metro Manila",
    type: "Permanent",
    specialism: "Human Resources",
    focus: "Administrative Services & Recruitment Operations",
    industry: "Recruitment Consultancy",
    salary: "Negotiable / Competitive",
    workplaceType: "Hybrid",
    experienceLevel: "Entry Level / Mid",
    reference: "R4M-8645",
    posted: "24 September 2026",
    consultant: "Name",
    contactEmail: "name@r4mtalentsolutions.com",
    aboutRole: "To offer a candidate concierge service to support the Recruitment Partners in the end-to-end permanent recruitment process.",
    responsibilities: [
      "Working with the Recruitment Partner to ensure the job details in the client's system are correct and completed.",
      "Ensuring all the necessary approvals for the roles have been gained.",
      "Releasing the roles through the system to the relevant channels and specialist sourcing teams as advised by the Recruitment Partner.",
      "Managing candidate dispositions in the Client's recruitment system.",
      "Updating the system with candidate feedback as advised by the Recruitment Partner following review of the shortlist.",
      "Interview scheduling and room bookings within SLA timeframes. Ensuring the hiring manager has a copy of the CV, calendar invite, and room booked for any interviews.",
      "Ensuring all interview notes from the HR interview are stored appropriately and recording all feedback in the Client's recruitment system.",
      "Completing offer letter and any system approvals required in conjunction with the Recruitment Coordinator.",
      "Acting as a key point of contact to liaise with the key delivery teams and the Onboarding Team, ensuring seamless hand-offs and focusing on candidate experience.",
      "Ensuring all candidate contact reflects the Client's brand and values.",
      "Maintaining all central inboxes and helplines as required and that all queries are responded to within SLA.",
      "Gaining a strong understanding of the RWO Remit within the client and working as an active team player in achieving objectives and exceeding expectations."
    ],
    whoYouAre: [
      "Minimum 1 year of experience in recruitment coordination preferred.",
      "Demonstrated hands-on experience using an Applicant Tracking System (ATS).",
      "Proven experience managing multiple recruitment requests concurrently with defined turnaround times.",
      "Service and delivery focused with very professional attitude essential.",
      "Excellent and professional written and verbal communication skills essential.",
      "Prioritising effectively is an essential skill.",
      "Ability to work to tight deadlines is an essential skill.",
      "Experience of working in a client/customer care environment highly desirable.",
      "Excellent team player. Must also be people orientated.",
      "Organised and methodical with a strong attention to detail.",
      "Highly responsive with excellent ability to absorb information quickly."
    ],
    benefits: [
      "A unique opportunity to drive projects such as Employer Branding, Talent pipelining, and Recruitment Innovation.",
      "A track record of high performance and an ability to deliver excellent results consistently. In return for your hard work, offered a competitive salary and benefits package.",
      "Private medical insurance (HMO coverage).",
      "A fantastic training and development programme.",
      "Volunteer time off and employee wellbeing programmes.",
      "The opportunity to partake / qualify for company incentive weekends.",
      "Plenty of opportunities to progress your career, both locally and internationally."
    ]
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setIsModalOpen(false);
      setApplicant({ name: '', email: '', phone: '', resume: '', message: '' });
    }, 3500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="r4m-job-single">
      <div className="r4m-job-single__container">

        {/* Back Navigation Button */}
        <div className="r4m-job-single__back-nav">
          <Link to="/jobs" className="r4m-job-single__back-btn">
            <i className="bi bi-arrow-left"></i> Back to All Jobs
          </Link>
        </div>

        {/* Main 2-Column Layout */}
        <div className="r4m-job-single__grid">

          {/* Left Column: Detailed Job Description */}
          <div className="r4m-job-single__main">

            {/* About the Role */}
            <div className="r4m-job-sec">
              <h3 className="r4m-job-sec__title">About the Role:</h3>
              <p className="r4m-job-sec__p">{currentJob.aboutRole || currentJob.desc}</p>
            </div>

            {/* Responsibilities */}
            <div className="r4m-job-sec">
              <h3 className="r4m-job-sec__title">Responsibilities</h3>
              <p className="r4m-job-sec__lead">
                Responsibilities for this position include the following key deliverables and operational workflows:
              </p>
              <ul className="r4m-job-list">
                {Array.isArray(currentJob.responsibilities) ? (
                  currentJob.responsibilities.map((item, idx) => (
                    <li key={idx}>
                      <span className="r4m-job-list__bullet">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="r4m-job-list__bullet">•</span>
                    <span>{currentJob.responsibilities || 'Execute daily operational workflows and report progress.'}</span>
                  </li>
                )}
              </ul>
              <p className="r4m-job-sec__note">
                Other duties which are reasonably within the capabilities of a staff member in this position may need to be performed from time to time, in addition to or instead of the above duties.
              </p>
              <p className="r4m-job-sec__note">
                The requirements of this role may change over time and staff are required to comply with all such reasonable changes.
              </p>
            </div>

            {/* Who You Are */}
            <div className="r4m-job-sec">
              <h3 className="r4m-job-sec__title">Who you are:</h3>
              <ul className="r4m-job-list">
                {Array.isArray(currentJob.whoYouAre) && currentJob.whoYouAre.length > 0 ? (
                  currentJob.whoYouAre.map((item, idx) => (
                    <li key={idx}>
                      <span className="r4m-job-list__bullet">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="r4m-job-list__bullet">•</span>
                    <span>{currentJob.whoYouAre || currentJob.requirements || 'Relevant experience and strong communication skills.'}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Benefits */}
            <div className="r4m-job-sec">
              <h3 className="r4m-job-sec__title">Benefits:</h3>
              <ul className="r4m-job-list">
                {Array.isArray(currentJob.benefits) && currentJob.benefits.length > 0 ? (
                  currentJob.benefits.map((item, idx) => (
                    <li key={idx}>
                      <span className="r4m-job-list__bullet">•</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="r4m-job-list__bullet">•</span>
                    <span>{currentJob.benefits || 'Competitive salary package, HMO medical coverage, and career growth.'}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Disability & Inclusion Statement */}
            <div className="r4m-job-disclaimer">
              <p>
                <em>"As a Disability Confident Employer, R4M Talent Solutions is committed to offering a fully inclusive and accessible recruitment process to all candidates. If you require any accommodations or adjustments as a result of a disability, impairment or health condition, please do not hesitate to let us know."</em>
              </p>
            </div>

            {/* Bottom Primary Apply Button */}
            <div className="r4m-job-bottom-action">
              <button
                className="r4m-job-apply-btn r4m-job-apply-btn--primary"
                onClick={() => setIsModalOpen(true)}
              >
                Apply Now
              </button>
            </div>

          </div>

          {/* Right Column: Sidebar Specs & Actions */}
          <aside className="r4m-job-sidebar">
            <div className="r4m-job-sidebar__card">

              <h3 className="r4m-job-sidebar__title">About the job</h3>

              {/* Logo Box */}
              <div className="r4m-job-sidebar__logo-box">
                <img src={r4mLogo} alt="R4M Talent Solutions" className="r4m-job-sidebar__logo" />
              </div>

              {/* Spec List */}
              <div className="r4m-job-specs">
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Contract Type:</span>
                  <span className="r4m-job-spec-val">{currentJob.type}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Specialism:</span>
                  <span className="r4m-job-spec-val">{currentJob.specialism}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Focus:</span>
                  <span className="r4m-job-spec-val">{currentJob.focus}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Industry:</span>
                  <span className="r4m-job-spec-val">{currentJob.industry}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Salary:</span>
                  <span className="r4m-job-spec-val">{currentJob.salary}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Workplace Type:</span>
                  <span className="r4m-job-spec-val">{currentJob.workplaceType}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Experience Level:</span>
                  <span className="r4m-job-spec-val">{currentJob.experienceLevel}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Location:</span>
                  <span className="r4m-job-spec-val">{currentJob.location}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Job Reference:</span>
                  <span className="r4m-job-spec-val">{currentJob.reference}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Date posted:</span>
                  <span className="r4m-job-spec-val">{currentJob.posted}</span>
                </div>
                <div className="r4m-job-spec-row">
                  <span className="r4m-job-spec-lbl">Consultant:</span>
                  <span className="r4m-job-spec-val">{currentJob.consultant}</span>
                </div>
                <div className="r4m-job-spec-row r4m-job-spec-row--email">
                  <i className="bi bi-envelope"></i>
                  <a href={`mailto:${currentJob.contactEmail}`} className="r4m-job-email-link">
                    {currentJob.contactEmail}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="r4m-job-sidebar__actions">
                <button
                  className="r4m-job-apply-btn r4m-job-apply-btn--primary r4m-job-apply-btn--full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Apply
                </button>
                {/* <button
                  className={`r4m-job-save-btn ${isSaved ? 'is-saved' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  Save Job <i className={`bi ${isSaved ? 'bi-star-fill' : 'bi-star'}`}></i>
                </button> */}
              </div>

              {/* Share Section */}
              <div className="r4m-job-share">
                <h4 className="r4m-job-share__title">Share</h4>
                <div className="r4m-job-share__icons">
                  <a href={`mailto:?subject=${encodeURIComponent(currentJob.title)}&body=${encodeURIComponent(window.location.href)}`} className="r4m-share-circle" title="Share via Email">
                    <i className="bi bi-envelope"></i>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(currentJob.title)}`} target="_blank" rel="noreferrer" className="r4m-share-circle" title="Share on Twitter/X">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="r4m-share-circle" title="Share on Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="r4m-share-circle" title="Share on LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <button className="r4m-share-circle" onClick={handleCopyLink} title="Copy Link">
                    <i className={`bi ${copiedLink ? 'bi-check' : 'bi-link-45deg'}`}></i>
                  </button>
                </div>
                {copiedLink && <span className="r4m-copied-toast">Link copied to clipboard!</span>}
              </div>

            </div>
          </aside>

        </div>

      </div>

      {/* Candidate Application Modal */}
      {isModalOpen && (
        <div className="r4m-job-modal" onClick={() => setIsModalOpen(false)}>
          <div className="r4m-job-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="r4m-job-modal__close"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close application form"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {appliedSuccess ? (
              <div className="r4m-job-modal__success">
                <i className="bi bi-check-circle-fill"></i>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying for <strong>{currentJob.title}</strong>. Our recruitment team will review your CV and profile shortly.</p>
              </div>
            ) : (
              <>
                <div className="r4m-job-modal__header">
                  <span className="r4m-job-modal__tag">CANDIDATE APPLICATION FORM</span>
                  <h2>Apply for {currentJob.title}</h2>
                  <p><i className="bi bi-geo-alt"></i> {currentJob.location} • {currentJob.type}</p>
                </div>

                <form className="r4m-job-modal__form" onSubmit={handleApplySubmit}>
                  <div className="r4m-form-group">
                    <label htmlFor="job-single-name">Full Name *</label>
                    <input
                      id="job-single-name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    />
                  </div>

                  <div className="r4m-form-row">
                    <div className="r4m-form-group">
                      <label htmlFor="job-single-email">Email Address *</label>
                      <input
                        id="job-single-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={applicant.email}
                        onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      />
                    </div>

                    <div className="r4m-form-group">
                      <label htmlFor="job-single-phone">Phone Number *</label>
                      <input
                        id="job-single-phone"
                        type="tel"
                        required
                        placeholder="+63 900 000 0000"
                        value={applicant.phone}
                        onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="r4m-form-group">
                    <label htmlFor="job-single-resume">Resume / Portfolio URL *</label>
                    <input
                      id="job-single-resume"
                      type="text"
                      required
                      placeholder="Paste your Google Drive, Dropbox, PDF, or LinkedIn URL"
                      value={applicant.resume}
                      onChange={(e) => setApplicant({ ...applicant, resume: e.target.value })}
                    />
                  </div>

                  <div className="r4m-form-group">
                    <label htmlFor="job-single-message">Cover Note / Additional Comments</label>
                    <textarea
                      id="job-single-message"
                      rows="3"
                      placeholder="Share any relevant background or notes for the hiring team..."
                      value={applicant.message}
                      onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="r4m-job-modal__submit">
                    Submit Application <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
