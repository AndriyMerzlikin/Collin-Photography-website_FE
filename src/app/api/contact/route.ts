import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { name, email, phone, comment } = await req.json();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.SMTP_RECEIVER,
        subject: '📩 New Contact Submission from COLLIN PHOTOGRAPHY',
        text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${comment}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('Email error:', err);
        return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 });
    }
}
