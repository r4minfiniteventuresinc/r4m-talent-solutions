import express from 'express';
import mongoose from 'mongoose';
import Job from '../models/Job.js';

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
