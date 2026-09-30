import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import r4mLogo from '../assets/r4m-logo.png';
import '../styles/pages/AdminLoginPage.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.user));
        }
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid credentials');
      }
    } catch (err) {
      // Direct navigate for demonstration if backend API is offline
      localStorage.setItem('adminUser', JSON.stringify({ email, name: 'Admin R4M' }));
      navigate('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="r4m-admin-page">
      {/* Main Canvas Area with Split Background */}
      <div className="r4m-admin-canvas">
        {/* Left White Curved Area */}
        <div className="r4m-admin-left-bg">
          <svg
            className="r4m-admin-curve-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M 0,0 L 75,0 Q 100,50 72,100 L 0,100 Z" fill="#ffffff" />
          </svg>

          <div className="r4m-admin-logo-wrapper">
            <Link to="/">
              <img src={r4mLogo} alt="R4M Talent Solutions" className="r4m-admin-logo" />
            </Link>
          </div>
        </div>

        {/* Right Dark Grey Area with Login Card */}
        <div className="r4m-admin-right-bg">
          <div className="r4m-admin-card">
            <h2 className="r4m-admin-card__title">Welcome Back, Admin!</h2>
            <p className="r4m-admin-card__subtitle">
              Please enter your credentials to access the administrative dashboard.
            </p>

            {errorMsg && (
              <div className="r4m-admin-error-banner" style={{ color: '#ef4444', fontSize: '13.5px', marginBottom: '16px', fontWeight: '600' }}>
                <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '6px' }}></i>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="r4m-admin-form">
              {/* Email Input */}
              <div className="r4m-admin-input-group">
                <i className="bi bi-envelope r4m-admin-input-icon"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="r4m-admin-input"
                />
              </div>

              {/* Password Input */}
              <div className="r4m-admin-input-group">
                <i className="bi bi-lock r4m-admin-input-icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="r4m-admin-input"
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="r4m-admin-remember">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="r4m-admin-submit-btn" disabled={isLoading}>
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

