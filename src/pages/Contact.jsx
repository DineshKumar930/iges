import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import './Contact.css';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (form.phone && !/^[+\d][\d\s-]{6,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="contact">
      <section className="page-header">
        <h1 className="page-header__title">Contact Us</h1>
        <p className="page-header__subtitle">
          Get in touch with the IGS Federation — we'd love to hear from you.
        </p>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Let's Start a"
          highlight="Conversation"
          subtitle="Reach out for inquiries, partnerships, registrations, or any other questions."
        />

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__info-card">
              <div className="contact__info-icon" aria-hidden="true">📍</div>
              <h3>Visit Us</h3>
              <p>IGS Headquarters<br />Sports Complex Road<br />New Delhi – 110001, India</p>
            </div>
            <div className="contact__info-card">
              <div className="contact__info-icon" aria-hidden="true">✉️</div>
              <h3>Email Us</h3>
              <p><a href="mailto:info@igsgamefederation.org">info@igsgamefederation.org</a></p>
              <p><a href="mailto:support@igsgamefederation.org">support@igsgamefederation.org</a></p>
            </div>
            <div className="contact__info-card">
              <div className="contact__info-icon" aria-hidden="true">📞</div>
              <h3>Call Us</h3>
              <p><a href="tel:+911234567890">+91 123 456 7890</a></p>
              <p><a href="tel:+919876543210">+91 987 654 3210</a></p>
            </div>
            <div className="contact__social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">▶</a>
              <a href="#" aria-label="X">𝕏</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            {submitted && (
              <div className="contact__success" role="status">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            <div className="contact__field">
              <label htmlFor="name">Full Name *</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Enter your name" />
              {errors.name && <span className="contact__error">{errors.name}</span>}
            </div>

            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                {errors.phone && <span className="contact__error">{errors.phone}</span>}
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="subject">Subject *</label>
              <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="What is this about?" />
              {errors.subject && <span className="contact__error">{errors.subject}</span>}
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="6" value={form.message} onChange={handleChange} placeholder="Write your message…" />
              {errors.message && <span className="contact__error">{errors.message}</span>}
            </div>

            <button type="submit" className="contact__submit">
              Send Message <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>

        <div className="contact__map" aria-label="Location map">
          <div className="contact__map-placeholder">
            <span className="contact__map-icon" aria-hidden="true">📍</span>
            <p>Google Map Placeholder</p>
            <span className="contact__map-address">IGS Headquarters, New Delhi, India</span>
          </div>
        </div>
      </section>
    </div>
  );
}