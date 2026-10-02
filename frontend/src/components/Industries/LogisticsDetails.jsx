import { Link } from 'react-router-dom';
import '../../styles/components/LogisticsDetails.css';

const LOGISTICS_ROLES = [
  {
    category: 'Warehouse & Fulfillment Operations',
    icon: 'bi-box-seam-fill',
    roles: [
      'Certified Forklift & Reach Truck Operators',
      'Inventory Controllers & Audit Specialists',
      'Warehouse Supervisors & Shift Managers',
      'Pickers, Packers & Material Handlers',
      'Quality Control & Receiving Inspectors'
    ]
  },
  {
    category: 'Fleet, Transport & Distribution',
    icon: 'bi-truck-front-fill',
    roles: [
      'Heavy Duty & Long-Haul Truck Drivers',
      'Fleet Logistics & Route Dispatchers',
      'Delivery & Last-Mile Operations Drivers',
      'Transport Operations Coordinators',
      'Fleet Maintenance & Safety Technicians'
    ]
  },
  {
    category: 'Supply Chain & Freight Planning',
    icon: 'bi-diagram-3-fill',
    roles: [
      'Supply Chain Analysts & Planners',
      'Import / Export & Customs Coordinators',
      'Procurement & Materials Specialists',
      'Freight Forwarding Account Managers',
      '3PL / 4PL Logistics Coordinators'
    ]
  }
];

export default function LogisticsDetails() {
  return (
    <section className="r4m-logistics-details">
      <div className="r4m-logistics-details__container">

        {/* Main Content Grid */}
        <div className="r4m-logistics-details__grid">

          {/* Left Column: Overview & Industry Value */}
          <div className="r4m-logistics-details__content">
            <span className="r4m-logistics-details__label">INDUSTRY EXCELLENCE</span>
            <h2 className="r4m-logistics-details__title">Workforce Solutions for Logistics & Supply Chain</h2>

            <p className="r4m-logistics-details__lead">
              In logistics and supply chain management, operational continuity depends on workforce reliability, speed, and safety compliance. R4M Talent Solutions delivers turnkey staffing models designed to keep your warehouses, fleets, and distribution networks operating at peak performance.
            </p>

            <p className="r4m-logistics-details__text">
              Whether you are managing a 3PL distribution center, an e-commerce fulfillment hub, or a nationwide freight forwarding operation, we provide vetted frontline labor, skilled equipment operators, and technical supply chain specialists on demand.
            </p>

            {/* Key Roles We Staff Section */}
            <div className="r4m-logistics-roles-section">
              <h3 className="r4m-logistics-roles-title">Key Talent & Roles We Provide</h3>

              <div className="r4m-logistics-roles-grid">
                {LOGISTICS_ROLES.map((group, idx) => (
                  <div className="r4m-logistics-role-card" key={idx}>
                    <div className="r4m-logistics-role-card__header">
                      <div className="r4m-logistics-role-card__icon">
                        <i className={`bi ${group.icon}`}></i>
                      </div>
                      <h4>{group.category}</h4>
                    </div>
                    <ul className="r4m-logistics-role-card__list">
                      {group.roles.map((role, i) => (
                        <li key={i}>
                          <i className="bi bi-check-circle-fill orange-check"></i>
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Pillars of R4M Logistics Staffing */}
            <div className="r4m-logistics-pillars">
              <h3 className="r4m-logistics-pillars-title">Why Logistics Leaders Partner With R4M</h3>

              <div className="r4m-logistics-pillars-grid">
                <div className="r4m-logistics-pillar">
                  <div className="r4m-logistics-pillar__icon">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <h4>Peak Season Elasticity</h4>
                  <p>Instantly scale headcount during Q4 surges, flash sales, and new distribution center launches without overstaffing liabilities.</p>
                </div>

                <div className="r4m-logistics-pillar">
                  <div className="r4m-logistics-pillar__icon">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h4>Safety & DOLE Compliance</h4>
                  <p>All personnel undergo drug screening, background verification, equipment certification, and safety compliance training.</p>
                </div>

                <div className="r4m-logistics-pillar">
                  <div className="r4m-logistics-pillar__icon">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <h4>On-Site Field Supervision</h4>
                  <p>Dedicated R4M field coordinators manage daily attendance, shift scheduling, performance KPIs, and operational alignment.</p>
                </div>

                <div className="r4m-logistics-pillar">
                  <div className="r4m-logistics-pillar__icon">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <h4>Zero HR & Payroll Burden</h4>
                  <p>We manage payroll processing, statutory contributions, medical clearances, and labor contracts end-to-end.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sidebar CTA Box */}
          <div className="r4m-logistics-details__sidebar">
            <div className="r4m-logistics-box">
              <div className="r4m-logistics-box__img-wrap">
                <img
                  src="https://res.cloudinary.com/uoueul6i/image/upload/v1790831815/R4MWebDesign-image37-cWZfZ.png"
                  alt="Logistics and Supply Chain Workforce"
                  className="r4m-logistics-box__img"
                />
              </div>

              <div className="r4m-logistics-box__body">
                <h3 className="r4m-logistics-box__title">Need Logistics Staffing?</h3>
                <p className="r4m-logistics-box__desc">
                  Connect with R4M industry specialists to deploy certified warehouse, fleet, and supply chain personnel tailored to your operations.
                </p>

                <Link to="/contact" className="r4m-logistics-box__btn">
                  Request Logistics Talent <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
