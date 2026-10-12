import express from 'express';
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

const router = express.Router();

// GET all jobs (with optional search / category filters)
router.get('/', async (req, res) => {
  try {
    const { search, category, department } = req.query;
    let query = { status: 'Active' };

    if (department && department !== 'All') {
      query.department = department;
    } else if (category && category !== 'All') {
      query.$or = [
        { category: new RegExp(category, 'i') },
        { department: new RegExp(category, 'i') },
      ];
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { category: searchRegex },
        { department: searchRegex },
        { desc: searchRegex },
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    // Format output to be compatible with frontend MongoDB _id and id
    const formattedJobs = jobs.map((j) => ({
      id: j._id.toString(),
      _id: j._id.toString(),
      title: j.title,
      department: j.department,
      category: j.category || j.department,
      location: j.location,
      type: j.type,
      posted: j.posted || 'Posted Recently',
      desc: j.desc || j.aboutRole || 'No description provided.',
      aboutRole: j.aboutRole || j.desc || '',
      specialism: j.specialism || j.department,
      focus: j.focus || j.title,
      industry: j.industry || j.department,
      salary: j.salary || 'Negotiable / Competitive',
      workplaceType: j.workplaceType || 'Hybrid',
      experienceLevel: j.experienceLevel || 'Mid Level',
      reference: j.reference || `R4M-${Math.floor(1000 + Math.random() * 9000)}`,
      consultant: j.consultant || 'Admin R4M',
      contactEmail: j.contactEmail || 'admin@r4m.com',
      responsibilities: j.responsibilities && j.responsibilities.length > 0 ? j.responsibilities : [
        'Collaborate with department leadership to maintain operational excellence.',
        'Ensure safety and quality compliance across all project deliverables.',
        'Execute daily operational workflows and report progress.'
      ],
      whoYouAre: j.whoYouAre && j.whoYouAre.length > 0 ? j.whoYouAre : [
        'Minimum 1-3 years relevant industry experience preferred.',
        'Strong communication, problem-solving, and organizational skills.',
        'Proven track record of delivering results in team environment.'
      ],
      benefits: j.benefits && j.benefits.length > 0 ? j.benefits : [
        'Competitive salary package with HMO medical coverage.',
        'Career growth and ongoing professional development.',
        'Paid leave benefits and team incentives.'
      ]
    }));

    res.json(formattedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// GET single job by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let job = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      job = await Job.findById(id);
    }

    if (!job) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    const formattedJob = {
      id: job._id.toString(),
      _id: job._id.toString(),
      title: job.title,
      department: job.department,
      category: job.category || job.department,
      location: job.location,
      type: job.type,
      posted: job.posted || 'Posted Recently',
      desc: job.desc || job.aboutRole || 'No description provided.',
      aboutRole: job.aboutRole || job.desc || '',
      specialism: job.specialism || job.department,
      focus: job.focus || job.title,
      industry: job.industry || job.department,
      salary: job.salary || 'Negotiable / Competitive',
      workplaceType: job.workplaceType || 'Hybrid',
      experienceLevel: job.experienceLevel || 'Mid Level',
      reference: job.reference || `R4M-${Math.floor(1000 + Math.random() * 9000)}`,
      consultant: job.consultant || 'Admin R4M',
      contactEmail: job.contactEmail || 'admin@r4m.com',
      responsibilities: job.responsibilities && job.responsibilities.length > 0 ? job.responsibilities : [
        'Collaborate with department leadership to maintain operational excellence.',
        'Ensure safety and quality compliance across all project deliverables.',
        'Execute daily operational workflows and report progress.'
      ],
      whoYouAre: job.whoYouAre && job.whoYouAre.length > 0 ? job.whoYouAre : [
        'Minimum 1-3 years relevant industry experience preferred.',
        'Strong communication, problem-solving, and organizational skills.',
        'Proven track record of delivering results in team environment.'
      ],
      benefits: job.benefits && job.benefits.length > 0 ? job.benefits : [
        'Competitive salary package with HMO medical coverage.',
        'Career growth and ongoing professional development.',
        'Paid leave benefits and team incentives.'
      ]
    };

    res.json(formattedJob);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Failed to fetch job details' });
  }
});

// POST /api/jobs/apply - submit candidate application and email candidate information
router.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, resume, message, jobId, jobTitle, jobLocation, jobType } = req.body;

    if (!name || !email || !phone || !resume || !jobTitle) {
      return res.status(400).json({
        error: 'Missing required fields. Full name, email, phone, resume link, and job title are required.',
      });
    }

    // 1. Save application in database
    let savedApplication = null;
    try {
      savedApplication = await Application.create({
        jobId: jobId || '',
        jobTitle,
        jobLocation: jobLocation || 'Metro Manila, Philippines',
        jobType: jobType || 'Full-Time',
        name,
        email,
        phone,
        resume,
        message: message || '',
        status: 'New',
      });
    } catch (dbErr) {
      console.warn('Warning: Could not save application to database:', dbErr.message);
    }

    // 2. Dispatch application details email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ error: 'Email service is not configured on server' });
    }

    const applicationTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="background: #0b1a30; padding: 24px; border-radius: 6px 6px 0 0; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 0.5px;">R4M TALENT SOLUTIONS</h1>
          <p style="color: #f37021; margin: 6px 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">New Candidate Application</p>
        </div>

        <div style="background: #ffffff; padding: 32px 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 6px 6px;">
          <div style="background-color: #fff7ed; border-left: 4px solid #f37021; padding: 14px 18px; margin-bottom: 24px; border-radius: 2px;">
            <p style="margin: 0; font-size: 12px; color: #7c2d12; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Position Applied For</p>
            <h2 style="margin: 4px 0 0; font-size: 20px; color: #111827;">${jobTitle}</h2>
            <p style="margin: 4px 0 0; font-size: 14px; color: #4b5563;">
              <strong>Location:</strong> ${jobLocation || 'Metro Manila, Philippines'} &nbsp;|&nbsp; 
              <strong>Employment Type:</strong> ${jobType || 'Full-Time'}
              ${jobId ? `&nbsp;|&nbsp; <strong>Reference ID:</strong> ${jobId}` : ''}
            </p>
          </div>

          <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 14px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Information</h3>

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
                <a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">Submitted At:</td>
              <td style="padding: 10px 12px; color: #64748b; border: 1px solid #e2e8f0;">${applicationTime} (PHT)</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; background: #f8fafc; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">Resume / Portfolio:</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">
                <a href="${resume}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #f37021; color: #ffffff; text-decoration: none; padding: 7px 16px; border-radius: 4px; font-weight: 700; font-size: 13px;">Open Candidate Resume &rarr;</a>
                <div style="margin-top: 6px; font-size: 12px; color: #64748b; word-break: break-all;">${resume}</div>
              </td>
            </tr>
          </table>

          <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 10px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Candidate Cover Note</h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
            ${message ? message.replace(/\n/g, '<br/>') : '<em>No cover note provided by candidate.</em>'}
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; text-align: center; font-size: 12.5px; color: #64748b;">
            <p style="margin: 0;">💡 <strong>Quick Action:</strong> Click "Reply" in your email client to reach <strong>${name}</strong> directly at <a href="mailto:${email}" style="color: #f37021;">${email}</a>.</p>
          </div>
        </div>
      </div>
    `;

    const targetEmail = process.env.APPLICATIONS_EMAIL || 'r4minfiniteventures@gmail.com';

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
        subject: `New Job Application: ${jobTitle} – ${name}`,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Resend email error:', errData);
      return res.status(502).json({
        error: 'Application saved, but failed to send email notification.',
        details: errData,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Application submitted successfully for ${jobTitle}! Our recruitment team will review your details.`,
      applicationId: savedApplication ? savedApplication._id : undefined,
    });
  } catch (error) {
    console.error('Error handling job application:', error);
    return res.status(500).json({ error: 'Internal server error while processing application' });
  }
});

// POST /api/jobs/:id/apply - apply to a specific job by ID
router.post('/:id/apply', async (req, res) => {
  req.body.jobId = req.params.id;
  // If jobTitle not in body, try to fetch job from database
  if (!req.body.jobTitle && mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const job = await Job.findById(req.params.id);
      if (job) {
        req.body.jobTitle = job.title;
        req.body.jobLocation = req.body.jobLocation || job.location;
        req.body.jobType = req.body.jobType || job.type;
      }
    } catch (_) {}
  }
  // Forward to /apply logic
  return router.handle({ ...req, url: '/apply', originalUrl: req.originalUrl }, res);
});

// POST create a new job posting
router.post('/', async (req, res) => {
  try {
    const {
      title,
      department,
      category,
      location,
      type,
      desc,
      aboutRole,
      requirements,
      responsibilities,
    } = req.body;

    if (!title || !location) {
      return res.status(400).json({ message: 'Title and location are required' });
    }

    const newJob = await Job.create({
      title,
      department: department || 'Logistics & Supply Chain',
      category: category || department || 'Logistics',
      location,
      type: type || 'Full-Time',
      desc: desc || aboutRole || '',
      aboutRole: aboutRole || desc || '',
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities
        : responsibilities
          ? [responsibilities]
          : [],
      whoYouAre: Array.isArray(requirements)
        ? requirements
        : requirements
          ? [requirements]
          : [],
      posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });

    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      job: {
        id: newJob._id.toString(),
        _id: newJob._id.toString(),
        ...newJob._doc,
      },
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job posting' });
  }
});

// PUT update job posting
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      category,
      location,
      type,
      desc,
      aboutRole,
      requirements,
      responsibilities,
    } = req.body;

    let updatedJob = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedJob = await Job.findByIdAndUpdate(
        id,
        {
          title,
          department: department || 'Logistics & Supply Chain',
          category: category || department || 'Logistics',
          location,
          type: type || 'Full-Time',
          desc: desc || aboutRole || '',
          aboutRole: aboutRole || desc || '',
          responsibilities: Array.isArray(responsibilities)
            ? responsibilities
            : responsibilities
              ? [responsibilities]
              : [],
          whoYouAre: Array.isArray(requirements)
            ? requirements
            : requirements
              ? [requirements]
              : [],
        },
        { new: true }
      );
    }

    if (!updatedJob) {
      updatedJob = await Job.create({
        title,
        department: department || 'Logistics & Supply Chain',
        category: category || department || 'Logistics',
        location,
        type: type || 'Full-Time',
        desc: desc || aboutRole || '',
        aboutRole: aboutRole || desc || '',
        responsibilities: Array.isArray(responsibilities)
          ? responsibilities
          : responsibilities
            ? [responsibilities]
            : [],
        whoYouAre: Array.isArray(requirements)
          ? requirements
          : requirements
            ? [requirements]
            : [],
        posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
    }

    res.json({
      success: true,
      message: 'Job posting updated successfully',
      job: {
        id: updatedJob._id.toString(),
        _id: updatedJob._id.toString(),
        ...updatedJob._doc,
      },
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Failed to update job posting' });
  }
});

// DELETE job posting
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Job.findByIdAndDelete(id);
    }
    res.json({ success: true, message: 'Job posting deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Failed to delete job posting' });
  }
});

export default router;
