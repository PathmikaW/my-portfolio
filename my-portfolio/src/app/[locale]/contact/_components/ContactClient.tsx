'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  facebook: string;
}

interface Props {
  contactInfo: ContactInfo;
  locale: string;
}

export default function ContactClient({ contactInfo }: Props) {
  const t = useTranslations('contact');
  const tPageTitle = useTranslations('pageTitle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

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
        setResponseMessage(t('successMessage'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage(t('errorMessage'));
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setResponseMessage(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        {tPageTitle('contact')}
      </h1>

      {/* Section 1: Contact Info */}
      {!contactInfo ? (
        <Skeleton className="h-24 w-full" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('sendMessage')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-base text-muted-foreground">
            <div>📞 {contactInfo.phone}</div>
            <div>
              📧{' '}
              <a href={`mailto:${contactInfo.email}`} className="text-cyan-600 hover:underline">
                {contactInfo.email}
              </a>
            </div>
            <div>📍 {contactInfo.location}</div>
            <div>
              🔗{' '}
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
            <div>
              🔗{' '}
              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline"
              >
                Facebook
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 2: Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('sendMessage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">{t('name')}</label>
              <Input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">{t('email')}</label>
              <Input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">{t('message')}</label>
              <Textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? t('sending') : t('sendButton')}
            </Button>

            {responseMessage && (
              <p className="mt-4 text-center text-green-600">{responseMessage}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
