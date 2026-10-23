import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import JobSingleHero from '../components/Jobs/JobSingleHero';
import JobSingleView from '../components/Jobs/JobSingleView';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';
import '../styles/components/JobsDetails.css';

const SAMPLE_JOBS_LOOKUP = {
  "1": {
    id: "1",
    reference: "R4M-LOG-101",
    title: "Warehouse & Fulfillment Operations Supervisor",
    category: "Logistics & Supply Chain",
    department: "Logistics & Supply Chain",
    location: "Quezon City, Metro Manila",
    type: "Full-Time",
    specialism: "Warehouse & Distribution",
    focus: "3PL Fulfillment & Fleet Operations",
    industry: "Logistics & Supply Chain",
    salary: "₱35,000 - ₱45,000 / month",
    workplaceType: "On-Site",
    experienceLevel: "Mid / Senior Level",
    posted: "Posted Recently",
    consultant: "Admin R4M",
    contactEmail: "admin@r4m.com",
    aboutRole: "Oversee daily warehouse inventory, forklift operators, material handlers, and last-mile dispatch operations.",
    responsibilities: [
      "Supervise daily warehouse shifts, inventory audits, and loading dock activities.",
      "Ensure full adherence to DOLE occupational safety standards and PPE requirements.",
      "Coordinate with freight dispatchers and route planners for on-time distribution."
    ],
    whoYouAre: [
      "Minimum 3 years experience in 3PL, logistics, or distribution warehouse operations.",
      "Demonstrated leadership managing 20+ frontline staff and forklift operators.",
      "Familiarity with WMS barcode scanning systems and inventory management."
    ],
    benefits: [
      "HMO Coverage for employee and dependents.",
      "Performance bonus and night differential allowances.",
      "Career progression to Operations Manager."
    ]
  },
  "2": {
    id: "2",
    reference: "R4M-TECH-202",
    title: "Senior Full-Stack Web Engineer",
    category: "Technology & Digital",
    department: "Technology & Digital",
    location: "Makati City / Hybrid",
    type: "Full-Time",
    specialism: "Software Engineering",
    focus: "React, Node.js & Cloud Infrastructure",
    industry: "Technology & Digital",
    salary: "₱90,000 - ₱120,000 / month",
    workplaceType: "Hybrid",
    experienceLevel: "Senior Level",
    posted: "Posted Recently",
    consultant: "Admin R4M",
    contactEmail: "admin@r4m.com",
    aboutRole: "Develop responsive frontend interfaces and high-availability backend APIs for enterprise tech clients.",
    responsibilities: [
      "Architect RESTful microservices and frontend React applications.",
      "Maintain database optimization and automated testing pipelines.",
      "Mentor junior engineering staff and participate in code reviews."
    ],
    whoYouAre: [
      "4+ years experience in Full-Stack web development (React, Node, Express, MongoDB).",
      "Strong experience with Git workflows, Docker, and AWS cloud deployment.",
      "Excellent problem-solving mindset and technical communication skills."
    ],
    benefits: [
      "Flexible hybrid working arrangements.",
      "Comprehensive medical HMO + dental coverage.",
      "Annual continuous learning & technical certification allowance."
    ]
  },
  "3": {
    id: "3",
    reference: "R4M-MFG-303",
    title: "QA / QC Industrial Plant Inspector",
    category: "Manufacturing",
    department: "Manufacturing",
    location: "Calamba, Laguna",
    type: "Contract",
    specialism: "Quality Control",
    focus: "Plant Productivity & QA Compliance",
    industry: "Industrial Manufacturing",
    salary: "₱28,000 - ₱35,000 / month",
    workplaceType: "On-Site",
    experienceLevel: "Mid Level",
    posted: "Posted Recently",
    consultant: "Admin R4M",
    contactEmail: "admin@r4m.com",
    aboutRole: "Monitor production lines, perform calibration checks, and maintain ISO compliance records.",
    responsibilities: [
      "Conduct incoming raw material inspections and finished product audits.",
      "Enforce factory safety protocols and ISO 9001 standards.",
      "Document defect logs and report process bottlenecks to plant manager."
    ],
    whoYouAre: [
      "Degree or diploma in Industrial Engineering or Technical Quality Control.",
      "At least 2 years in manufacturing QA/QC environments.",
      "High attention to detail and precision testing skills."
    ],
    benefits: [
      "Shuttle service to key Laguna pick-up points.",
      "Complete PPE provisions and medical insurance.",
      "Overtime pay and meal allowances."
    ]
  },
  "4": {
    id: "4",
    reference: "R4M-RET-404",
    title: "Retail Store Operations Lead",
    category: "Retail & FMCG",
    department: "Retail & FMCG",
    location: "Taguig City, Metro Manila",
    type: "Full-Time",
    specialism: "Store Operations",
    focus: "Retail & FMCG Customer Service",
    industry: "Retail & FMCG",
    salary: "₱30,000 - ₱38,000 / month",
    workplaceType: "On-Site",
    experienceLevel: "Mid Level",
    posted: "Posted Recently",
    consultant: "Admin R4M",
    contactEmail: "admin@r4m.com",
    aboutRole: "Drive retail store performance, planogram visual merchandising, and staff shift scheduling.",
    responsibilities: [
      "Lead daily store opening/closing procedures and POS cashier reconciliations.",
      "Coordinate with FMCG merchandisers for stock replenishment.",
      "Train retail associates in customer care and product promotion."
    ],
    whoYouAre: [
      "2+ years experience in retail store supervisory roles.",
      "Strong background in POS systems and stockroom inventory.",
      "Customer-centric attitude and high energy level."
    ],
    benefits: [
      "Store performance incentives and commissions.",
      "HMO health benefits.",
      "Employee store discount."
    ]
  }
};

export default function JobSinglePage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSingleJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setJob(data);
          } else {
            setJob(SAMPLE_JOBS_LOOKUP[id] || null);
          }
        } else {
          console.warn(`Job ${id} not found in database (HTTP ${res.status}), checking fallback`);
          setJob(SAMPLE_JOBS_LOOKUP[id] || null);
        }
      } catch (err) {
        console.error('Failed to fetch job details from database:', err);
        setJob(SAMPLE_JOBS_LOOKUP[id] || null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleJob();
    } else {
      setJob(null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <main>
          <JobSingleHero jobTitle="Loading Position Details..." />
          <section className="r4m-job-single" style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="r4m-jobs-empty">
              <i className="bi bi-arrow-repeat spin" style={{ fontSize: '2.8rem', color: '#f37021' }}></i>
              <h3>Loading Job Posting from Database...</h3>
              <p>Fetching real-time requirements and role specifications.</p>
            </div>
          </section>
          <AboutCTA />
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <main>
          <JobSingleHero jobTitle="Job Not Found" />
          <section className="r4m-job-single" style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 20px' }}>
            <div className="r4m-jobs-empty">
              <i className="bi bi-briefcase" style={{ fontSize: '3rem', color: '#888' }}></i>
              <h3>Job Listing Not Found</h3>
              <p>This job posting may have been filled, archived, or is no longer active.</p>
              <Link to="/jobs" className="r4m-job-card__btn" style={{ display: 'inline-flex', marginTop: '20px' }}>
                Browse All Open Jobs <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </section>
          <AboutCTA />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <JobSingleHero jobTitle={job.title} />
        <JobSingleView job={job} />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}

