import express from 'express';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

const router = express.Router();

// HTML Sanitization Configuration for Rich Text Fields
const sanitizeOptions = {
  allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
  },
  allowedSchemes: ['http', 'https'],
  allowedSchemesByTag: {
    a: ['http', 'https'],
  },
};

const cleanHtml = (dirty) => {
  if (!dirty || typeof dirty !== 'string') return '';
  return sanitizeHtml(dirty, sanitizeOptions);
};

const parseListItems = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((s) => cleanHtml(String(s))).filter(Boolean);
  }
  if (typeof input === 'string' && input.trim()) {
    // If it has <li> tags
    if (input.includes('<li')) {
      const items = [];
      const liMatches = input.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      if (liMatches && liMatches.length > 0) {
        liMatches.forEach((li) => {
          const text = cleanHtml(li.replace(/<[^>]+>/g, '').trim());
          if (text) items.push(text);
        });
        if (items.length > 0) return items;
      }
    }
    // If it has <p> tags
    if (input.includes('<p')) {
      const items = [];
      const pMatches = input.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
      if (pMatches && pMatches.length > 0) {
        pMatches.forEach((p) => {
          const text = cleanHtml(p.replace(/<[^>]+>/g, '').trim());
          if (text) items.push(text);
        });
        if (items.length > 0) return items;
      }
    }
    // Plain text / newlines
    return input
      .split('\n')
      .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);
  }
  return [];
};

// GET all jobs - Supports public list and admin dashboard with pagination, stats & aggregation
router.get('/', async (req, res) => {
  try {
    const {
      admin,
      search,
      category,
      department,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    const isAdmin = admin === 'true' || admin === true;

    let query = {};

    if (isAdmin) {
      // Admin filter: can see active and inactive listings
      if (status && status !== 'all' && status !== 'All Status') {
        query.status = status.toLowerCase();
      }

      if (department && department !== 'all' && department !== 'All Departments') {
        query.department = department;
      }

      if (search && search.trim()) {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { title: searchRegex },
          { reference: searchRegex },
          { department: searchRegex },
          { location: searchRegex },
          { category: searchRegex },
          { specialism: searchRegex },
          { focus: searchRegex },
          { desc: searchRegex },
        ];
      }

      // Group & count applications per jobId with a single aggregation
      const appAgg = await Application.aggregate([
        { $group: { _id: '$jobId', count: { $sum: 1 } } },
      ]);
      const appCountMap = {};
      appAgg.forEach((item) => {
        if (item._id) {
          appCountMap[item._id.toString()] = item.count;
        }
      });

      // Total stat card numbers
      const totalJobs = await Job.countDocuments();
      const activeListings = await Job.countDocuments({ status: 'active' });
      const inactiveListings = await Job.countDocuments({ status: 'inactive' });
      const totalApplications = await Application.countDocuments();

      // Pagination calculations
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.max(1, parseInt(limit, 10) || 10);
      const totalResults = await Job.countDocuments(query);
      const totalPages = Math.ceil(totalResults / limitNum) || 1;
      const skip = (pageNum - 1) * limitNum;

      const jobs = await Job.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      const formattedJobs = jobs.map((j) => {
        const jId = j._id.toString();
        return {
          id: jId,
          _id: jId,
          title: j.title,
          reference: j.reference || `R4M-${jId.slice(-4).toUpperCase()}`,
          department: j.department,
          category: j.category || j.department,
          location: j.location,
          type: j.type,
          workplaceType: j.workplaceType || 'Hybrid',
          specialism: j.specialism || '',
          focus: j.focus || '',
          industry: j.industry || j.department || '',
          salary: j.salary || '',
          experienceLevel: j.experienceLevel || '',
          desc: j.desc || j.aboutRole || '',
          aboutRole: j.aboutRole || j.desc || '',
          responsibilities: Array.isArray(j.responsibilities)
            ? j.responsibilities.join('\n')
            : j.responsibilities || '',
          requirements: Array.isArray(j.requirements)
            ? j.requirements.join('\n')
            : j.requirements || (Array.isArray(j.whoYouAre) ? j.whoYouAre.join('\n') : j.whoYouAre || ''),
          whoYouAre: j.whoYouAre,
          benefits: Array.isArray(j.benefits) ? j.benefits.join('\n') : j.benefits || '',
          otherInformation: j.otherInformation || '',
          consultant: j.consultant || 'Richard Meneses',
          contactEmail: j.contactEmail || 'admin@r4m.com',
          status: j.status || 'active',
          applicationsCount: appCountMap[jId] || 0,
          createdAt: j.createdAt,
          datePosted: j.createdAt
            ? new Date(j.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Recently',
        };
      });

      return res.json({
        jobs: formattedJobs,
        stats: {
          totalJobs,
          activeListings,
          inactiveListings,
          totalApplications,
        },
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalResults,
          totalPages,
        },
      });
    }

    // Public website: ONLY show active jobs
    query.status = 'active';

    if (department && department !== 'All') {
      query.department = department;
    } else if (category && category !== 'All') {
      query.$or = [
        { category: new RegExp(category, 'i') },
        { department: new RegExp(category, 'i') },
      ];
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { category: searchRegex },
        { department: searchRegex },
        { desc: searchRegex },
      ];
    }

    const publicJobs = await Job.find(query).sort({ createdAt: -1 });

    const formattedPublicJobs = publicJobs.map((j) => ({
      id: j._id.toString(),
      _id: j._id.toString(),
      title: j.title,
      department: j.department,
      category: j.category || j.department,
      location: j.location,
      type: j.type,
      posted: j.createdAt
        ? new Date(j.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : j.posted || 'Posted Recently',
      desc: j.desc || j.aboutRole || 'No description provided.',
      aboutRole: j.aboutRole || j.desc || '',
      requirements: j.requirements || j.whoYouAre,
      whoYouAre: j.whoYouAre || j.requirements,
      benefits: j.benefits,
      otherInformation: j.otherInformation || '',
      specialism: j.specialism || j.department,
      focus: j.focus || j.title,
      industry: j.industry || j.department,
      salary: j.salary || 'Negotiable / Competitive',
      workplaceType: j.workplaceType || 'Hybrid',
      experienceLevel: j.experienceLevel || 'Mid Level',
      status: j.status || 'active',
      reference: j.reference || `R4M-${Math.floor(1000 + Math.random() * 9000)}`,
      consultant: j.consultant || 'Admin R4M',
      contactEmail: j.contactEmail || 'admin@r4m.com',
      responsibilities:
        j.responsibilities && j.responsibilities.length > 0
          ? j.responsibilities
          : [
              'Collaborate with department leadership to maintain operational excellence.',
              'Ensure safety and quality compliance across all project deliverables.',
              'Execute daily operational workflows and report progress.',
            ],
    }));

    return res.json(formattedPublicJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// GET applications for a specific job (Clicking the number opens popup list)
router.get('/:id/applications', async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await Application.find({ jobId: id }).sort({ createdAt: -1 });

    const formattedApps = applications.map((app) => ({
      id: app._id.toString(),
      _id: app._id.toString(),
      name: app.name,
      email: app.email,
      phone: app.phone,
      resume: app.resume,
      message: app.message,
      jobTitle: app.jobTitle,
      status: app.status || 'New',
      dateApplied: app.createdAt
        ? new Date(app.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'Recently',
    }));

    res.json(formattedApps);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications for this job' });
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

    const appCount = await Application.countDocuments({ jobId: id });

    const formattedJob = {
      id: job._id.toString(),
      _id: job._id.toString(),
      title: job.title,
      department: job.department,
      category: job.category || job.department,
      location: job.location,
      type: job.type,
      salary: job.salary || 'Negotiable / Competitive',
      experienceLevel: job.experienceLevel || 'Mid Level',
      desc: job.desc || job.aboutRole || 'No description provided.',
      aboutRole: job.aboutRole || job.desc || '',
      requirements: job.requirements || job.whoYouAre || '',
      whoYouAre: job.whoYouAre || job.requirements || [],
      benefits: job.benefits || '',
      otherInformation: job.otherInformation || '',
      status: job.status || 'active',
      applicationsCount: appCount,
      datePosted: job.createdAt
        ? new Date(job.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : job.posted || 'Posted Recently',
      posted: job.createdAt
        ? new Date(job.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : job.posted || 'Posted Recently',
      specialism: job.specialism || job.department,
      focus: job.focus || job.title,
      industry: job.industry || job.department,
      workplaceType: job.workplaceType || 'Hybrid',
      reference: job.reference || `R4M-${Math.floor(1000 + Math.random() * 9000)}`,
      consultant: job.consultant || 'Admin R4M',
      contactEmail: job.contactEmail || 'admin@r4m.com',
      responsibilities:
        job.responsibilities && job.responsibilities.length > 0
          ? job.responsibilities
          : [
              'Collaborate with department leadership to maintain operational excellence.',
              'Ensure safety and quality compliance across all project deliverables.',
              'Execute daily operational workflows and report progress.',
            ],
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

    // Verify job status: Reject if inactive
    if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
      const targetJob = await Job.findById(jobId);
      if (targetJob && targetJob.status === 'inactive') {
        return res.status(400).json({
          error: 'This job posting is inactive and is no longer accepting applications.',
        });
      }
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
  return router.handle({ ...req, url: '/apply', originalUrl: req.originalUrl }, res);
});

// POST /api/jobs - Create a new job posting with sanitized rich text & status
router.post('/', async (req, res) => {
  try {
    const {
      title,
      reference,
      department,
      location,
      type,
      workplaceType,
      specialism,
      focus,
      industry,
      salary,
      experienceLevel,
      description,
      desc,
      responsibilities,
      requirements,
      benefits,
      consultant,
      contactEmail,
      otherInformation,
      status,
    } = req.body;

    if (!title || !location || !department || !type) {
      return res.status(400).json({
        message: 'Job Title, Department, Job Type, and Location are required.',
      });
    }

    const rawDescription = description || desc || '';
    if (!rawDescription) {
      return res.status(400).json({ message: 'Job Description is required.' });
    }

    if (!requirements) {
      return res.status(400).json({ message: 'Requirements are required.' });
    }

    // Sanitize rich text inputs before saving
    const sanitizedDesc = cleanHtml(rawDescription);
    const sanitizedReqs = cleanHtml(requirements);
    const sanitizedBenefits = cleanHtml(benefits || '');
    const parsedResponsibilities = parseListItems(responsibilities);

    const normalizedStatus =
      status && status.toLowerCase() === 'inactive' ? 'inactive' : 'active';

    const generatedRef =
      reference && reference.trim()
        ? reference.trim().toUpperCase()
        : `R4M-${department ? department.slice(0, 3).toUpperCase() : 'JOB'}-${Math.floor(100 + Math.random() * 900)}`;

    const newJob = await Job.create({
      title: title.trim(),
      reference: generatedRef,
      department: department.trim(),
      category: department.trim(),
      location: location.trim(),
      type: type.trim(),
      workplaceType: workplaceType ? workplaceType.trim() : 'Hybrid',
      specialism: specialism ? specialism.trim() : '',
      focus: focus ? focus.trim() : '',
      industry: industry ? industry.trim() : department.trim(),
      salary: salary ? salary.trim() : '',
      experienceLevel: experienceLevel ? experienceLevel.trim() : '',
      desc: sanitizedDesc,
      aboutRole: sanitizedDesc,
      responsibilities: parsedResponsibilities,
      requirements: sanitizedReqs,
      whoYouAre: sanitizedReqs,
      benefits: sanitizedBenefits,
      consultant: consultant ? consultant.trim() : 'Richard Meneses',
      contactEmail: contactEmail ? contactEmail.trim() : 'admin@r4m.com',
      otherInformation: otherInformation ? otherInformation.trim() : '',
      status: normalizedStatus,
      posted: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });

    res.status(201).json({
      success: true,
      message: 'Job posting published successfully',
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

// PUT /api/jobs/:id - Update existing job posting with sanitized rich text
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      reference,
      department,
      location,
      type,
      workplaceType,
      specialism,
      focus,
      industry,
      salary,
      experienceLevel,
      description,
      desc,
      responsibilities,
      requirements,
      benefits,
      consultant,
      contactEmail,
      otherInformation,
      status,
    } = req.body;

    if (!title || !location || !department || !type) {
      return res.status(400).json({
        message: 'Job Title, Department, Job Type, and Location are required.',
      });
    }

    const rawDescription = description || desc || '';
    if (!rawDescription) {
      return res.status(400).json({ message: 'Job Description is required.' });
    }

    if (!requirements) {
      return res.status(400).json({ message: 'Requirements are required.' });
    }

    // Sanitize rich text inputs
    const sanitizedDesc = cleanHtml(rawDescription);
    const sanitizedReqs = cleanHtml(requirements);
    const sanitizedBenefits = cleanHtml(benefits || '');

    const updateData = {
      title: title.trim(),
      department: department.trim(),
      category: department.trim(),
      location: location.trim(),
      type: type.trim(),
      salary: salary ? salary.trim() : '',
      experienceLevel: experienceLevel ? experienceLevel.trim() : '',
      desc: sanitizedDesc,
      aboutRole: sanitizedDesc,
      requirements: sanitizedReqs,
      whoYouAre: sanitizedReqs,
      benefits: sanitizedBenefits,
      otherInformation: otherInformation ? otherInformation.trim() : '',
    };

    if (reference) updateData.reference = reference.trim().toUpperCase();
    if (workplaceType) updateData.workplaceType = workplaceType.trim();
    if (specialism !== undefined) updateData.specialism = specialism.trim();
    if (focus !== undefined) updateData.focus = focus.trim();
    if (industry !== undefined) updateData.industry = industry.trim();
    if (consultant !== undefined) updateData.consultant = consultant.trim();
    if (contactEmail !== undefined) updateData.contactEmail = contactEmail.trim();

    if (responsibilities !== undefined) {
      updateData.responsibilities = parseListItems(responsibilities);
    }

    if (status) {
      updateData.status = status.toLowerCase() === 'inactive' ? 'inactive' : 'active';
    }

    let updatedJob = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });
    }

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job posting not found to update' });
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

// PATCH /api/jobs/:id/status - Toggle active/inactive status quickly
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }

    const newStatus = status ? status.toLowerCase() : 'active';
    if (!['active', 'inactive'].includes(newStatus)) {
      return res.status(400).json({ message: 'Status must be active or inactive' });
    }

    const job = await Job.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    res.json({
      success: true,
      message: `Job status updated to ${newStatus}`,
      status: job.status,
    });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ message: 'Failed to update job status' });
  }
});

// POST /api/jobs/bulk - Bulk actions (Set Active, Set Inactive, Delete Selected)
router.post('/bulk', async (req, res) => {
  try {
    const { action, ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Please select at least one job.' });
    }

    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0) {
      return res.status(400).json({ message: 'No valid job IDs provided.' });
    }

    if (action === 'activate' || action === 'setActive') {
      await Job.updateMany({ _id: { $in: validIds } }, { status: 'active' });
      return res.json({
        success: true,
        message: `${validIds.length} job(s) set to Active.`,
      });
    }

    if (action === 'deactivate' || action === 'setInactive') {
      await Job.updateMany({ _id: { $in: validIds } }, { status: 'inactive' });
      return res.json({
        success: true,
        message: `${validIds.length} job(s) set to Inactive.`,
      });
    }

    if (action === 'delete') {
      await Job.deleteMany({ _id: { $in: validIds } });
      return res.json({
        success: true,
        message: `${validIds.length} job(s) deleted permanently.`,
      });
    }

    return res.status(400).json({ message: 'Invalid bulk action specified.' });
  } catch (error) {
    console.error('Error executing bulk job action:', error);
    res.status(500).json({ message: 'Failed to execute bulk action' });
  }
});

// DELETE /api/jobs/:id - Delete single job posting
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
