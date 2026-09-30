import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import '../../styles/components/JobsDetails.css';

const FALLBACK_JOBS = [
  {
    id: "1",
    title: "Warehouse & Fulfillment Operations Supervisor",
    category: "Logistics & Supply Chain",
    location: "Quezon City, Metro Manila",
    type: "Full-Time",
    posted: "Posted Recently",
    desc: "Oversee daily warehouse inventory, forklift operators, material handlers, and last-mile dispatch operations."
  },
  {
    id: "2",
    title: "Senior Full-Stack Web Engineer",
    category: "Technology & Digital",
    location: "Makati City / Hybrid",
    type: "Full-Time",
    posted: "Posted Recently",
    desc: "Develop responsive frontend interfaces and high-availability backend APIs for enterprise tech clients."
  },
  {
    id: "3",
    title: "QA / QC Industrial Plant Inspector",
    category: "Manufacturing",
    location: "Calamba, Laguna",
    type: "Contract",
    posted: "Posted Recently",
    desc: "Execute ISO quality assurance audits, assembly testing, and defect inspection across electronics lines."
  },
  {
    id: "4",
    title: "Retail Store Operations Lead",
    category: "Retail & FMCG",
    location: "Taguig City, Metro Manila",
    type: "Full-Time",
    posted: "Posted Recently",
    desc: "Manage store merchandising, cashier teams, stock inventory, and high-volume customer service."
  }
];

export default function JobsDetails() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', resume: '', message: '' });

  const categories = ['All', 'Logistics', 'Technology', 'Retail', 'Manufacturing', 'Finance'];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setJobs(data);
          } else {
            setJobs(FALLBACK_JOBS);
          }
        } else {
          setJobs(FALLBACK_JOBS);
        }
      } catch (err) {
        setJobs(FALLBACK_JOBS);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const jobCat = job.category || job.department || '';
    const matchesCategory = selectedCategory === 'All' || 
                            jobCat.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                          job.location.toLowerCase().includes(search.toLowerCase()) ||
                          (job.desc && job.desc.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedJob(null);
      setApplicant({ name: '', email: '', phone: '', resume: '', message: '' });
    }, 3500);
  };

  return (
    <section className="r4m-jobs-details" id="jobs">
      <div className="r4m-jobs-details__container">
        
        {/* Top Header Block */}
        <div className="r4m-jobs-details__header">
          <span className="r4m-jobs-details__tag">CAREER OPPORTUNITIES</span>
          <h2 className="r4m-jobs-details__title">
            Active Job <span className="orange-text">Listings</span>
          </h2>
          <p className="r4m-jobs-details__subtitle">
            Explore verified open positions below. Click "View Details & Apply" to review requirements and submit your application directly to R4M Talent Solutions.
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="r4m-jobs-controls">
          <div className="r4m-jobs-search-box">
            <i className="bi bi-search r4m-search-icon"></i>
            <input 
              type="text" 
              placeholder="Search jobs by title, department, or location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="r4m-jobs-search-input"
            />
          </div>

          <div className="r4m-jobs-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`r4m-jobs-cat-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="r4m-jobs-grid">
          {loading ? (
            <div className="r4m-jobs-empty">
              <i className="bi bi-arrow-repeat spin"></i>
              <h3>Loading Database Job Listings...</h3>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="r4m-jobs-empty">
              <i className="bi bi-briefcase"></i>
              <h3>No jobs found matching your search criteria</h3>
              <p>Try adjusting your search keywords or category filters.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id || job._id} className="r4m-job-card">
                <div className="r4m-job-card__header">
                  <span className="r4m-job-card__badge">{job.type}</span>
                  <span className="r4m-job-card__posted">{job.posted || 'Posted Recently'}</span>
                </div>

                <h3 className="r4m-job-card__title">{job.title}</h3>
                
                <div className="r4m-job-card__meta">
                  <span><i className="bi bi-geo-alt"></i> {job.location}</span>
                  <span><i className="bi bi-folder2-open"></i> {job.department || job.category}</span>
                </div>

                <p className="r4m-job-card__desc">{job.desc || job.aboutRole}</p>

                <div className="r4m-job-card__footer">
                  <Link 
                    to={`/jobs/${job.id || job._id}`}
                    className="r4m-job-card__btn"
                  >
                    View Details & Apply <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Application Form Modal */}
      {selectedJob && (
        <div className="r4m-job-modal" onClick={() => setSelectedJob(null)}>
          <div className="r4m-job-modal__content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="r4m-job-modal__close" 
              onClick={() => setSelectedJob(null)}
              aria-label="Close application form"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {appliedSuccess ? (
              <div className="r4m-job-modal__success">
                <i className="bi bi-check-circle-fill"></i>
                <h3>Application Form Submitted!</h3>
                <p>Thank you for submitting your application for <strong>{selectedJob.title}</strong>. Our team will review your submission shortly.</p>
              </div>
            ) : (
              <>
                <div className="r4m-job-modal__header">
                  <span className="r4m-job-modal__tag">CANDIDATE APPLICATION FORM</span>
                  <h2>Apply for {selectedJob.title}</h2>
                  <p><i className="bi bi-geo-alt"></i> {selectedJob.location} • {selectedJob.type}</p>
                </div>

                <form className="r4m-job-modal__form" onSubmit={handleApply}>
                  <div className="r4m-form-group">
                    <label htmlFor="modal-name">Full Name *</label>
                    <input 
                      id="modal-name"
                      type="text" 
                      required 
                      placeholder="Enter your full name" 
                      value={applicant.name} 
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })} 
                    />
                  </div>

                  <div className="r4m-form-row">
                    <div className="r4m-form-group">
                      <label htmlFor="modal-email">Email Address *</label>
                      <input 
                        id="modal-email"
                        type="email" 
                        required 
                        placeholder="name@example.com" 
                        value={applicant.email} 
                        onChange={(e) => setApplicant({ ...applicant, email: e.target.value })} 
                      />
                    </div>

                    <div className="r4m-form-group">
                      <label htmlFor="modal-phone">Phone Number *</label>
                      <input 
                        id="modal-phone"
                        type="tel" 
                        required 
                        placeholder="+63 900 000 0000" 
                        value={applicant.phone} 
                        onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="r4m-form-group">
                    <label htmlFor="modal-resume">Resume / Portfolio URL *</label>
                    <input 
                      id="modal-resume"
                      type="text" 
                      required
                      placeholder="Paste your Google Drive, Dropbox, PDF, or LinkedIn URL" 
                      value={applicant.resume} 
                      onChange={(e) => setApplicant({ ...applicant, resume: e.target.value })} 
                    />
                  </div>

                  <div className="r4m-form-group">
                    <label htmlFor="modal-message">Cover Note / Additional Comments</label>
                    <textarea 
                      id="modal-message"
                      rows="3"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..." 
                      value={applicant.message} 
                      onChange={(e) => setApplicant({ ...applicant, message: e.target.value })} 
                    ></textarea>
                  </div>

                  <button type="submit" className="r4m-job-modal__submit">
                    Submit Application Form <i className="bi bi-send-fill"></i>
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
