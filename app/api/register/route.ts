import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { insertRegistration } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Generate unique ticket ID with random 9-digit number
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    const ticketId = `C2C-${randomNumber}`;
    
    // Ensure instagram starts with @ for consistency
    const instagramUsername = data.instagram.startsWith('@') 
      ? data.instagram 
      : `@${data.instagram}`;
    
    // Generate QR code
    const qrData = JSON.stringify({
      ticketId,
      name: data.name,
      instagram: instagramUsername,
      phone: data.phonenumber,
      cgMember: data.isCGMember,
      cgNumber: data.cgNumber,
      heardFrom: data.heardFrom === 'Other' ? data.heardFromOther : data.heardFrom,
      event: 'Created 2 Connect - Youth Camp 2025',
    });
    
    const qrUrl = await QRCode.toDataURL(qrData, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1f1f1f', // midnight color from your design
        light: '#fdfbf1', // cream color from your design
      },
    });
    
    // Save to Supabase
    try {
      await insertRegistration({
        ticketid: ticketId,
        name: data.name,
        instagram: instagramUsername,
        phonenumber: data.phonenumber,
        is_cg_member: data.isCGMember,
        cg_number: data.isCGMember ? data.cgNumber : undefined,
        heard_from: !data.isCGMember ? (data.heardFrom === 'Other' ? data.heardFromOther : data.heardFrom) : undefined,
      });
    } catch (dbError) {
      // Return error if DB save fails (since it's critical now)
      return NextResponse.json(
        { success: false, error: 'Database save failed. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      ticketId,
      qrUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
