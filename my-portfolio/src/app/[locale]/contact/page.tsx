'use client';

import React, { useEffect, useState } from 'react';

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  facebook: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setContactInfo(data);
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
        setResponseMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage('Oops! Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setResponseMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto py-16 px-4 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Me</h1>

      {/* Section 1: Contact Info */}
      {contactInfo ? (
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
        <p>Loading contact information...</p>
      )}

      {/* Section 2: Send Message Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold mb-4">Send a Message</h2>

        <div>
          <label className="block mb-2 font-medium">Name</label>
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
          <label className="block mb-2 font-medium">Email</label>
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
          <label className="block mb-2 font-medium">Message</label>
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
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {responseMessage && (
          <p className="mt-4 text-center text-green-600">{responseMessage}</p>
        )}
      </form>
    </div>
  );
}
