'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  facebook: string;
}

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setResponseMessage(t('contact.successMessage'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage(t('contact.errorMessage'));
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setResponseMessage(t('contact.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto py-16 px-4 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t('pageTitle.contact')}</h1>

      {/* Section 1: Contact Info */}
      {isLoading ? (
        <p>{t('contact.loading')}</p>
      ) : contactInfo ? (
        <div className="space-y-4 text-lg">
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>{contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span>
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{contactInfo.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔗</span>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span>🔗</span>
            <a
              href={contactInfo.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-600">{t('contact.error')}</p>
      )}

      {/* Section 2: Send Message Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold mb-4">{t('contact.sendMessage')}</h2>

        <div>
          <label className="block mb-2 font-medium">{t('contact.name')}</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">{t('contact.email')}</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">{t('contact.message')}</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
        </button>

        {responseMessage && <p className="mt-4 text-center text-green-600">{responseMessage}</p>}
      </form>
    </div>
  );
}
