// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Log incoming data
    console.log('Contact form submitted:', body);

    // Example: You could save to DB here
    // For now, just return success
    return NextResponse.json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({ success: false, message: 'Error occurred' }, { status: 500 });
  }
}
