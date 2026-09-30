import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobSingleHero from '../components/Jobs/JobSingleHero';
import JobSingleView from '../components/Jobs/JobSingleView';
import AboutCTA from '../components/About/AboutCTA';
import Footer from '../components/Footer';

const SAMPLE_JOBS_LOOKUP = {
  "1": {
    id: "1",
    title: "Warehouse & Fulfillment Operations Supervisor",
    category: "Logistics & Supply Chain",
    location: "Quezon City, Metro Manila",
    type: "Full-Time",
    specialism: "Warehouse & Distribution",
    focus: "3PL Fulfillment & Fleet Operations",
    industry: "Logistics & Supply Chain",
    salary: "₱35,000 - ₱45,000 / month",
    workplaceType: "On-Site",
    experienceLevel: "Mid / Senior Level",
    reference: "R4M-LOG-101",
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
  }
};

export default function JobSinglePage() {
  const { id } = useParams();
  const [job, setJob] = useState(SAMPLE_JOBS_LOOKUP[id] || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSingleJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5005/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setJob(data);
          } else {
            setJob(SAMPLE_JOBS_LOOKUP[id] || SAMPLE_JOBS_LOOKUP["1"]);
          }
        } else {
          setJob(SAMPLE_JOBS_LOOKUP[id] || SAMPLE_JOBS_LOOKUP["1"]);
        }
      } catch (err) {
        console.error('Failed to fetch job details from database:', err);
        setJob(SAMPLE_JOBS_LOOKUP[id] || SAMPLE_JOBS_LOOKUP["1"]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleJob();
    } else {
      setJob(SAMPLE_JOBS_LOOKUP["1"]);
      setLoading(false);
    }
  }, [id]);

  return (
    <>
      <main>
        <JobSingleHero jobTitle={job ? job.title : 'Job Details'} />
        <JobSingleView job={job} />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}

