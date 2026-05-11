const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Create transporter — Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email to owner
    await transporter.sendMail({
      from: `"Amrutha Juice Contact" <${process.env.FROM_EMAIL}>`,
      to: 'pillalokesh3@gmail.com',
      subject: `📬 New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 16px;">
          <h2 style="color: #f97316; margin-bottom: 20px;">🥤 New Message — Amrutha Juice</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; color: #999; width: 120px;">Name:</td><td style="padding: 10px; color: #fff; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 10px; color: #999;">Email:</td><td style="padding: 10px; color: #f97316;">${email}</td></tr>
            <tr><td style="padding: 10px; color: #999;">Subject:</td><td style="padding: 10px; color: #fff;">${subject}</td></tr>
            <tr><td style="padding: 10px; color: #999; vertical-align: top;">Message:</td><td style="padding: 10px; color: #ccc; line-height: 1.6;">${message}</td></tr>
          </table>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">Sent from Amrutha Juice Contact Form</p>
        </div>
      `
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"Amrutha Juice" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: '✅ We received your message — Amrutha Juice',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 30px; border-radius: 16px;">
          <h2 style="color: #f97316;">🥤 Thank you, ${name}!</h2>
          <p style="color: #ccc; line-height: 1.6;">We have received your message and will get back to you within 24 hours.</p>
          <div style="background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.3); border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="color: #f97316; margin: 0; font-weight: bold;">Your message: "${subject}"</p>
          </div>
          <p style="color: #666; font-size: 12px;">— Team Amrutha Juice 🥤</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error.message);
    // Still return success to user even if email fails
    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
  }
});

module.exports = router;
