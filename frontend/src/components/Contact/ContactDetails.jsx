import { useState } from 'react';
import '../../styles/components/ContactDetails.css';

export default function ContactDetails() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Client Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Send form data to backend contact endpoint
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error('Failed to send contact email', await response.json());
      }
    } catch (err) {
      console.error('Error sending contact email', err);
    }
    // Reset form after a short delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Client Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <section className="r4m-contact-details" id="contact">
      <div className="r4m-contact-details__container">
        
        {/* Top Header Block */}
        <div className="r4m-contact-details__header">
          <span className="r4m-contact-details__tag">GET IN TOUCH</span>
          <h2 className="r4m-contact-details__title">
            Let's Build Something <span className="orange-text">Great Together</span>
          </h2>
          <p className="r4m-contact-details__subtitle">
            Whether you're looking for workforce solutions to scale your business or exploring your next career opportunity, we're here to help you move forward.
          </p>
        </div>

        {/* Main Grid: Contact Cards (Left) & Form (Right) */}
        <div className="r4m-contact-details__grid">
          
          {/* Left Column: Info Cards & Map Preview */}
          <div className="r4m-contact-info-col">
            
            {/* Info Cards */}
            <div className="r4m-contact-card">
              <div className="r4m-contact-card__icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="r4m-contact-card__body">
                <h3 className="r4m-contact-card__title">Head Office Location</h3>
                <p className="r4m-contact-card__text">
                  Metro Manila, Philippines
                </p>
              </div>
            </div>

            <div className="r4m-contact-card">
              <div className="r4m-contact-card__icon">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div className="r4m-contact-card__body">
                <h3 className="r4m-contact-card__title">Email Us</h3>
                <p className="r4m-contact-card__text">
                  <strong>Clients:</strong> solutions@r4mtalentsolutions.com<br />
                  <strong>Careers:</strong> careers@r4mtalentsolutions.com
                </p>
              </div>
            </div>

            <div className="r4m-contact-card">
              <div className="r4m-contact-card__icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="r4m-contact-card__body">
                <h3 className="r4m-contact-card__title">Call Us</h3>
                <p className="r4m-contact-card__text">
                  +63 (02) 8888-R4M (746)<br />
                  +63 917 123 4567
                </p>
              </div>
            </div>

            <div className="r4m-contact-card">
              <div className="r4m-contact-card__icon">
                <i className="bi bi-clock-fill"></i>
              </div>
              <div className="r4m-contact-card__body">
                <h3 className="r4m-contact-card__title">Business Hours</h3>
                <p className="r4m-contact-card__text">
                  Monday – Friday: 8:00 AM – 6:00 PM (PHT)<br />
                  Saturday – Sunday: Closed
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="r4m-contact-form-wrap">
            <h3 className="r4m-contact-form__title">Send Us a Message</h3>
            
            {submitted ? (
              <div className="r4m-contact-form__success">
                <i className="bi bi-check-circle-fill"></i>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for reaching out. One of our talent specialists will contact you shortly.</p>
              </div>
            ) : (
              <form className="r4m-contact-form" onSubmit={handleSubmit}>
                <div className="r4m-form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>

                <div className="r4m-form-row">
                  <div className="r4m-form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="name@company.com" 
                      required 
                    />
                  </div>

                  <div className="r4m-form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="+63 900 000 0000" 
                    />
                  </div>
                </div>

                <div className="r4m-form-group">
                  <label htmlFor="subject">I am contacting as *</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                  >
                    <option value="Client Inquiry">An Employer / Organization looking for talent</option>
                    <option value="Candidate Inquiry">A Job Seeker looking for career opportunities</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className="r4m-form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tell us about your workforce requirements or career goals..." 
                    required 
                  ></textarea>
                </div>

                <button type="submit" className="r4m-contact-form__btn">
                  Send Message <i className="bi bi-send-fill"></i>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
