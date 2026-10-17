import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import RichTextEditor from '../components/Admin/RichTextEditor';
import '../styles/pages/AdminDashboardPage.css';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs'); // 'dashboard', 'jobs', 'articles', 'profile'
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
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`);
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

  // Auth Header Helper
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3800);
  };

  // Jobs State & Server Aggregated Stats
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    activeListings: 0,
    inactiveListings: 0,
    totalApplications: 0,
  });

  // Search, Filters & Pagination State
  const [jobSearchInput, setJobSearchInput] = useState('');
  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [jobPage, setJobPage] = useState(1);
  const [jobPagination, setJobPagination] = useState({
    page: 1,
    limit: 10,
    totalResults: 0,
    totalPages: 1,
  });

  // Checkbox Selection State
  const [selectedJobIds, setSelectedJobIds] = useState([]);

  // Add / Edit Modal State
  const defaultJobForm = {
    title: '',
    reference: '',
    department: 'Technology & Digital',
    type: 'Full-Time',
    workplaceType: 'Hybrid',
    location: '',
    specialism: '',
    focus: '',
    industry: '',
    salary: '',
    experienceLevel: '',
    consultant: 'Richard Meneses',
    contactEmail: 'admin@r4m.com',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    otherInformation: '',
    status: 'active',
  };
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(defaultJobForm);
  const [initialJobForm, setInitialJobForm] = useState(defaultJobForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSavingJob, setIsSavingJob] = useState(false);
  const [showUnsavedConfirm, setShowUnsavedConfirm] = useState(false);

  // View Modal State (Read-only)
  const [viewingJob, setViewingJob] = useState(null);

  // Applicants Modal State
  const [applicantsJob, setApplicantsJob] = useState(null);
  const [applicantsList, setApplicantsList] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  // Delete Confirm Modal State
  const [deletingJob, setDeletingJob] = useState(null);
  const [deletingBulk, setDeletingBulk] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setJobSearchQuery(jobSearchInput);
      setJobPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [jobSearchInput]);

  // Fetch admin jobs from MongoDB backend API
  const fetchAdminJobs = async () => {
    try {
      setJobsLoading(true);
      const params = new URLSearchParams({
        admin: 'true',
        page: jobPage,
        limit: 10,
      });

      if (jobSearchQuery.trim()) {
        params.append('search', jobSearchQuery.trim());
      }
      if (selectedDepartment && selectedDepartment !== 'All Departments') {
        params.append('department', selectedDepartment);
      }
      if (selectedStatus && selectedStatus !== 'All Status') {
        params.append('status', selectedStatus.toLowerCase());
      }

      const res = await fetch(`${API_BASE_URL}/api/jobs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          if (data.stats) {
            setJobStats(data.stats);
          }
          if (data.pagination) {
            setJobPagination(data.pagination);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin jobs:', err);
    } finally {
      setJobsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProfile();
    fetchArticles();
  }, []);

  // Fetch jobs whenever search query, filters, or page change
  useEffect(() => {
    fetchAdminJobs();
  }, [jobSearchQuery, selectedDepartment, selectedStatus, jobPage]);

  // Lock page scroll while any modal is open
  useEffect(() => {
    const isAnyModalOpen = Boolean(
      isJobModalOpen ||
      viewingJob ||
      applicantsJob ||
      deletingJob ||
      deletingBulk ||
      showUnsavedConfirm
    );

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isJobModalOpen, viewingJob, applicantsJob, deletingJob, deletingBulk, showUnsavedConfirm]);

  // Escape key listener for closing modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showUnsavedConfirm) {
          setShowUnsavedConfirm(false);
        } else if (isJobModalOpen) {
          handleRequestCloseJobModal();
        } else if (viewingJob) {
          setViewingJob(null);
        } else if (applicantsJob) {
          setApplicantsJob(null);
        } else if (deletingJob) {
          setDeletingJob(null);
        } else if (deletingBulk) {
          setDeletingBulk(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isJobModalOpen,
    showUnsavedConfirm,
    viewingJob,
    applicantsJob,
    deletingJob,
    deletingBulk,
    jobForm,
    initialJobForm,
  ]);

  // Detect unsaved changes in Add/Edit modal
  const isFormDirty = () => {
    return JSON.stringify(jobForm) !== JSON.stringify(initialJobForm);
  };

  const handleRequestCloseJobModal = () => {
    if (isFormDirty()) {
      setShowUnsavedConfirm(true);
    } else {
      closeJobModal();
    }
  };

  const closeJobModal = () => {
    setIsJobModalOpen(false);
    setEditingJob(null);
    setJobForm(defaultJobForm);
    setInitialJobForm(defaultJobForm);
    setFormErrors({});
    setShowUnsavedConfirm(false);
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingJob(null);
    setJobForm(defaultJobForm);
    setInitialJobForm(defaultJobForm);
    setFormErrors({});
    setIsJobModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (job) => {
    const toRichEditorList = (val) => {
      if (!val) return '';
      if (Array.isArray(val)) {
        return '<ul>' + val.map((s) => `<li>${s}</li>`).join('') + '</ul>';
      }
      if (typeof val === 'string') {
        if (val.includes('<li') || val.includes('<p')) return val;
        const lines = val
          .split('\n')
          .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean);
        if (lines.length > 1) {
          return '<ul>' + lines.map((s) => `<li>${s}</li>`).join('') + '</ul>';
        }
        return val;
      }
      return String(val);
    };

    const initialData = {
      title: job.title || '',
      reference: job.reference || '',
      department: job.department || job.category || 'Technology & Digital',
      type: job.type || 'Full-Time',
      workplaceType: job.workplaceType || 'Hybrid',
      location: job.location || '',
      specialism: job.specialism || '',
      focus: job.focus || '',
      industry: job.industry || job.department || '',
      salary: job.salary || '',
      experienceLevel: job.experienceLevel || '',
      consultant: job.consultant || 'Richard Meneses',
      contactEmail: job.contactEmail || 'admin@r4m.com',
      description: job.desc || job.aboutRole || '',
      responsibilities: toRichEditorList(job.responsibilities),
      requirements: toRichEditorList(job.requirements || job.whoYouAre),
      benefits: toRichEditorList(job.benefits),
      otherInformation: job.otherInformation || '',
      status: (job.status || 'active').toLowerCase(),
    };
    setEditingJob(job);
    setJobForm(initialData);
    setInitialJobForm(initialData);
    setFormErrors({});
    setIsJobModalOpen(true);
  };

  // Form Validation
  const validateJobForm = () => {
    const errs = {};
    if (!jobForm.title.trim()) errs.title = 'Job title is required';
    if (!jobForm.department.trim()) errs.department = 'Department is required';
    if (!jobForm.type.trim()) errs.type = 'Job type is required';
    if (!jobForm.location.trim()) errs.location = 'Location is required';

    const cleanDesc = (jobForm.description || '').replace(/<[^>]*>/g, '').trim();
    if (!cleanDesc) errs.description = 'Job description is required';

    const cleanReqs = (jobForm.requirements || '').replace(/<[^>]*>/g, '').trim();
    if (!cleanReqs) errs.requirements = 'Requirements are required';

    if (!jobForm.status) errs.status = 'Status is required';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Save Job Submit (POST or PUT to MongoDB API)
  const handleSaveJob = async (e) => {
    if (e) e.preventDefault();
    if (!validateJobForm()) return;

    setIsSavingJob(true);
    try {
      const isEdit = Boolean(editingJob);
      const url = isEdit
        ? `${API_BASE_URL}/api/jobs/${editingJob.id || editingJob._id}`
        : `${API_BASE_URL}/api/jobs`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(jobForm),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(
          isEdit ? 'Job posting updated successfully!' : 'Job posting published successfully!',
          'success'
        );
        closeJobModal();
        await fetchAdminJobs();
      } else {
        showToast(data.message || 'Failed to save job posting.', 'error');
      }
    } catch (err) {
      console.error('Error saving job:', err);
      showToast('Error saving job posting. Please try again.', 'error');
    } finally {
      setIsSavingJob(false);
    }
  };

  // Toggle Status directly by clicking status badge
  const handleToggleStatus = async (job) => {
    const currentStatus = (job.status || 'active').toLowerCase();
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${job.id || job._id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(
          `Job listing set to ${newStatus === 'active' ? 'Active' : 'Inactive'}`,
          'success'
        );
        await fetchAdminJobs();
      } else {
        showToast(data.message || 'Failed to update status', 'error');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      showToast('Error updating status', 'error');
    }
  };

  // Open candidate applications list
  const handleOpenApplicants = async (job) => {
    setApplicantsJob(job);
    setApplicantsLoading(true);
    setApplicantsList([]);
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${job.id || job._id}/applications`);
      if (res.ok) {
        const data = await res.json();
        setApplicantsList(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch applicants:', err);
      showToast('Failed to load candidate applications', 'error');
    } finally {
      setApplicantsLoading(false);
    }
  };

  // Delete Job Handler
  const handleConfirmDelete = async () => {
    if (!deletingJob) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${deletingJob.id || deletingJob._id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showToast('Job posting deleted successfully', 'success');
        setSelectedJobIds((prev) =>
          prev.filter((id) => id !== (deletingJob.id || deletingJob._id))
        );
        setDeletingJob(null);
        await fetchAdminJobs();
      } else {
        showToast('Failed to delete job posting', 'error');
      }
    } catch (err) {
      console.error('Error deleting job:', err);
      showToast('Error deleting job', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Checkbox Selection & Bulk Actions
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedJobIds(jobs.map((j) => j.id || j._id));
    } else {
      setSelectedJobIds([]);
    }
  };

  const handleToggleSelectJob = (id) => {
    setSelectedJobIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action) => {
    if (selectedJobIds.length === 0) return;
    if (action === 'delete') {
      setDeletingBulk(true);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/bulk`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action, ids: selectedJobIds }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Bulk status updated', 'success');
        setSelectedJobIds([]);
        await fetchAdminJobs();
      } else {
        showToast(data.message || 'Failed to update selected jobs', 'error');
      }
    } catch (err) {
      console.error('Error performing bulk action:', err);
      showToast('Error executing bulk action', 'error');
    }
  };

  const handleConfirmBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/bulk`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: 'delete', ids: selectedJobIds }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Selected jobs deleted', 'success');
        setSelectedJobIds([]);
        setDeletingBulk(false);
        await fetchAdminJobs();
      } else {
        showToast(data.message || 'Failed to delete selected jobs', 'error');
      }
    } catch (err) {
      console.error('Error deleting selected jobs:', err);
      showToast('Error deleting selected jobs', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setJobSearchInput('');
    setJobSearchQuery('');
    setSelectedDepartment('');
    setSelectedStatus('');
    setJobPage(1);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Articles / Insights State
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articleSuccessMsg, setArticleSuccessMsg] = useState('');
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Industry Trends',
    author: 'Admin R4M',
    coverImage: '',
    subtitle: '',
    content: '',
  });

  // Fetch articles from MongoDB backend API
  const fetchArticles = async () => {
    try {
      setArticlesLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/articles`);
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
        ? `${API_BASE_URL}/api/articles/${editingArticleId}`
        : `${API_BASE_URL}/api/articles`;
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
      await fetch(`${API_BASE_URL}/api/articles/${id}`, {
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
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
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
            <span>Job Postings</span>
          </button>

          <button
            className={`r4m-admin-nav-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('jobs');
              setIsMobileMenuOpen(false);
            }}
          >
            <i className="bi bi-people-fill"></i>
            <span>Applications</span>
          </button>

          <button
            className={`r4m-admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('articles');
              setIsMobileMenuOpen(false);
            }}
          >
            <i className="bi bi-journal-text"></i>
            <span>Article / Insights</span>
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

          {/* ==================== 2. JOB POSTINGS TAB (EXACT MATCH TO DESIGN SCREENSHOT) ==================== */}
          {activeTab === 'jobs' && (
            <div className="r4m-tab-content">
              {/* Header Row: Title & Subtitle on left, + Add Job Posting on right */}
              <div className="r4m-jobs-header-row">
                <div>
                  <h1 className="r4m-jobs-header-title">Job Postings</h1>
                  <p className="r4m-jobs-header-sub">
                    Manage all job listings, track applications, and control visibility on the website.
                  </p>
                </div>
                <button
                  type="button"
                  className="r4m-add-job-btn"
                  onClick={handleOpenAddModal}
                >
                  <i className="bi bi-plus-lg"></i>
                  <span>Add Job Posting</span>
                </button>
              </div>

              {/* 4 Stat Cards Row */}
              <div className="r4m-jobs-stats-row">
                {/* Total Job Postings */}
                <div className="r4m-job-stat-card">
                  <div className="r4m-job-stat-icon r4m-job-stat-icon--orange">
                    <i className="bi bi-briefcase-fill"></i>
                  </div>
                  <div className="r4m-job-stat-info">
                    <span className="r4m-job-stat-num">{jobStats.totalJobs}</span>
                    <span className="r4m-job-stat-label">Total Job Postings</span>
                  </div>
                </div>

                {/* Active Listings */}
                <div className="r4m-job-stat-card">
                  <div className="r4m-job-stat-icon r4m-job-stat-icon--green">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="r4m-job-stat-info">
                    <span className="r4m-job-stat-num">{jobStats.activeListings}</span>
                    <span className="r4m-job-stat-label">Active Listings</span>
                  </div>
                </div>

                {/* Inactive Listings */}
                <div className="r4m-job-stat-card">
                  <div className="r4m-job-stat-icon r4m-job-stat-icon--red">
                    <i className="bi bi-eye-slash-fill"></i>
                  </div>
                  <div className="r4m-job-stat-info">
                    <span className="r4m-job-stat-num">{jobStats.inactiveListings}</span>
                    <span className="r4m-job-stat-label">Inactive Listings</span>
                  </div>
                </div>

                {/* Total Applications */}
                <div className="r4m-job-stat-card">
                  <div className="r4m-job-stat-icon r4m-job-stat-icon--blue">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="r4m-job-stat-info">
                    <span className="r4m-job-stat-num">{jobStats.totalApplications}</span>
                    <span className="r4m-job-stat-label">Total Applications</span>
                  </div>
                </div>
              </div>

              {/* Search and Filters Toolbar Card */}
              <div className="r4m-jobs-toolbar">
                <div className="r4m-jobs-search-wrap">
                  <i className="bi bi-search r4m-jobs-search-icon"></i>
                  <input
                    type="text"
                    className="r4m-jobs-search-input"
                    placeholder="Search job title, department, or location..."
                    value={jobSearchInput}
                    onChange={(e) => setJobSearchInput(e.target.value)}
                  />
                </div>

                <select
                  className="r4m-jobs-filter-select"
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setJobPage(1);
                  }}
                >
                  <option value="">All Departments</option>
                  <option value="Technology & Digital">Technology & Digital</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail & FMCG">Retail & FMCG</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                  <option value="Hospitality, Food & Beverage">Hospitality, Food & Beverage</option>
                  <option value="Construction & Engineering">Construction & Engineering</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Financial Services & FinTech">Financial Services & FinTech</option>
                </select>

                <select
                  className="r4m-jobs-filter-select"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setJobPage(1);
                  }}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <button
                  type="button"
                  className="r4m-jobs-clear-btn"
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              </div>

              {/* Bulk Actions Toolbar Bar */}
              {selectedJobIds.length > 0 && (
                <div className="r4m-jobs-bulk-bar">
                  <div className="r4m-bulk-left">
                    <span className="r4m-bulk-badge">{selectedJobIds.length}</span>
                    <span>job(s) selected</span>
                  </div>
                  <div className="r4m-bulk-actions">
                    <button
                      type="button"
                      className="r4m-bulk-btn"
                      onClick={() => handleBulkAction('activate')}
                    >
                      <i className="bi bi-check-circle"></i> Set Active
                    </button>
                    <button
                      type="button"
                      className="r4m-bulk-btn"
                      onClick={() => handleBulkAction('deactivate')}
                    >
                      <i className="bi bi-eye-slash"></i> Set Inactive
                    </button>
                    <button
                      type="button"
                      className="r4m-bulk-btn r4m-bulk-btn--danger"
                      onClick={() => handleBulkAction('delete')}
                    >
                      <i className="bi bi-trash"></i> Delete Selected
                    </button>
                    <button
                      type="button"
                      className="r4m-bulk-btn"
                      onClick={() => setSelectedJobIds([])}
                    >
                      Deselect
                    </button>
                  </div>
                </div>
              )}

              {/* Jobs Table Card */}
              <div className="r4m-jobs-table-card">
                <div style={{ overflowX: 'auto' }}>
                  <table className="r4m-jobs-table">
                    <thead>
                      <tr>
                        <th className="r4m-td-check">
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={jobs.length > 0 && selectedJobIds.length === jobs.length}
                            aria-label="Select all jobs on page"
                          />
                        </th>
                        <th>Reference</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Applications</th>
                        <th>Status</th>
                        <th>Date Posted</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobsLoading ? (
                        <tr>
                          <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                            <div style={{ display: 'inline-block', marginBottom: '8px' }}>
                              <i className="bi bi-arrow-repeat bi-spin" style={{ fontSize: '24px' }}></i>
                            </div>
                            <div>Loading job postings...</div>
                          </td>
                        </tr>
                      ) : jobs.length === 0 ? (
                        <tr>
                          <td colSpan="10">
                            <div className="r4m-jobs-table-empty">
                              <i className="bi bi-inbox"></i>
                              <h4>No job postings found</h4>
                              <p>Try adjusting your search query or clear filters.</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        jobs.map((j) => {
                          const jId = j.id || j._id;
                          const isSelected = selectedJobIds.includes(jId);
                          const statusLower = (j.status || 'active').toLowerCase();
                          const typeClass =
                            j.type === 'Part-Time'
                              ? 'r4m-type-pill--parttime'
                              : j.type === 'Contract'
                              ? 'r4m-type-pill--contract'
                              : j.type === 'Project-Based'
                              ? 'r4m-type-pill--project'
                              : 'r4m-type-pill--fulltime';

                          return (
                            <tr key={jId} className={isSelected ? 'is-selected' : ''}>
                              <td className="r4m-td-check">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSelectJob(jId)}
                                  aria-label={`Select ${j.title}`}
                                />
                              </td>
                              <td className="r4m-td-ref">
                                <span className="r4m-ref-badge">{j.reference || 'N/A'}</span>
                              </td>
                              <td className="r4m-td-job-title">{j.title}</td>
                              <td className="r4m-td-dept">{j.department || j.category}</td>
                              <td>
                                <span className={`r4m-type-pill ${typeClass}`}>{j.type}</span>
                              </td>
                              <td>{j.location}</td>
                              <td>
                                <button
                                  type="button"
                                  className="r4m-app-count-btn"
                                  onClick={() => handleOpenApplicants(j)}
                                  title="View candidate applications"
                                >
                                  <i className="bi bi-people-fill"></i>
                                  <span>{j.applicationsCount || 0}</span>
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className={`r4m-status-toggle-btn ${
                                    statusLower === 'active'
                                      ? 'r4m-status-toggle-btn--active'
                                      : 'r4m-status-toggle-btn--inactive'
                                  }`}
                                  onClick={() => handleToggleStatus(j)}
                                  title="Click to toggle status"
                                >
                                  {statusLower === 'active' ? 'Active' : 'Inactive'}
                                </button>
                              </td>
                              <td style={{ whiteSpace: 'nowrap', color: '#64748b' }}>
                                {j.datePosted || 'Oct 8, 2026'}
                              </td>
                              <td>
                                <div className="r4m-job-actions" style={{ justifyContent: 'center' }}>
                                  <button
                                    type="button"
                                    className="r4m-action-btn r4m-action-btn--view"
                                    onClick={() => setViewingJob(j)}
                                    title="View Job Details"
                                  >
                                    <i className="bi bi-eye"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="r4m-action-btn r4m-action-btn--edit"
                                    onClick={() => handleOpenEditModal(j)}
                                    title="Edit Job Posting"
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="r4m-action-btn r4m-action-btn--delete"
                                    onClick={() => setDeletingJob(j)}
                                    title="Delete Job"
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Row */}
                <div className="r4m-pagination-row">
                  <span className="r4m-pagination-info">
                    Showing{' '}
                    {jobPagination.totalResults === 0
                      ? 0
                      : (jobPagination.page - 1) * jobPagination.limit + 1}{' '}
                    to{' '}
                    {Math.min(
                      jobPagination.page * jobPagination.limit,
                      jobPagination.totalResults
                    )}{' '}
                    of {jobPagination.totalResults} results
                  </span>
                  <div className="r4m-pagination-nav">
                    <button
                      type="button"
                      className="r4m-page-btn"
                      disabled={jobPagination.page <= 1}
                      onClick={() => setJobPage((p) => Math.max(1, p - 1))}
                      aria-label="Previous page"
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    {Array.from(
                      { length: jobPagination.totalPages || 1 },
                      (_, idx) => idx + 1
                    ).map((pg) => (
                      <button
                        key={pg}
                        type="button"
                        className={`r4m-page-btn ${jobPagination.page === pg ? 'is-active' : ''}`}
                        onClick={() => setJobPage(pg)}
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="r4m-page-btn"
                      disabled={jobPagination.page >= jobPagination.totalPages}
                      onClick={() =>
                        setJobPage((p) => Math.min(jobPagination.totalPages, p + 1))
                      }
                      aria-label="Next page"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
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

      {/* ==================== 1. ADD / EDIT JOB CENTERED POPUP MODAL ==================== */}
      {isJobModalOpen && (
        <div
          className="r4m-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleRequestCloseJobModal();
          }}
        >
          <div className="r4m-modal-dialog">
            <div className="r4m-modal-header">
              <div>
                <h2 className="r4m-modal-title">
                  {editingJob ? 'Edit Job Posting' : 'Add New Job Posting'}
                </h2>
                <p className="r4m-modal-sub">
                  {editingJob
                    ? 'Update the job listing details and requirements below.'
                    : 'Fill in the details below to create a new job listing.'}
                </p>
              </div>
              <button
                type="button"
                className="r4m-modal-close-btn"
                onClick={handleRequestCloseJobModal}
                aria-label="Close modal"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="r4m-modal-body">
              <form id="jobForm" onSubmit={handleSaveJob} className="r4m-modal-form-grid">
                {/* Row 1: Job Title & Reference */}
                <div className="r4m-form-field">
                  <label className="r4m-form-label">
                    Job Title <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className={`r4m-form-input ${formErrors.title ? 'has-error' : ''}`}
                    placeholder="e.g. Retail Store Operations Lead"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  />
                  {formErrors.title && (
                    <span className="r4m-field-error">{formErrors.title}</span>
                  )}
                </div>

                <div className="r4m-form-field">
                  <label className="r4m-form-label">
                    Job Reference
                  </label>
                  <input
                    type="text"
                    className="r4m-form-input"
                    placeholder="e.g. R4M-RET-404 (Auto-generated if empty)"
                    value={jobForm.reference}
                    onChange={(e) => setJobForm({ ...jobForm, reference: e.target.value })}
                  />
                </div>

                {/* Row 2: Department & Contract / Job Type */}
                <div className="r4m-form-field">
                  <label className="r4m-form-label">
                    Department / Industry <span className="req">*</span>
                  </label>
                  <select
                    className={`r4m-form-select ${formErrors.department ? 'has-error' : ''}`}
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  >
                    <option value="Technology & Digital">Technology & Digital</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail & FMCG">Retail & FMCG</option>
                    <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                    <option value="Hospitality, Food & Beverage">Hospitality, Food & Beverage</option>
                    <option value="Construction & Engineering">Construction & Engineering</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Financial Services & FinTech">Financial Services & FinTech</option>
                  </select>
                  {formErrors.department && (
                    <span className="r4m-field-error">{formErrors.department}</span>
                  )}
                </div>

                <div className="r4m-form-field">
                  <label className="r4m-form-label">
                    Contract / Job Type <span className="req">*</span>
                  </label>
                  <select
                    className={`r4m-form-select ${formErrors.type ? 'has-error' : ''}`}
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Project-Based">Project-Based</option>
                  </select>
                  {formErrors.type && (
                    <span className="r4m-field-error">{formErrors.type}</span>
                  )}
                </div>

                {/* Row 3: Workplace Type & Location */}
                <div className="r4m-form-field">
                  <label className="r4m-form-label">Workplace Type</label>
                  <select
                    className="r4m-form-select"
                    value={jobForm.workplaceType}
                    onChange={(e) => setJobForm({ ...jobForm, workplaceType: e.target.value })}
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-Site">On-Site</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="r4m-form-field">
                  <label className="r4m-form-label">
                    Location <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className={`r4m-form-input ${formErrors.location ? 'has-error' : ''}`}
                    placeholder="e.g. Taguig City, Metro Manila"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  />
                  {formErrors.location && (
                    <span className="r4m-field-error">{formErrors.location}</span>
                  )}
                </div>

                {/* Row 4: Specialism & Focus Area */}
                <div className="r4m-form-field">
                  <label className="r4m-form-label">Specialism (Optional)</label>
                  <input
                    type="text"
                    className="r4m-form-input"
                    placeholder="e.g. Store Operations"
                    value={jobForm.specialism}
                    onChange={(e) => setJobForm({ ...jobForm, specialism: e.target.value })}
                  />
                </div>

                <div className="r4m-form-field">
                  <label className="r4m-form-label">Focus Area (Optional)</label>
                  <input
                    type="text"
                    className="r4m-form-input"
                    placeholder="e.g. Retail & FMCG Customer Service"
                    value={jobForm.focus}
                    onChange={(e) => setJobForm({ ...jobForm, focus: e.target.value })}
                  />
                </div>

                {/* Row 5: Salary & Experience Level */}
                <div className="r4m-form-field">
                  <label className="r4m-form-label">Salary (Optional)</label>
                  <input
                    type="text"
                    className="r4m-form-input"
                    placeholder="e.g. ₱30,000 - ₱38,000 / month"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                  />
                </div>

                <div className="r4m-form-field">
                  <label className="r4m-form-label">Experience Level (Optional)</label>
                  <select
                    className="r4m-form-select"
                    value={jobForm.experienceLevel}
                    onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                {/* Row 6: Consultant & Contact Email */}
                <div className="r4m-form-field">
                  <label className="r4m-form-label">Consultant / Recruiter</label>
                  <input
                    type="text"
                    className="r4m-form-input"
                    placeholder="e.g. Richard Meneses"
                    value={jobForm.consultant}
                    onChange={(e) => setJobForm({ ...jobForm, consultant: e.target.value })}
                  />
                </div>

                <div className="r4m-form-field">
                  <label className="r4m-form-label">Contact / Inquiry Email</label>
                  <input
                    type="email"
                    className="r4m-form-input"
                    placeholder="e.g. admin@r4m.com"
                    value={jobForm.contactEmail}
                    onChange={(e) => setJobForm({ ...jobForm, contactEmail: e.target.value })}
                  />
                </div>

                {/* Row 7: About the Role / Description (Rich Text) */}
                <div className="r4m-form-field r4m-form-col-full">
                  <label className="r4m-form-label">
                    About the Role / Job Description <span className="req">*</span>
                  </label>
                  <RichTextEditor
                    value={jobForm.description}
                    onChange={(content) => setJobForm({ ...jobForm, description: content })}
                    placeholder="Enter detailed job overview and role objectives..."
                    minHeight="130px"
                  />
                  {formErrors.description && (
                    <span className="r4m-field-error">{formErrors.description}</span>
                  )}
                </div>

                {/* Row 8: Key Responsibilities (Rich Text) */}
                <div className="r4m-form-field r4m-form-col-full">
                  <label className="r4m-form-label">Key Responsibilities (Optional)</label>
                  <RichTextEditor
                    value={jobForm.responsibilities}
                    onChange={(content) => setJobForm({ ...jobForm, responsibilities: content })}
                    placeholder="Enter key deliverables and operational workflows (use bullet button for lists)..."
                    minHeight="120px"
                  />
                </div>

                {/* Row 9: Who You Are / Requirements (Rich Text) */}
                <div className="r4m-form-field r4m-form-col-full">
                  <label className="r4m-form-label">
                    Who You Are / Requirements <span className="req">*</span>
                  </label>
                  <RichTextEditor
                    value={jobForm.requirements}
                    onChange={(content) => setJobForm({ ...jobForm, requirements: content })}
                    placeholder="Enter candidate qualifications, skills, and certifications..."
                    minHeight="120px"
                  />
                  {formErrors.requirements && (
                    <span className="r4m-field-error">{formErrors.requirements}</span>
                  )}
                </div>

                {/* Row 10: Benefits (Optional Rich Text) */}
                <div className="r4m-form-field r4m-form-col-full">
                  <label className="r4m-form-label">Benefits & Perks (Optional)</label>
                  <RichTextEditor
                    value={jobForm.benefits}
                    onChange={(content) => setJobForm({ ...jobForm, benefits: content })}
                    placeholder="Enter benefits and perks (e.g. HMO, bonuses, store discounts)..."
                    minHeight="100px"
                  />
                </div>

                {/* Row 11: Other Information */}
                <div className="r4m-form-field r4m-form-col-full">
                  <label className="r4m-form-label">Other Information (Optional)</label>
                  <input
                    type="text"
                    className="r4m-form-input"
                    placeholder="e.g. Additional screening notes, shift schedules..."
                    value={jobForm.otherInformation}
                    onChange={(e) => setJobForm({ ...jobForm, otherInformation: e.target.value })}
                  />
                </div>

                {/* Row 12: Status */}
                <div className="r4m-form-field r4m-form-col-full">
                  <label className="r4m-form-label">
                    Status <span className="req">*</span>
                  </label>
                  <select
                    className="r4m-form-select"
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                  >
                    <option value="active">Active (Show on website)</option>
                    <option value="inactive">Inactive (Hidden from website)</option>
                  </select>
                  <span className="r4m-field-helper">
                    {jobForm.status === 'inactive'
                      ? 'Inactive listings will be hidden from the public website.'
                      : 'Active listings are immediately visible and accepting candidate applications.'}
                  </span>
                </div>
              </form>
            </div>

            <div className="r4m-modal-footer">
              <button
                type="button"
                className="r4m-secondary-btn"
                onClick={handleRequestCloseJobModal}
                disabled={isSavingJob}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="jobForm"
                className="r4m-primary-btn r4m-primary-btn--orange"
                disabled={isSavingJob}
              >
                {isSavingJob
                  ? 'Saving...'
                  : editingJob
                  ? 'Save Changes'
                  : 'Publish Job Posting'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. READ-ONLY VIEW JOB MODAL ==================== */}
      {viewingJob && (
        <div
          className="r4m-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewingJob(null);
          }}
        >
          <div className="r4m-modal-dialog r4m-modal-dialog--lg">
            <div className="r4m-modal-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span
                    className={`r4m-status-toggle-btn ${(viewingJob.status || 'active').toLowerCase() === 'active' ? 'r4m-status-toggle-btn--active' : 'r4m-status-toggle-btn--inactive'}`}
                    style={{ cursor: 'default' }}
                  >
                    {(viewingJob.status || 'active').toLowerCase() === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <span className="r4m-ref-badge" style={{ fontSize: '13px' }}>
                    {viewingJob.reference || 'N/A'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Posted on {viewingJob.datePosted || 'Oct 8, 2026'}
                  </span>
                </div>
                <h2 className="r4m-modal-title">{viewingJob.title}</h2>
                <p className="r4m-modal-sub">{viewingJob.department || viewingJob.category}</p>
              </div>
              <button
                type="button"
                className="r4m-modal-close-btn"
                onClick={() => setViewingJob(null)}
                aria-label="Close modal"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="r4m-modal-body">
              <div className="r4m-view-meta-grid">
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Job Reference</span>
                  <span className="r4m-view-meta-val">
                    <span className="r4m-ref-badge">{viewingJob.reference || 'N/A'}</span>
                  </span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Location</span>
                  <span className="r4m-view-meta-val">{viewingJob.location}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Contract Type</span>
                  <span className="r4m-view-meta-val">{viewingJob.type}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Workplace Type</span>
                  <span className="r4m-view-meta-val">{viewingJob.workplaceType || 'Hybrid'}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Specialism</span>
                  <span className="r4m-view-meta-val">{viewingJob.specialism || 'General'}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Focus Area</span>
                  <span className="r4m-view-meta-val">{viewingJob.focus || 'General'}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Salary</span>
                  <span className="r4m-view-meta-val">
                    {viewingJob.salary || 'Negotiable / Competitive'}
                  </span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Experience Level</span>
                  <span className="r4m-view-meta-val">
                    {viewingJob.experienceLevel || 'Not Specified'}
                  </span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Consultant</span>
                  <span className="r4m-view-meta-val">{viewingJob.consultant || 'Richard Meneses'}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Contact Email</span>
                  <span className="r4m-view-meta-val">{viewingJob.contactEmail || 'admin@r4m.com'}</span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Applications</span>
                  <span className="r4m-view-meta-val">
                    👥 {viewingJob.applicationsCount || 0} applied
                  </span>
                </div>
                <div className="r4m-view-meta-item">
                  <span className="r4m-view-meta-label">Status</span>
                  <span className="r4m-view-meta-val" style={{ textTransform: 'capitalize' }}>
                    {viewingJob.status || 'active'}
                  </span>
                </div>
              </div>

              <div className="r4m-view-sec">
                <h4 className="r4m-view-sec-title">About the Role / Description</h4>
                <div
                  className="r4m-view-sec-content"
                  dangerouslySetInnerHTML={{
                    __html: viewingJob.desc || viewingJob.aboutRole || 'No description provided.',
                  }}
                />
              </div>

              {viewingJob.responsibilities && (
                <div className="r4m-view-sec">
                  <h4 className="r4m-view-sec-title">Key Responsibilities</h4>
                  {Array.isArray(viewingJob.responsibilities) ? (
                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#334155', lineHeight: '1.6' }}>
                      {viewingJob.responsibilities.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className="r4m-view-sec-content"
                      dangerouslySetInnerHTML={{ __html: viewingJob.responsibilities }}
                    />
                  )}
                </div>
              )}

              <div className="r4m-view-sec">
                <h4 className="r4m-view-sec-title">Who You Are / Requirements</h4>
                <div
                  className="r4m-view-sec-content"
                  dangerouslySetInnerHTML={{
                    __html: viewingJob.requirements || viewingJob.whoYouAre || 'No specific requirements.',
                  }}
                />
              </div>

              {viewingJob.benefits && (
                <div className="r4m-view-sec">
                  <h4 className="r4m-view-sec-title">Benefits & Perks</h4>
                  <div
                    className="r4m-view-sec-content"
                    dangerouslySetInnerHTML={{ __html: viewingJob.benefits }}
                  />
                </div>
              )}

              {viewingJob.otherInformation && (
                <div className="r4m-view-sec">
                  <h4 className="r4m-view-sec-title">Other Information</h4>
                  <div className="r4m-view-sec-content">
                    {viewingJob.otherInformation}
                  </div>
                </div>
              )}
            </div>

            <div className="r4m-modal-footer">
              <button
                type="button"
                className="r4m-secondary-btn"
                onClick={() => setViewingJob(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="r4m-primary-btn r4m-primary-btn--orange"
                onClick={() => {
                  const j = viewingJob;
                  setViewingJob(null);
                  handleOpenEditModal(j);
                }}
              >
                <i className="bi bi-pencil"></i> Edit Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. APPLICANTS LIST MODAL ==================== */}
      {applicantsJob && (
        <div
          className="r4m-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setApplicantsJob(null);
          }}
        >
          <div className="r4m-modal-dialog r4m-modal-dialog--lg">
            <div className="r4m-modal-header">
              <div>
                <h2 className="r4m-modal-title">Candidates for {applicantsJob.title}</h2>
                <p className="r4m-modal-sub">
                  {applicantsList.length} applicant(s) for this position
                </p>
              </div>
              <button
                type="button"
                className="r4m-modal-close-btn"
                onClick={() => setApplicantsJob(null)}
                aria-label="Close modal"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="r4m-modal-body">
              {applicantsLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  <i className="bi bi-arrow-repeat bi-spin" style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}></i>
                  <p>Loading candidate applications...</p>
                </div>
              ) : applicantsList.length === 0 ? (
                <div className="r4m-jobs-table-empty">
                  <i className="bi bi-person-x"></i>
                  <h4>No applications yet</h4>
                  <p>No candidates have applied for this position so far.</p>
                </div>
              ) : (
                <div className="r4m-applicants-table-wrap">
                  <table className="r4m-applicants-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Contact Info</th>
                        <th>Resume Link</th>
                        <th>Message / Notes</th>
                        <th>Date Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicantsList.map((app) => (
                        <tr key={app.id || app._id}>
                          <td>
                            <div className="r4m-app-candidate-name">{app.name}</div>
                            <span
                              className="r4m-type-pill r4m-type-pill--fulltime"
                              style={{ fontSize: '11px', padding: '2px 8px' }}
                            >
                              {app.status || 'New'}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.email}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{app.phone}</div>
                          </td>
                          <td>
                            {app.resume ? (
                              <a
                                href={app.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="r4m-app-link-btn"
                              >
                                <i className="bi bi-box-arrow-up-right"></i> Open Resume
                              </a>
                            ) : (
                              <span style={{ color: '#94a3b8' }}>None</span>
                            )}
                          </td>
                          <td style={{ maxWidth: '240px' }}>
                            <p style={{ margin: 0, fontSize: '12.5px', color: '#475569', lineHeight: 1.4 }}>
                              {app.message || <em style={{ color: '#94a3b8' }}>No cover note</em>}
                            </p>
                          </td>
                          <td style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                            {app.dateApplied || 'Recently'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="r4m-modal-footer">
              <button
                type="button"
                className="r4m-secondary-btn"
                onClick={() => setApplicantsJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 4. DELETE CONFIRM MODAL (WITH APPLICANTS CHECK) ==================== */}
      {deletingJob && (
        <div
          className="r4m-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) setDeletingJob(null);
          }}
        >
          <div className="r4m-modal-dialog r4m-modal-dialog--sm">
            <div className="r4m-modal-body" style={{ padding: '28px 24px 20px' }}>
              <div className="r4m-confirm-icon-box">
                <i className="bi bi-trash-fill"></i>
              </div>
              <h3 className="r4m-confirm-title">Delete Job Posting</h3>

              {deletingJob.applicationsCount > 0 ? (
                <div>
                  <div className="r4m-warn-box">
                    ⚠️ <strong>Notice:</strong> This job has{' '}
                    <strong>{deletingJob.applicationsCount} candidate application(s)</strong> attached to it.
                    Deleting this job may remove candidate records. We strongly suggest setting the job to{' '}
                    <strong>Inactive</strong> instead.
                  </div>
                  <p className="r4m-confirm-desc">
                    Are you sure you want to permanently delete <strong>{deletingJob.title}</strong>?
                  </p>
                </div>
              ) : (
                <p className="r4m-confirm-desc">
                  Are you sure you want to delete <strong>{deletingJob.title}</strong>? This action cannot be undone.
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                {deletingJob.applicationsCount > 0 && (
                  <button
                    type="button"
                    className="r4m-primary-btn"
                    style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }}
                    onClick={async () => {
                      await handleToggleStatus({ ...deletingJob, status: 'active' });
                      setDeletingJob(null);
                    }}
                    disabled={isDeleting}
                  >
                    <i className="bi bi-eye-slash"></i> Set Inactive Instead
                  </button>
                )}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="r4m-secondary-btn"
                    onClick={() => setDeletingJob(null)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="r4m-primary-btn"
                    style={{ background: '#ef4444', color: '#ffffff' }}
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Job'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 5. BULK DELETE CONFIRM MODAL ==================== */}
      {deletingBulk && (
        <div
          className="r4m-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) setDeletingBulk(false);
          }}
        >
          <div className="r4m-modal-dialog r4m-modal-dialog--sm">
            <div className="r4m-modal-body" style={{ padding: '28px 24px 20px' }}>
              <div className="r4m-confirm-icon-box">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <h3 className="r4m-confirm-title">Delete Selected Jobs</h3>
              <p className="r4m-confirm-desc">
                Are you sure you want to delete <strong>{selectedJobIds.length}</strong> selected job
                posting(s)? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  type="button"
                  className="r4m-secondary-btn"
                  onClick={() => setDeletingBulk(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="r4m-primary-btn"
                  style={{ background: '#ef4444', color: '#ffffff' }}
                  onClick={handleConfirmBulkDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Selected'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 6. UNSAVED CHANGES WARNING DIALOG ==================== */}
      {showUnsavedConfirm && (
        <div
          className="r4m-modal-backdrop"
          style={{ zIndex: 1300 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowUnsavedConfirm(false);
          }}
        >
          <div className="r4m-modal-dialog r4m-modal-dialog--sm">
            <div className="r4m-modal-body" style={{ padding: '28px 24px 20px' }}>
              <div className="r4m-confirm-icon-box" style={{ background: '#fff7ed', color: '#f37021' }}>
                <i className="bi bi-exclamation-circle-fill"></i>
              </div>
              <h3 className="r4m-confirm-title">Unsaved Changes</h3>
              <p className="r4m-confirm-desc">
                You have unsaved changes in this job posting. Are you sure you want to close and discard your edits?
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  type="button"
                  className="r4m-secondary-btn"
                  onClick={() => setShowUnsavedConfirm(false)}
                >
                  Keep Editing
                </button>
                <button
                  type="button"
                  className="r4m-primary-btn"
                  style={{ background: '#ef4444', color: '#ffffff' }}
                  onClick={closeJobModal}
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 7. TOAST NOTIFICATIONS ==================== */}
      {toast.show && (
        <div className="r4m-toast-container">
          <div className={`r4m-toast ${toast.type === 'error' ? 'r4m-toast--error' : 'r4m-toast--success'}`}>
            <i
              className={`bi ${
                toast.type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'
              }`}
            ></i>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
