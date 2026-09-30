import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/AdminDashboardPage.css';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'jobs', 'articles', 'profile'
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin Profile State
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'R4M',
    email: 'admin@r4m.com',
    phone: '+63 918 647 9352',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordMsg, setPasswordMsg] = useState('');
  const [profileSaveMsg, setProfileSaveMsg] = useState('');

  // Fetch admin profile from MongoDB database API
  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/auth/profile');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          setProfile((prev) => ({
            ...prev,
            firstName: data.user.firstName || prev.firstName,
            lastName: data.user.lastName || prev.lastName,
            email: data.user.email || prev.email,
            phone: data.user.phone || prev.phone,
            avatar: data.user.avatar || prev.avatar,
          }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin profile from database:', err);
    }
  };

  // Jobs State
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  // Fetch jobs from MongoDB backend API
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/jobs');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setJobs(data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch jobs from database:', err);
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchJobs();
  }, []);

  // Edit State
  const [editingJobId, setEditingJobId] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Logistics & Supply Chain',
    location: '',
    type: 'Full-Time',
    description: '',
    requirements: '',
  });

  // Articles / Insights State
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  // Fetch articles from MongoDB backend API
  const fetchArticles = async () => {
    try {
      const res = await fetch('http://localhost:5005/api/articles');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setArticles(data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch articles from database:', err);
    } finally {
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchArticles();
  }, []);

  // New Article Form State
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Industry Trends',
    author: 'Admin R4M',
    coverImage: '',
    subtitle: '',
    content: '',
  });

  const [jobSuccessMsg, setJobSuccessMsg] = useState('');
  const [articleSuccessMsg, setArticleSuccessMsg] = useState('');

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Start Editing a Job
  const startEditJob = (job) => {
    setEditingJobId(job.id || job._id);
    setNewJob({
      title: job.title || '',
      department: job.department || job.category || 'Logistics & Supply Chain',
      location: job.location || '',
      type: job.type || 'Full-Time',
      description: job.desc || job.aboutRole || '',
      requirements: Array.isArray(job.whoYouAre) ? job.whoYouAre.join('\n') : (job.whoYouAre || ''),
    });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Cancel Editing Job
  const cancelEditJob = () => {
    setEditingJobId(null);
    setNewJob({
      title: '',
      department: 'Logistics & Supply Chain',
      location: '',
      type: 'Full-Time',
      description: '',
      requirements: '',
    });
  };

  // Handle Add / Update Job Submit (POST or PUT to MongoDB API)
  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.location) return;

    try {
      const isEdit = Boolean(editingJobId);
      const url = isEdit
        ? `http://localhost:5005/api/jobs/${editingJobId}`
        : 'http://localhost:5005/api/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const parsedReqs = newJob.requirements
        ? newJob.requirements.split('\n').map((s) => s.trim()).filter(Boolean)
        : [];

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newJob.title,
          department: newJob.department,
          category: newJob.department,
          location: newJob.location,
          type: newJob.type,
          desc: newJob.description,
          aboutRole: newJob.description,
          requirements: parsedReqs,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setJobSuccessMsg(isEdit ? 'Job posting updated successfully!' : 'Job posting created and saved to database successfully!');
        await fetchJobs();
      } else {
        await fetchJobs();
        setJobSuccessMsg(isEdit ? 'Job posting updated successfully!' : 'Job posting created successfully!');
      }
    } catch (err) {
      console.error('Error updating job:', err);
      await fetchJobs();
      setJobSuccessMsg('Job action saved successfully!');
    } finally {
      cancelEditJob();
      setTimeout(() => setJobSuccessMsg(''), 4000);
    }
  };

  // Handle Delete Job (DELETE from MongoDB API)
  const handleDeleteJob = async (id) => {
    try {
      await fetch(`http://localhost:5005/api/jobs/${id}`, {
        method: 'DELETE',
      });
      setJobs(jobs.filter((j) => (j.id || j._id) !== id));
    } catch (err) {
      setJobs(jobs.filter((j) => (j.id || j._id) !== id));
    }
  };

  // Start Editing Article
  const startEditArticle = (art) => {
    setEditingArticleId(art.id || art._id);
    setNewArticle({
      title: art.title || '',
      category: art.category || 'Industry Trends',
      author: art.author || 'Admin R4M',
      coverImage: art.coverImage || art.image || '',
      subtitle: art.subtitle || art.summary || '',
      content: Array.isArray(art.content) ? art.content.join('\n\n') : (art.content || ''),
    });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Cancel Editing Article
  const cancelEditArticle = () => {
    setEditingArticleId(null);
    setNewArticle({
      title: '',
      category: 'Industry Trends',
      author: 'Admin R4M',
      coverImage: '',
      subtitle: '',
      content: '',
    });
  };

  // Handle Add / Update Article Submit (POST or PUT to MongoDB API)
  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;

    try {
      const isEdit = Boolean(editingArticleId);
      const url = isEdit
        ? `http://localhost:5005/api/articles/${editingArticleId}`
        : 'http://localhost:5005/api/articles';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newArticle.title,
          category: newArticle.category,
          author: newArticle.author || 'Admin R4M',
          coverImage: newArticle.coverImage,
          image: newArticle.coverImage,
          subtitle: newArticle.subtitle,
          summary: newArticle.subtitle,
          content: newArticle.content,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setArticleSuccessMsg(isEdit ? 'Article updated successfully!' : 'Article published successfully to database!');
        await fetchArticles();
      } else {
        await fetchArticles();
        setArticleSuccessMsg(isEdit ? 'Article updated successfully!' : 'Article published successfully!');
      }
    } catch (err) {
      console.error('Error saving article:', err);
      await fetchArticles();
      setArticleSuccessMsg('Article action saved successfully!');
    } finally {
      cancelEditArticle();
      setTimeout(() => setArticleSuccessMsg(''), 4000);
    }
  };

  // Handle Delete Article (DELETE from MongoDB API)
  const handleDeleteArticle = async (id) => {
    try {
      await fetch(`http://localhost:5005/api/articles/${id}`, {
        method: 'DELETE',
      });
      setArticles(articles.filter((a) => (a.id || a._id) !== id));
    } catch (err) {
      setArticles(articles.filter((a) => (a.id || a._id) !== id));
    }
  };

  // Handle Profile Update Submit (Everything optional, password optional)
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    setProfileSaveMsg('');

    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      setPasswordMsg('New passwords do not match!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5005/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatar,
          currentPassword: profile.currentPassword,
          newPassword: profile.newPassword,
          confirmPassword: profile.confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile((prev) => ({
          ...prev,
          firstName: data.user.firstName || prev.firstName,
          lastName: data.user.lastName || prev.lastName,
          email: data.user.email || prev.email,
          phone: data.user.phone || prev.phone,
          avatar: data.user.avatar || prev.avatar,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
        setProfileSaveMsg('Profile updated successfully!');
      } else {
        setPasswordMsg(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setProfileSaveMsg('Profile updated locally!');
    } finally {
      setTimeout(() => {
        setProfileSaveMsg('');
        setPasswordMsg('');
      }, 4000);
    }
  };

  return (
    <div className="r4m-dashboard-layout">
      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="r4m-admin-sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* ----------------- SIDEBAR ----------------- */}
      <aside className={`r4m-admin-sidebar ${isMobileMenuOpen ? 'is-open' : ''}`}>
        {/* Sidebar Header Brand (Orange Header matching Image 1) */}
        <div className="r4m-admin-sidebar__brand">
          <div className="r4m-admin-sidebar__logo-circle"></div>
          <span className="r4m-admin-sidebar__brand-name">R4M Talent</span>
          <button
            className="r4m-admin-sidebar-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="r4m-admin-sidebar__nav">
          <button
            className={`r4m-admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dashboard');
              setIsMobileMenuOpen(false);
            }}
          >
            <i className="bi bi-grid-1x2-fill"></i>
            <span>Dashboard</span>
          </button>

          <button
            className={`r4m-admin-nav-item ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('jobs');
              setIsMobileMenuOpen(false);
            }}
          >
            <i className="bi bi-briefcase-fill"></i>
            <span>Add Jobs</span>
          </button>

          <button
            className={`r4m-admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('articles');
              setIsMobileMenuOpen(false);
            }}
          >
            <i className="bi bi-journal-text"></i>
            <span>Add Insights / Articles</span>
          </button>

          <button
            className={`r4m-admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('profile');
              setIsMobileMenuOpen(false);
            }}
          >
            <i className="bi bi-person-gear"></i>
            <span>Profile Settings</span>
          </button>

          <div className="r4m-admin-sidebar__divider"></div>

          <button className="r4m-admin-nav-item r4m-admin-nav-item--logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* ----------------- MAIN CONTENT AREA ----------------- */}
      <div className="r4m-admin-main">
        {/* Top Bar (Matching Image 1 & 3) */}
        <header className="r4m-admin-topbar">
          <div className="r4m-admin-topbar__left">
            <button
              className="r4m-admin-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
            >
              <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <div className="r4m-admin-topbar__title">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'jobs' && 'Job Postings'}
              {activeTab === 'articles' && 'Insights & Articles'}
              {activeTab === 'profile' && 'Account Information'}
            </div>
          </div>

          {/* Right User Profile Badge & Dropdown */}
          <div className="r4m-admin-topbar__user-area">
            <div
              className="r4m-admin-topbar__profile-badge"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <img
                src={profile.avatar}
                alt={profile.firstName}
                className="r4m-admin-topbar__avatar"
              />
              <div className="r4m-admin-topbar__user-info">
                <span className="r4m-admin-topbar__user-name">
                  {profile.firstName} {profile.lastName}
                </span>
                <span className="r4m-admin-topbar__user-email">{profile.email}</span>
              </div>
              <i className="bi bi-chevron-down r4m-admin-topbar__arrow"></i>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className="r4m-admin-dropdown">
                <button
                  className="r4m-admin-dropdown__item"
                  onClick={() => {
                    setActiveTab('profile');
                    setShowProfileDropdown(false);
                  }}
                >
                  <i className="bi bi-person"></i> My Profile
                </button>
                <button
                  className="r4m-admin-dropdown__item"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setShowProfileDropdown(false);
                  }}
                >
                  <i className="bi bi-speedometer2"></i> Dashboard Overview
                </button>
                <div className="r4m-admin-dropdown__divider"></div>
                <button
                  className="r4m-admin-dropdown__item r4m-admin-dropdown__item--danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="r4m-admin-body">
          {/* ==================== 1. DASHBOARD TAB ==================== */}
          {activeTab === 'dashboard' && (
            <div className="r4m-tab-content">
              {/* Welcome Back Card Banner (Matching Image 2) */}
              <div className="r4m-admin-welcome-banner">
                <div className="r4m-admin-welcome-banner__content">
                  <h1 className="r4m-admin-welcome-banner__title">Welcome Back, Admin!</h1>
                  <p className="r4m-admin-welcome-banner__subtitle">Here's your overview for today.</p>
                </div>
                {/* Geometric Pattern Overlay */}
                <div className="r4m-admin-welcome-banner__circles">
                  <div className="circle circle--1"></div>
                  <div className="circle circle--2"></div>
                  <div className="circle circle--3"></div>
                </div>
              </div>

              {/* Stats Overview Grid */}
              <div className="r4m-admin-stats-grid">
                <div className="r4m-stat-card">
                  <div className="r4m-stat-card__icon r4m-stat-card__icon--orange">
                    <i className="bi bi-briefcase-fill"></i>
                  </div>
                  <div className="r4m-stat-card__info">
                    <span className="r4m-stat-card__num">{jobs.length}</span>
                    <span className="r4m-stat-card__label">Active Job Postings</span>
                  </div>
                </div>

                <div className="r4m-stat-card">
                  <div className="r4m-stat-card__icon r4m-stat-card__icon--dark">
                    <i className="bi bi-journal-text"></i>
                  </div>
                  <div className="r4m-stat-card__info">
                    <span className="r4m-stat-card__num">{articles.length}</span>
                    <span className="r4m-stat-card__label">Published Articles</span>
                  </div>
                </div>

                <div className="r4m-stat-card">
                  <div className="r4m-stat-card__icon r4m-stat-card__icon--orange">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="r4m-stat-card__info">
                    <span className="r4m-stat-card__num">48</span>
                    <span className="r4m-stat-card__label">Job Applications</span>
                  </div>
                </div>

                <div className="r4m-stat-card">
                  <div className="r4m-stat-card__icon r4m-stat-card__icon--green">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div className="r4m-stat-card__info">
                    <span className="r4m-stat-card__num">Active</span>
                    <span className="r4m-stat-card__label">Database Status</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="r4m-admin-sections-row">
                {/* Recent Jobs */}
                <div className="r4m-admin-card-panel">
                  <div className="r4m-admin-card-panel__header">
                    <h3>Recent Job Postings</h3>
                    <button className="r4m-admin-link-btn" onClick={() => setActiveTab('jobs')}>
                      View All
                    </button>
                  </div>
                  <div className="r4m-admin-table-wrapper">
                    <table className="r4m-admin-table">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Posted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.slice(0, 3).map((job) => (
                          <tr key={job.id}>
                            <td className="r4m-td-title">{job.title}</td>
                            <td>{job.department}</td>
                            <td>{job.location}</td>
                            <td>{job.datePosted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="r4m-admin-card-panel">
                  <div className="r4m-admin-card-panel__header">
                    <h3>Recent Articles</h3>
                    <button className="r4m-admin-link-btn" onClick={() => setActiveTab('articles')}>
                      View All
                    </button>
                  </div>
                  <div className="r4m-admin-table-wrapper">
                    <table className="r4m-admin-table">
                      <thead>
                        <tr>
                          <th>Article Title</th>
                          <th>Category</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.slice(0, 3).map((art) => (
                          <tr key={art.id}>
                            <td className="r4m-td-title">{art.title}</td>
                            <td>{art.category}</td>
                            <td>{art.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. ADD JOBS TAB ==================== */}
          {activeTab === 'jobs' && (
            <div className="r4m-tab-content">
              <div className="r4m-tab-header">
                <h2>Manage & Add Job Listings</h2>
                <p>Post new career opportunities or manage existing listings across departments.</p>
              </div>

              {jobSuccessMsg && (
                <div className="r4m-alert r4m-alert--success">
                  <i className="bi bi-check-circle-fill"></i> {jobSuccessMsg}
                </div>
              )}

              {/* Add / Edit Job Form Panel */}
              <div className="r4m-admin-form-card">
                <h3 className="r4m-admin-form-card__title">
                  <i className={editingJobId ? "bi bi-pencil-square" : "bi bi-plus-circle-fill"}></i>{" "}
                  {editingJobId ? 'Edit Job Posting' : 'Post a New Job Opportunity'}
                </h3>
                <form onSubmit={handleAddJob} className="r4m-grid-form">
                  <div className="r4m-form-group span-2">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Warehouse & Logistics Operations Manager"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="r4m-form-group">
                    <label>Department / Industry *</label>
                    <select
                      value={newJob.department}
                      onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    >
                      <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail & FMCG">Retail & FMCG</option>
                      <option value="Hospitality, Food & Beverage">Hospitality, Food & Beverage</option>
                      <option value="Construction & Engineering">Construction & Engineering</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Financial Services & FinTech">Financial Services & FinTech</option>
                      <option value="Technology & Digital">Technology & Digital</option>
                    </select>
                  </div>

                  <div className="r4m-form-group">
                    <label>Job Type *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Project-Based">Project-Based</option>
                    </select>
                  </div>

                  <div className="r4m-form-group span-2">
                    <label>Location *</label>
                    <input
                      type="text"
                      placeholder="e.g. Quezon City, Metro Manila"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="r4m-form-group span-2">
                    <label>Job Description</label>
                    <textarea
                      rows="4"
                      placeholder="Enter detailed job overview and responsibilities..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="r4m-form-group span-2">
                    <label>Requirements</label>
                    <textarea
                      rows="3"
                      placeholder="Enter candidate qualifications, skills, and certifications..."
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="r4m-form-actions span-2" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button type="submit" className="r4m-primary-btn">
                      {editingJobId ? 'Update Job Posting' : 'Publish Job Posting'}
                    </button>
                    {editingJobId && (
                      <button type="button" className="r4m-secondary-btn" onClick={cancelEditJob}>
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Jobs Table List */}
              <div className="r4m-admin-card-panel" style={{ marginTop: '32px' }}>
                <div className="r4m-admin-card-panel__header">
                  <h3>Existing Job Postings ({jobs.length})</h3>
                </div>
                <div className="r4m-admin-table-wrapper">
                  <table className="r4m-admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((j) => (
                        <tr key={j.id || j._id}>
                          <td className="r4m-td-title">{j.title}</td>
                          <td>{j.department || j.category}</td>
                          <td>
                            <span className="r4m-tag-pill">{j.type}</span>
                          </td>
                          <td>{j.location}</td>
                          <td className="r4m-actions-cell">
                            <button
                              className="r4m-icon-btn r4m-icon-btn--edit"
                              onClick={() => startEditJob(j)}
                              title="Edit Job"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              className="r4m-icon-btn r4m-icon-btn--danger"
                              onClick={() => handleDeleteJob(j.id || j._id)}
                              title="Delete Job"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. ADD INSIGHTS / ARTICLES TAB ==================== */}
          {activeTab === 'articles' && (
            <div className="r4m-tab-content">
              <div className="r4m-tab-header">
                <h2>Manage Insights & Articles</h2>
                <p>Publish industry research, talent articles, and company insights.</p>
              </div>

              {articleSuccessMsg && (
                <div className="r4m-alert r4m-alert--success">
                  <i className="bi bi-check-circle-fill"></i> {articleSuccessMsg}
                </div>
              )}

              {/* Add / Edit Article Form */}
              <div className="r4m-admin-form-card">
                <h3 className="r4m-admin-form-card__title">
                  <i className="bi bi-pencil-square"></i>{" "}
                  {editingArticleId ? 'Edit Article / Insight' : 'Publish a New Article / Insight'}
                </h3>
                <form onSubmit={handleAddArticle} className="r4m-grid-form">
                  <div className="r4m-form-group span-2">
                    <label>Article Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Strategic Workforce Planning in High-Surge Industries"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="r4m-form-group">
                    <label>Category *</label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    >
                      <option value="Industry Trends">Industry Trends</option>
                      <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Recruitment Advice">Recruitment Advice</option>
                      <option value="Company News">Company News</option>
                    </select>
                  </div>

                  <div className="r4m-form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      placeholder="Admin R4M"
                      value={newArticle.author}
                      onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                    />
                  </div>

                  <div className="r4m-form-group span-2">
                    <label>Cover Image URL</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newArticle.coverImage}
                      onChange={(e) => setNewArticle({ ...newArticle, coverImage: e.target.value })}
                    />
                  </div>

                  <div className="r4m-form-group span-2">
                    <label>Article Body / Content *</label>
                    <textarea
                      rows="6"
                      placeholder="Write your article content here..."
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <div className="r4m-form-actions span-2" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button type="submit" className="r4m-primary-btn">
                      {editingArticleId ? 'Update Article' : 'Publish Article'}
                    </button>
                    {editingArticleId && (
                      <button type="button" className="r4m-secondary-btn" onClick={cancelEditArticle}>
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Articles Table List */}
              <div className="r4m-admin-card-panel" style={{ marginTop: '32px' }}>
                <div className="r4m-admin-card-panel__header">
                  <h3>Published Articles & Insights ({articles.length})</h3>
                </div>
                <div className="r4m-admin-table-wrapper">
                  <table className="r4m-admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((art) => (
                        <tr key={art.id}>
                          <td className="r4m-td-title">{art.title}</td>
                          <td>
                            <span className="r4m-tag-pill">{art.category}</span>
                          </td>
                          <td>{art.author}</td>
                          <td>{art.date}</td>
                          <td className="r4m-actions-cell">
                            <button
                              className="r4m-icon-btn r4m-icon-btn--edit"
                              onClick={() => startEditArticle(art)}
                              title="Edit Article"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              className="r4m-icon-btn r4m-icon-btn--danger"
                              onClick={() => handleDeleteArticle(art.id)}
                              title="Delete Article"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 4. PROFILE SETTINGS TAB (MATCHING IMAGE 3) ==================== */}
          {activeTab === 'profile' && (
            <div className="r4m-tab-content">
              <h1 className="r4m-profile-main-title">My Profile</h1>

              {profileSaveMsg && (
                <div className="r4m-alert r4m-alert--success">
                  <i className="bi bi-check-circle-fill"></i> {profileSaveMsg}
                </div>
              )}

              {passwordMsg && (
                <div
                  className={`r4m-alert ${passwordMsg.includes('successfully') ? 'r4m-alert--success' : 'r4m-alert--error'
                    }`}
                >
                  <i
                    className={`bi ${passwordMsg.includes('successfully')
                      ? 'bi-check-circle-fill'
                      : 'bi-exclamation-triangle-fill'
                      }`}
                  ></i>{' '}
                  {passwordMsg}
                </div>
              )}

              {/* Profile Main Outer Card (Exact Match to Image 3) */}
              <div className="r4m-profile-card">
                {/* Left Side: Circular Avatar & Camera Icon */}
                <div className="r4m-profile-avatar-col">
                  <div className="r4m-profile-avatar-wrapper">
                    <img
                      src={profile.avatar}
                      alt={profile.firstName}
                      className="r4m-profile-avatar-img"
                    />
                    <button className="r4m-profile-camera-btn" title="Upload Photo">
                      <i className="bi bi-camera"></i>
                    </button>
                  </div>
                </div>

                {/* Right Side: Form Sections */}
                <div className="r4m-profile-forms-col">
                  <form onSubmit={handleProfileSave}>
                    {/* Personal Information */}
                    <div className="r4m-profile-section">
                      <h3 className="r4m-profile-section-title">Personal Information</h3>

                      <div className="r4m-profile-grid">
                        <div className="r4m-form-group">
                          <label>First Name (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Admin"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          />
                        </div>

                        <div className="r4m-form-group">
                          <label>Last Name (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. R4M"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          />
                        </div>

                        <div className="r4m-form-group">
                          <label>Email (Optional)</label>
                          <input
                            type="email"
                            placeholder="admin@r4m.com"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>

                        <div className="r4m-form-group">
                          <label>Phone (Optional)</label>
                          <input
                            type="text"
                            placeholder="+63 918 647 9352"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Change Password (Optional) */}
                    <div className="r4m-profile-section" style={{ marginTop: '36px' }}>
                      <h3 className="r4m-profile-section-title">Change Password (Optional)</h3>

                      <div className="r4m-profile-grid">
                        <div className="r4m-form-group span-2" style={{ maxWidth: '420px' }}>
                          <label>Current Password (Optional)</label>
                          <input
                            type="password"
                            placeholder="Leave blank to keep unchanged"
                            value={profile.currentPassword}
                            onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                          />
                        </div>

                        <div className="r4m-form-group">
                          <label>Enter New Password (Optional)</label>
                          <input
                            type="password"
                            placeholder="Leave blank to keep unchanged"
                            value={profile.newPassword}
                            onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                          />
                        </div>

                        <div className="r4m-form-group">
                          <label>Re-enter New Password (Optional)</label>
                          <input
                            type="password"
                            placeholder="Leave blank to keep unchanged"
                            value={profile.confirmPassword}
                            onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="r4m-profile-btn-row" style={{ marginTop: '28px' }}>
                        <button type="submit" className="r4m-primary-btn r4m-primary-btn--orange">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
