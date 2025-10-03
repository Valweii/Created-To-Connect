import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate unique ticket ID
    const ticketId = `C2C-${nanoid(10).toUpperCase()}`;
    
    // Generate QR code
    const qrData = JSON.stringify({
      ticketId,
      name: data.fullName,
      email: data.email,
      event: 'Created 2 Connect - Youth Camp 2025',
    });
    
    const qrUrl = await QRCode.toDataURL(qrData, {
      width: 400,
      margin: 2,
      color: {
        dark: '#3d2817',
        light: '#f4e8d0',
      },
    });
    
    // In production, save to database (Supabase, etc.)
    // await saveToDatabase({ ...data, ticketId });
    
    // For now, just log it
    console.log('Registration received:', { ...data, ticketId });
    
    return NextResponse.json({
      success: true,
      ticketId,
      qrUrl,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}


