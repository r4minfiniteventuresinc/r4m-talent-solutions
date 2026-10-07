import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// POST /api/contact - send email via Resend
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Resend API key not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const htmlContent = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br/>')}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'r4minfiniteventures@gmail.com', // destination email
        subject: `Contact Form: ${subject}`,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Resend error:', errData);
      return res.status(502).json({ error: 'Failed to send email', details: errData });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
