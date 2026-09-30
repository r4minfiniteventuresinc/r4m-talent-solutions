import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      default: 'Logistics & Supply Chain',
    },
    category: {
      type: String,
      default: 'Logistics',
    },
    location: {
      type: String,
      required: true,
      default: 'Metro Manila, Philippines',
    },
    type: {
      type: String,
      required: true,
      default: 'Full-Time',
    },
    desc: {
      type: String,
      default: '',
    },
    aboutRole: {
      type: String,
      default: '',
    },
    specialism: {
      type: String,
      default: '',
    },
    focus: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: '',
    },
    salary: {
      type: String,
      default: 'Negotiable / Competitive',
    },
    workplaceType: {
      type: String,
      default: 'Hybrid',
    },
    experienceLevel: {
      type: String,
      default: 'Mid Level',
    },
    reference: {
      type: String,
      default: 'R4M-8001',
    },
    posted: {
      type: String,
      default: 'Posted Recently',
    },
    consultant: {
      type: String,
      default: 'Admin R4M',
    },
    contactEmail: {
      type: String,
      default: 'admin@r4m.com',
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    whoYouAre: [
      {
        type: String,
      },
    ],
    benefits: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Closed'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
