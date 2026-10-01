import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import r4mLogo from '../assets/r4m-logo.png';

const ABOUT_ITEMS = [
  {
    title: 'Our Story',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/our-story',
  },
  {
    title: 'Our Mission and Vision',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/mission-vision',
  },
  {
    title: 'Our Target Market',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/target-market',
  },
  {
    title: 'Our Core Values',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/core-values',
  },
];

const SERVICES_ITEMS = [
  {
    title: 'Manpower Outsourcing',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/manpower-outsourcing',
  },
  {
    title: 'Recruitment Process Outsourcing',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/recruitment-process-outsourcing',
  },
  {
    title: 'Employer of Record',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/employer-of-record',
  },
  {
    title: 'Find the Right Solutions',
    desc: 'We connect businesses with the right talent through workforce solutions tailored to their needs.',
    path: '/compare-solutions',
  },
];

const INDUSTRIES_ITEMS = [
  {
    title: 'Logistics & Supply Chain',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/logistics-supply-chain',
  },
  {
    title: 'Manufacturing',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/manufacturing',
  },
  {
    title: 'Retail & FMCG',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/retail-fmcg',
  },
  {
    title: 'Hospitality, Food & Beverage',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/hospitality-food-beverage',
  },
  {
    title: 'Construction & Engineering',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/construction-engineering',
  },
  {
    title: 'E-Commerce',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/e-commerce',
  },
  {
    title: 'Financial Services & FinTech',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/financial-services-fintech',
  },
  {
    title: 'Technology & Digital',
    desc: 'We connect businesses with the right talent through workforce solutions',
    path: '/industries/technology-digital',
  },
];

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about', hasDropdown: true },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Industries', path: '/#industries', hasDropdown: true },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Contact Us', path: '/contact' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (label) => {
    if (label === 'About Us' || label === 'Services' || label === 'Industries') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleMegaMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleNavClick = (e, link) => {
    if (link.label === 'About Us' || link.label === 'Services' || link.label === 'Industries') {
      // Allow single click to navigate directly or open dropdown
      if (link.label === 'About Us') {
        navigate('/about');
        setActiveDropdown(null);
        setMobileOpen(false);
        return;
      }
      if (link.label === 'Services') {
        navigate('/services');
        setActiveDropdown(null);
        setMobileOpen(false);
        return;
      }
    }

    if (link.path.startsWith('/#')) {
      const targetId = link.path.replace('/#', '');
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link.path);
    }
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const isDropdownOpen = activeDropdown === 'About Us' || activeDropdown === 'Services' || activeDropdown === 'Industries';

  const getDropdownItems = () => {
    if (activeDropdown === 'About Us') return ABOUT_ITEMS;
    if (activeDropdown === 'Services') return SERVICES_ITEMS;
    if (activeDropdown === 'Industries') return INDUSTRIES_ITEMS;
    return [];
  };

  return (
    <>
      {/* Background Overlay with Backdrop Blur for Content Below */}
      {isDropdownOpen && (
        <div
          className="r4m-mega-overlay"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Mega Dropdown Container spanning to the TOP of screen */}
      {isDropdownOpen && (
        <div
          className="r4m-mega-menu"
          onMouseEnter={handleMegaMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="r4m-mega-menu__container">

            {/* Left Featured Card for About Us */}
            {activeDropdown === 'About Us' && (
              <div className="r4m-mega__featured">
                <div className="r4m-mega__img-wrapper">
                  <img
                    src="https://res.cloudinary.com/uoueul6i/image/upload/v1790824406/R4MWebDesign-image32-kWG3D.png"
                    alt="About R4M"
                    className="r4m-mega__img"
                  />
                </div>
                <span className="r4m-mega__category">ABOUT US</span>
                <p className="r4m-mega__desc">
                  We connect businesses with the right talent through workforce solutions tailored to their needs.
                </p>
                <Link
                  to="/about"
                  className="r4m-mega__btn"
                  onClick={() => setActiveDropdown(null)}
                >
                  Learn More
                </Link>
              </div>
            )}

            {/* Left Featured Card for Services */}
            {activeDropdown === 'Services' && (
              <div className="r4m-mega__featured">
                <div className="r4m-mega__img-wrapper">
                  <img
                    src="https://res.cloudinary.com/uoueul6i/image/upload/v1790824415/R4MWebDesign-image33-VRuXk.png"
                    alt="R4M Services"
                    className="r4m-mega__img"
                  />
                </div>
                <span className="r4m-mega__category">SERVICES</span>
                <p className="r4m-mega__desc">
                  We connect businesses with the right talent through workforce solutions tailored to their needs.
                </p>
                <Link
                  to="/services"
                  className="r4m-mega__btn"
                  onClick={() => {
                    setActiveDropdown(null);
                    setMobileOpen(false);
                  }}
                >
                  Explore our services
                </Link>
              </div>
            )}

            {/* Left Featured Card for Industries */}
            {activeDropdown === 'Industries' && (
              <div className="r4m-mega__featured">
                <div className="r4m-mega__img-wrapper">
                  <img
                    src="https://res.cloudinary.com/uoueul6i/image/upload/v1790824424/R4MWebDesign-image34-5wMPk.png"
                    alt="R4M Industries"
                    className="r4m-mega__img"
                  />
                </div>
                <span className="r4m-mega__category">INDUSTRIES</span>
                <p className="r4m-mega__desc">
                  We connect businesses with the right talent through workforce solutions tailored to their needs.
                </p>
                <a
                  href="/#industries"
                  className="r4m-mega__btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(null);
                    navigate('/#industries');
                    const el = document.getElementById('industries');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Industries
                </a>
              </div>
            )}

            {/* Vertical Divider Line */}
            <div className="r4m-mega__divider"></div>

            {/* Right Grid */}
            <div className="r4m-mega__grid">
              {getDropdownItems().map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  className="r4m-mega__item"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(null);
                    setMobileOpen(false);
                    if (item.path === '/our-story') {
                      navigate('/our-story');
                    } else if (item.path === '/mission-vision') {
                      navigate('/mission-vision');
                    } else if (item.path === '/core-values') {
                      navigate('/core-values');
                    } else if (item.path === '/target-market') {
                      navigate('/target-market');
                    } else if (item.path.startsWith('/industries')) {
                      navigate(item.path);
                    } else if (item.path === '/manpower-outsourcing') {
                      navigate('/manpower-outsourcing');
                    } else if (item.path === '/recruitment-process-outsourcing') {
                      navigate('/recruitment-process-outsourcing');
                    } else if (item.path === '/employer-of-record') {
                      navigate('/employer-of-record');
                    } else if (item.path === '/compare-solutions') {
                      navigate('/compare-solutions');
                    } else if (item.path === '/specialized-technical-roles') {
                      navigate('/employer-of-record');
                    } else if (item.path === '/services' || item.path.startsWith('/services')) {
                      navigate('/services');
                    } else if (item.path.startsWith('/about')) {
                      navigate('/about');
                    } else {
                      navigate('/');
                    }
                  }}
                >
                  <h4 className="r4m-mega__item-title">{item.title}</h4>
                  <p className="r4m-mega__item-desc">{item.desc}</p>
                </a>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Main Floating Navbar */}
      <header className={`r4m-nav ${isDropdownOpen ? 'is-dropdown-open' : ''}`}>
        <Link to="/" className="r4m-logo">
          <img src={r4mLogo} alt="R4M Talent Solutions Logo" className="r4m-logo__img" />
        </Link>

        <nav className={`r4m-menu ${mobileOpen ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="r4m-menu__item-wrap"
              onMouseEnter={() => handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={link.path}
                className={`r4m-menu__link ${activeDropdown === link.label ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
                {link.hasDropdown && <i className="bi bi-chevron-down r4m-chevron"></i>}
              </a>
            </div>
          ))}
        </nav>

        <button
          className="r4m-nav-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
      </header>
    </>
  );
}

export default Navbar;