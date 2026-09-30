import { Link } from 'react-router-dom';
import '../../styles/components/SolutionsComparison.css';

const COMPARISON_ROWS = [
  {
    criterion: 'Primary Focus',
    manpower: 'Volume operational staffing & flex field labor',
    rpo: 'Full-lifecycle recruitment & talent pipeline sourcing',
    eor: 'Legal employment, payroll, tax & benefits compliance'
  },
  {
    criterion: 'Best Suited For',
    manpower: 'Seasonal spikes, logistics, manufacturing & retail ops',
    rpo: 'Rapidly growing companies & high-volume hiring initiatives',
    eor: 'Hiring local or global talent without a legal corporate entity'
  },
  {
    criterion: 'Legal Employer Status',
    manpower: 'Handled by Provider',
    rpo: 'Client Enterprise (or Hybrid)',
    eor: '100% Legal Employer by Provider'
  },
  {
    criterion: 'Payroll & Tax Management',
    manpower: 'Fully Managed by Provider',
    rpo: 'Managed by Client HR',
    eor: 'Fully Managed by Provider'
  },
  {
    criterion: 'Day-to-Day Work Direction',
    manpower: 'Client / Field Supervisors',
    rpo: 'Client Enterprise Managers',
    eor: 'Client Enterprise Managers'
  },
  {
    criterion: 'Speed to Deployment',
    manpower: 'Immediate / On-demand pool',
    rpo: 'Fast (1-3 weeks pipeline)',
    eor: 'Instant / Direct contracting'
  },
  {
    criterion: 'Compliance & Labor Liability',
    manpower: 'Covered by Provider',
    rpo: 'Shared Responsibility',
    eor: 'Covered 100% by Provider'
  },
  {
    criterion: 'Contract Flexibility',
    manpower: 'Short-term, seasonal, or permanent',
    rpo: 'Project-based or standing RPO',
    eor: 'Long-term or project contract'
  }
];

export default function SolutionsComparison() {
  return (
    <section className="r4m-solutions-comp">
      <div className="r4m-solutions-comp__container">
        
        {/* Header Block */}
        <div className="r4m-solutions-comp__header">
          <span className="r4m-solutions-comp__label">SERVICE COMPARISON</span>
          <h2 className="r4m-solutions-comp__title">Side-by-Side Solution Comparison</h2>
          <p className="r4m-solutions-comp__subtitle">
            Evaluate our three core workforce models to determine which structure best aligns with your organizational goals and operational requirements.
          </p>
        </div>

        {/* 3 Featured Service Cards Summary */}
        <div className="r4m-solutions-comp__cards">
          
          {/* Card 1: Manpower */}
          <div className="r4m-comp-card">
            <span className="r4m-comp-card__tag">OPERATIONAL STAFFING</span>
            <h3 className="r4m-comp-card__title">Manpower Outsourcing</h3>
            <p className="r4m-comp-card__desc">
              On-demand operational, frontline, and field personnel managed with full labor compliance.
            </p>
            <Link to="/manpower-outsourcing" className="r4m-comp-card__btn">
              Explore Manpower <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Card 2: RPO */}
          <div className="r4m-comp-card r4m-comp-card--highlight">
            <span className="r4m-comp-card__tag">HIRING INFRASTRUCTURE</span>
            <h3 className="r4m-comp-card__title">Recruitment Process Outsourcing (RPO)</h3>
            <p className="r4m-comp-card__desc">
              End-to-end talent acquisition pipelines integrated directly into your corporate HR structure.
            </p>
            <Link to="/recruitment-process-outsourcing" className="r4m-comp-card__btn r4m-comp-card__btn--primary">
              Explore RPO <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {/* Card 3: EOR */}
          <div className="r4m-comp-card">
            <span className="r4m-comp-card__tag">LEGAL HR & PAYROLL</span>
            <h3 className="r4m-comp-card__title">Employer of Record (EOR)</h3>
            <p className="r4m-comp-card__desc">
              Legal employment, statutory benefits, and local payroll administration with zero entity setup.
            </p>
            <Link to="/employer-of-record" className="r4m-comp-card__btn">
              Explore EOR <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

        </div>

        {/* Comparison Matrix Table */}
        <div className="r4m-solutions-table-wrap">
          <table className="r4m-solutions-table">
            <thead>
              <tr>
                <th className="r4m-th-criterion">Key Criteria</th>
                <th className="r4m-th-service">Manpower Outsourcing</th>
                <th className="r4m-th-service r4m-th-highlight">Recruitment Process Outsourcing (RPO)</th>
                <th className="r4m-th-service">Employer of Record (EOR)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx}>
                  <td className="r4m-td-criterion">{row.criterion}</td>
                  <td className="r4m-td-service">{row.manpower}</td>
                  <td className="r4m-td-service r4m-td-highlight">{row.rpo}</td>
                  <td className="r4m-td-service">{row.eor}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td className="r4m-td-action">
                  <Link to="/manpower-outsourcing" className="r4m-table-btn">
                    Select Manpower
                  </Link>
                </td>
                <td className="r4m-td-action r4m-td-highlight">
                  <Link to="/recruitment-process-outsourcing" className="r4m-table-btn r4m-table-btn--orange">
                    Select RPO
                  </Link>
                </td>
                <td className="r4m-td-action">
                  <Link to="/employer-of-record" className="r4m-table-btn">
                    Select EOR
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Need Help Banner */}
        <div className="r4m-solutions-help-banner">
          <div className="r4m-solutions-help-banner__content">
            <h3>Still Unsure Which Solution Fits Best?</h3>
            <p>Our workforce advisors can help evaluate your hiring volume, timeline, and compliance needs to build a custom hybrid model.</p>
          </div>
          <Link to="/contact" className="r4m-solutions-help-banner__btn">
            Consult Our Advisors <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}
