import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import '../../styles/components/InsightsDetails.css';

const INSIGHTS_DATA = [
  {
    id: 'hiring-workforce-insights',
    category: 'For Businesses',
    title: 'Hiring & Workforce Insights',
    summary: 'Practical perspectives on recruitment, workforce planning, and business growth.',
    date: 'September 24, 2026',
    readTime: '5 min read',
    author: 'R4M Executive Advisory',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    content: [
      'As organizations navigate an increasingly dynamic business landscape, recruitment strategies are undergoing a fundamental transformation. Today, successful workforce planning requires more than filling immediate vacancies—it demands a strategic approach to long-term talent alignment.',
      '1. Data-Driven Workforce Planning: Leading enterprises are turning to predictive analytics to anticipate labor shortages and skill gaps before they affect operational output. By forecasting seasonal demand and project timelines, businesses can maintain optimal staffing levels without incurring unnecessary overhead.',
      '2. The Shift Toward Agile Staffing Models: Modern organizations are blending core full-time teams with flexible, specialized manpower solutions. This hybrid structure gives companies the agility to scale rapidly when new contracts launch while mitigating long-term fixed employment costs.',
      '3. Prioritizing Quality of Hire & Cultural Alignment: Speed is crucial, but retention determines ROI. Partnering with specialized recruitment process outsourcing (RPO) providers ensures candidate screening extends beyond technical qualifications to match corporate culture and operational values.',
      'Conclusion: Sustainable growth relies on building resilient talent pipelines. Organizations that invest in strategic hiring partnerships today position themselves for market leadership tomorrow.'
    ],
    keyTakeaways: [
      'Dynamic market conditions demand flexible labor models.',
      'Predictive analytics prevents costly operational staffing bottlenecks.',
      'RPO partnerships accelerate time-to-fill while maintaining quality standards.'
    ]
  },
  {
    id: 'career-acceleration-2026',
    category: 'For Candidates',
    title: 'Career Growth & Opportunities in 2026',
    summary: 'Essential strategies for job seekers to stand out, level up skills, and land high-impact positions.',
    date: 'September 18, 2026',
    readTime: '4 min read',
    author: 'R4M Talent Success Team',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content: [
      'The modern job market values adaptable professionals who combine specialized technical expertise with strong interpersonal skills. Whether you are transitioning into a new industry or seeking high-level management opportunities, standing out requires deliberate personal positioning.',
      'Tailoring Your Professional Story: Recruiters analyze hundreds of applications daily. Highlighting measurable outcomes—such as efficiency improvements, revenue growth, or successful project deployments—instantly sets your profile apart.',
      'Continuous Skill Acquisition: Industries across logistics, technology, and manufacturing are evolving rapidly. Candidates who demonstrate ongoing professional development and familiarity with emerging digital tools gain a distinct competitive advantage.',
      'Partnering with Talent Specialists: Working with specialized placement consultants gives candidates direct access to unlisted opportunities and customized guidance throughout the hiring process.'
    ],
    keyTakeaways: [
      'Focus resume points on quantifiable business outcomes.',
      'Demonstrate adaptability and continuous learning.',
      'Leverage recruitment partners to access exclusive job openings.'
    ]
  },
  {
    id: 'rpo-vs-traditional-recruitment',
    category: 'For Businesses',
    title: 'Navigating RPO & Manpower Solutions',
    summary: 'How Recruitment Process Outsourcing optimizes cost-per-hire, compliance, and deployment speed.',
    date: 'September 10, 2026',
    readTime: '6 min read',
    author: 'R4M Operations Advisory',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content: [
      'When managing large-scale hiring or specialized recruitment projects, traditional in-house HR departments often face capacity constraints. Recruitment Process Outsourcing (RPO) offers a scalable extension to internal HR teams.',
      'Streamlining Sourcing Pipelines: By leveraging automated talent pools and experienced industry recruiters, RPO solutions dramatically reduce time-to-hire without compromising candidate rigor.',
      'Ensuring Regulatory Compliance & Governance: Labor regulations and compliance frameworks require expert oversight. RPO providers manage compliance documentation, contract management, and onboarding workflows seamlessly.',
      'Cost Efficiency at Scale: Shifting from transactional agency fees to a structured RPO partnership delivers predictable budgeting and lower total recruitment expenditures.'
    ],
    keyTakeaways: [
      'RPO acts as a strategic extension of internal HR teams.',
      'Mitigates compliance risks in high-volume hiring environments.',
      'Delivers scalable talent acquisition with lower overall cost-per-hire.'
    ]
  },
  {
    id: 'scaling-logistics-tech-teams',
    category: 'Industry Trends',
    title: 'Scaling Technical & Operational Teams',
    summary: 'Overcoming specialized skill shortages in supply chain, engineering, and digital infrastructure.',
    date: 'August 28, 2026',
    readTime: '5 min read',
    author: 'R4M Industry Analytics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content: [
      'The logistics, manufacturing, and technology sectors are experiencing unprecedented demand for specialized technical talent. From warehouse automation engineers to supply chain planners, securing top-tier talent is a top operational priority.',
      'Key Challenges in Technical Hiring: High competition for experienced personnel has created tight candidate pools. Speed-to-offer and competitive benefit packaging are critical factors in securing candidate acceptances.',
      'Building Targeted Talent Pools: Proactive talent mapping enables organizations to maintain warm pipelines of qualified candidates ready for immediate deployment when project expansions occur.',
      'The Value of Niche Expertise: Partnering with industry-focused staffing specialists ensures candidates possess verified technical certifications and practical field experience.'
    ],
    keyTakeaways: [
      'Technical talent shortages demand proactive sourcing.',
      'Speed and streamlined interview loops increase offer acceptance rates.',
      'Specialized recruitment partners ensure fast deployment of verified talent.'
    ]
  },
  {
    id: 'flexible-labor-peak-demand',
    category: 'For Businesses',
    title: 'Flexible Staffing for Seasonal & Peak Growth',
    summary: 'Managing headcount elasticity effectively without increasing long-term operational costs.',
    date: 'August 14, 2026',
    readTime: '4 min read',
    author: 'R4M Talent Operations',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content: [
      'Seasonal surges in retail, e-commerce, and logistics require rapid headcount adjustments. Relying solely on permanent hires during peak periods can lead to overstaffing liabilities during slower business cycles.',
      'Benefits of On-Demand Manpower: Temporary and contract staffing allows businesses to respond instantly to volume fluctuations, protecting profit margins while meeting customer demands.',
      'Maintaining Productivity Standards: Thorough onboarding protocols and performance tracking ensure contract team members perform at standard efficiency from day one.',
      'Seamless Transition Models: High-performing contract personnel can be seamlessly converted to permanent core roles as enterprise requirements dictate.'
    ],
    keyTakeaways: [
      'Contract staffing provides maximum financial and operational elasticity.',
      'Protects baseline profit margins during market fluctuations.',
      'Provides a low-risk avenue to evaluate talent for full-time roles.'
    ]
  },
  {
    id: 'understanding-compensation-packages',
    category: 'For Candidates',
    title: 'Evaluating Complete Compensation & Growth',
    summary: 'A comprehensive candidate guide to total rewards, performance incentives, and career trajectory.',
    date: 'August 02, 2026',
    readTime: '5 min read',
    author: 'R4M Candidate Advisory',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    content: [
      'When evaluating job offers, base salary is only one component of the total reward package. Evaluating health coverage, skill development allowances, and advancement pathways ensures long-term career satisfaction.',
      'Understanding Total Compensation: Components like performance bonuses, medical insurance, flexible working schedules, and professional development stipends add substantial monetary and quality-of-life value.',
      'Evaluating Growth Opportunities: Inquire about internal promotion metrics and leadership training opportunities during final interview stages.',
      'Long-Term Value Creation: Choosing roles aligned with industry growth trajectories unlocks significant long-term earning potential and career security.'
    ],
    keyTakeaways: [
      'Assess total compensation packages beyond base salary alone.',
      'Inquire about internal promotion paths and skill development support.',
      'Prioritize industries with strong long-term growth fundamentals.'
    ]
  }
];

export default function InsightsDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category');

  const [activeTab, setActiveTab] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState(INSIGHTS_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialCategory) {
      setActiveTab(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setArticles(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch articles from database:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = ['All', 'For Businesses', 'For Candidates', 'Industry Trends'];

  const filteredArticles = articles.filter((article) => {
    const matchesTab = activeTab === 'All' || article.category === activeTab;
    const matchesSearch =
      (article.title && article.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.category && article.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <section className="r4m-insights-section">
      <div className="r4m-insights-container">

        {/* Controls Header: Category Tabs & Search Bar */}
        <div className="r4m-insights-controls">
          <div className="r4m-insights-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`r4m-insights-tab ${activeTab === cat ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="r4m-insights-search">
            <i className="bi bi-search r4m-insights-search__icon"></i>
            <input
              type="text"
              className="r4m-insights-search__input"
              placeholder="Search articles or insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="r4m-insights-search__clear"
                onClick={() => setSearchQuery('')}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="r4m-insights-empty">
            <i className="bi bi-journal-x r4m-insights-empty__icon"></i>
            <h3>No Insights Found</h3>
            <p>We couldn't find any articles matching your search criteria. Try adjusting your search or category filter.</p>
            <button
              className="r4m-insights-reset-btn"
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="r4m-insights-grid">
            {filteredArticles.map((article) => (
              <article key={article.id || article._id} className="r4m-insight-card">
                {/* Image Banner Container with Orange Category Overlay Tag */}
                <div className="r4m-insight-card__image-wrap">
                  <img
                    src={article.image || article.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop'}
                    alt={article.title}
                    className="r4m-insight-card__img"
                  />
                  {/* Category Tag matching mockup */}
                  <div className="r4m-insight-card__category-tag">
                    {article.category}
                  </div>
                </div>

                {/* Card Content Area matching user screenshot */}
                <div className="r4m-insight-card__body">
                  <h3 className="r4m-insight-card__title">
                    {article.title}
                  </h3>

                  <p className="r4m-insight-card__summary">
                    {article.summary || article.subtitle}
                  </p>

                  <div className="r4m-insight-card__footer">
                    <button
                      className="r4m-insight-card__read-more"
                      onClick={() => setSelectedArticle(article)}
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Article Detail Modal / Reader */}
      {selectedArticle && (
        <div className="r4m-article-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="r4m-article-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="r4m-article-modal__close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="r4m-article-modal__hero">
              <img
                src={selectedArticle.image || selectedArticle.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop'}
                alt={selectedArticle.title}
                className="r4m-article-modal__img"
              />
              <span className="r4m-article-modal__tag">{selectedArticle.category}</span>
            </div>

            <div className="r4m-article-modal__content">
              <div className="r4m-article-modal__meta">
                <span><i className="bi bi-calendar3"></i> {selectedArticle.date}</span>
                <span>•</span>
                <span><i className="bi bi-clock"></i> {selectedArticle.readTime || '5 min read'}</span>
                <span>•</span>
                <span><i className="bi bi-person"></i> {selectedArticle.author || 'Admin R4M'}</span>
              </div>

              <h2 className="r4m-article-modal__title">{selectedArticle.title}</h2>
              <p className="r4m-article-modal__lead">{selectedArticle.summary || selectedArticle.subtitle}</p>

              {/* Key Takeaways Box */}
              {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                <div className="r4m-article-modal__takeaways">
                  <h4><i className="bi bi-lightbulb"></i> Key Takeaways</h4>
                  <ul>
                    {selectedArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Content Paragraphs */}
              <div className="r4m-article-modal__body">
                {Array.isArray(selectedArticle.content) ? (
                  selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{selectedArticle.content}</p>
                )}
              </div>

              {/* Modal Footer / Actions */}
              <div className="r4m-article-modal__footer">
                <div className="r4m-article-modal__share">
                  <span>Share this article:</span>
                  <a href="#share-fb" aria-label="Share on Facebook"><i className="bi bi-facebook"></i></a>
                  <a href="#share-tw" aria-label="Share on Twitter"><i className="bi bi-twitter-x"></i></a>
                  <a href="#share-li" aria-label="Share on LinkedIn"><i className="bi bi-linkedin"></i></a>
                </div>
                <button
                  className="r4m-article-modal__done-btn"
                  onClick={() => setSelectedArticle(null)}
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
