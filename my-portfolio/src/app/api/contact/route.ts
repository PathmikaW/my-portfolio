// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';

const contactInfo = {
  phone: '+94 723675513',
  email: 'pathmikaweerarathna@gmail.com',
  location: 'Gonapola, Western Province, Sri Lanka',
  linkedin: 'https://www.linkedin.com/in/pathmika-weerarathna',
  facebook: 'https://www.facebook.com/pathmika.weerarathna',
};

export async function GET() {
  return NextResponse.json(contactInfo);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Log incoming data (send message form)
    console.log('Contact form submitted:', body);

    // Example: You could save to DB here
    // For now, just return success
    return NextResponse.json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({ success: false, message: 'Error occurred' }, { status: 500 });
  }
}
