'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShimmerButton } from '@/components/effects/shimmer-button';
import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { BentoGrid, BentoGridItem } from '@/components/effects/bento-grid';
import { Phone, Mail, MapPin, Linkedin, Facebook } from 'lucide-react';

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

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const infoItems = [
    { icon: Phone, value: contactInfo.phone, href: undefined },
    { icon: Mail, value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, value: contactInfo.location, href: undefined },
    { icon: Linkedin, value: 'LinkedIn', href: contactInfo.linkedin },
    { icon: Facebook, value: 'Facebook', href: contactInfo.facebook },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-10">
      <h1 className="font-display text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
        {tPageTitle('contact')}
      </h1>

      <ScrollSection>
        <ScrollItem>
          <BentoGrid className="sm:grid-cols-2 lg:grid-cols-3">
            {infoItems.map(({ icon: Icon, value, href }) => {
              const content = (
                <>
                  <Icon className="size-5 text-accent-blue mb-2" />
                  <p className="text-sm break-words">{value}</p>
                </>
              );
              return (
                <BentoGridItem key={value}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </BentoGridItem>
              );
            })}
          </BentoGrid>
        </ScrollItem>
      </ScrollSection>

      <ScrollSection>
        <ScrollItem>
          <div className="rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-6 shadow-md shadow-accent-blue/5">
            <h2 className="font-display text-xl font-semibold mb-6">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">{t('name')}</label>
                <Input type="text" name="name" required value={formData.name} onChange={handleChange} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">{t('email')}</label>
                <Input type="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">{t('message')}</label>
                <Textarea name="message" required rows={5} value={formData.message} onChange={handleChange} />
              </div>

              <ShimmerButton type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? t('sending') : t('sendButton')}
              </ShimmerButton>

              {responseMessage && (
                <p className="text-center text-sm text-accent-blue">{responseMessage}</p>
              )}
            </form>
          </div>
        </ScrollItem>
      </ScrollSection>
    </div>
  );
}
