import express from 'express';
// Using native fetch (Node 18+); no need for node-fetch

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

  const inquiryTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <!-- Header Banner -->
      <div style="background: #0b1a30; padding: 24px; border-radius: 6px 6px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 0.5px;">R4M TALENT SOLUTIONS</h1>
        <p style="color: #f37021; margin: 6px 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">New Website Contact Inquiry</p>
      </div>

      <!-- Main Body Container -->
      <div style="background: #ffffff; padding: 32px 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 6px 6px;">
        <!-- Subject Badge Block -->
        <div style="background-color: #fff7ed; border-left: 4px solid #f37021; padding: 14px 18px; margin-bottom: 24px; border-radius: 2px;">
          <p style="margin: 0; font-size: 12px; color: #7c2d12; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Category / Subject</p>
          <h2 style="margin: 4px 0 0; font-size: 20px; color: #111827;">${subject}</h2>
        </div>

        <!-- Sender Information Section -->
        <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 14px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Sender Details</h3>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 10px 12px; background: #f8fafc; width: 32%; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">Full Name:</td>
            <td style="padding: 10px 12px; color: #0f172a; font-weight: 700; border: 1px solid #e2e8f0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">Email Address:</td>
            <td style="padding: 10px 12px; color: #0f172a; border: 1px solid #e2e8f0;">
              <a href="mailto:${email}" style="color: #f37021; text-decoration: none; font-weight: 600;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">Phone Number:</td>
            <td style="padding: 10px 12px; color: #0f172a; border: 1px solid #e2e8f0;">
              ${phone ? `<a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">Received At:</td>
            <td style="padding: 10px 12px; color: #64748b; border: 1px solid #e2e8f0;">${inquiryTime} (PHT)</td>
          </tr>
        </table>

        <!-- Message Block -->
        <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 10px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content</h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 4px; font-size: 14.5px; line-height: 1.65; color: #334155; margin-bottom: 24px;">
          ${message.replace(/\n/g, '<br/>')}
        </div>

        <!-- Direct Reply Tip -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; text-align: center; font-size: 12.5px; color: #64748b;">
          <p style="margin: 0;">💡 <strong>Quick Action:</strong> Click "Reply" in your email client to reach <strong>${name}</strong> directly at <a href="mailto:${email}" style="color: #f37021;">${email}</a>.</p>
        </div>
      </div>
    </div>
  `;

  const targetEmail = process.env.CONTACT_EMAIL || process.env.APPLICATIONS_EMAIL || 'r4minfiniteventures@gmail.com';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: targetEmail,
        reply_to: email,
        subject: `New Contact Inquiry: ${subject} – ${name}`,
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
