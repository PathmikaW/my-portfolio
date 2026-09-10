// src/app/api/contact/route.ts
//
// Sends contact-form submissions via Gmail SMTP (nodemailer).
// Requires env vars: GMAIL_USER, GMAIL_APP_PASSWORD, optional CONTACT_TO.
// See .env.example.

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  // honeypot: real users leave this empty
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (c) => map[c]);
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Silently accept obvious bot submissions (honeypot filled).
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ success: true, message: 'Message sent!' });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: 'Name, email, and message are all required.' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }
  if (name.length > 200 || message.length > 5000) {
    return NextResponse.json({ success: false, message: 'That message is too long.' }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO || user;

  if (!user || !pass) {
    console.error('Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not configured.');
    return NextResponse.json(
      { success: false, message: 'The email service is not configured yet.' },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // App Passwords are shown with spaces for readability; strip them.
    auth: { user, pass: pass.replace(/\s+/g, '') },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    return NextResponse.json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact form: failed to send email', error);
    return NextResponse.json(
      { success: false, message: 'Could not send your message. Please try again later.' },
      { status: 502 },
    );
  }
}
