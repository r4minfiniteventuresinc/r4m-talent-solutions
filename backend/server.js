import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import User from './models/User.js';
import Job from './models/Job.js';
import Article from './models/Article.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 5005;

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/articles', articleRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend API & MongoDB Job Database running',
    timestamp: new Date().toISOString(),
  });
});

// Seed Initial Admin & Jobs if empty
const seedDatabase = async () => {
  try {
    // Seed Admin Account
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin R4M',
        email: 'admin@r4m.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Default Admin Account created: admin@r4m.com / admin123');
    }

    // Seed Initial Jobs into MongoDB Atlas
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      const initialJobs = [
        {
          title: 'Warehouse & Fulfillment Operations Supervisor',
          department: 'Logistics & Supply Chain',
          category: 'Logistics',
          location: 'Quezon City, Metro Manila',
          type: 'Full-Time',
          desc: 'Oversee daily warehouse inventory, forklift operators, material handlers, and last-mile dispatch operations.',
          aboutRole: 'Lead peak distribution center operations, roster management, safety compliance, and fulfillment accuracy.',
          specialism: 'Warehouse & Distribution',
          focus: '3PL Fulfillment & Fleet Operations',
          industry: 'Logistics & Supply Chain',
          salary: '₱35,000 - ₱45,000 / month',
          workplaceType: 'On-Site',
          experienceLevel: 'Mid / Senior Level',
          reference: 'R4M-LOG-101',
          posted: 'Posted Recently',
          consultant: 'Admin R4M',
          contactEmail: 'admin@r4m.com',
          responsibilities: [
            'Supervise daily warehouse shifts, inventory audits, and loading dock activities.',
            'Ensure full adherence to DOLE occupational safety standards and PPE requirements.',
            'Coordinate with freight dispatchers and route planners for on-time distribution.'
          ],
          whoYouAre: [
            'Minimum 3 years experience in 3PL, logistics, or distribution warehouse operations.',
            'Demonstrated leadership managing 20+ frontline staff and forklift operators.',
            'Familiarity with WMS barcode scanning systems and inventory management.'
          ],
          benefits: [
            'HMO Coverage for employee and dependents.',
            'Performance bonus and night differential allowances.',
            'Career progression to Operations Manager.'
          ]
        },
        {
          title: 'Senior Full-Stack Web Engineer',
          department: 'Technology & Digital',
          category: 'Technology',
          location: 'Makati City / Hybrid',
          type: 'Full-Time',
          desc: 'Build scalable enterprise platforms, customer care portals, and cloud microservices.',
          aboutRole: 'Develop responsive frontend interfaces and high-availability backend APIs for enterprise tech clients.',
          specialism: 'Software Engineering',
          focus: 'React, Node.js & Cloud Infrastructure',
          industry: 'Technology & Digital',
          salary: '₱90,000 - ₱120,000 / month',
          workplaceType: 'Hybrid',
          experienceLevel: 'Senior Level',
          reference: 'R4M-TECH-202',
          posted: 'Posted Recently',
          consultant: 'Admin R4M',
          contactEmail: 'admin@r4m.com',
          responsibilities: [
            'Architect RESTful microservices and frontend React applications.',
            'Maintain database optimization and automated testing pipelines.',
            'Mentor junior engineering staff and participate in code reviews.'
          ],
          whoYouAre: [
            '4+ years experience in Full-Stack web development (React, Node, Express, MongoDB).',
            'Strong experience with Git workflows, Docker, and AWS cloud deployment.',
            'Excellent problem-solving mindset and technical communication skills.'
          ],
          benefits: [
            'Flexible hybrid working arrangements.',
            'Comprehensive medical HMO + dental coverage.',
            'Annual continuous learning & technical certification allowance.'
          ]
        },
        {
          title: 'QA / QC Industrial Plant Inspector',
          department: 'Manufacturing',
          category: 'Manufacturing',
          location: 'Calamba, Laguna',
          type: 'Contract',
          desc: 'Execute ISO quality assurance audits, assembly testing, and defect inspection across electronics lines.',
          aboutRole: 'Monitor production lines, perform calibration checks, and maintain ISO compliance records.',
          specialism: 'Quality Control',
          focus: 'Plant Productivity & QA Compliance',
          industry: 'Industrial Manufacturing',
          salary: '₱28,000 - ₱35,000 / month',
          workplaceType: 'On-Site',
          experienceLevel: 'Mid Level',
          reference: 'R4M-MFG-303',
          posted: 'Posted Recently',
          consultant: 'Admin R4M',
          contactEmail: 'admin@r4m.com',
          responsibilities: [
            'Conduct incoming raw material inspections and finished product audits.',
            'Enforce factory safety protocols and ISO 9001 standards.',
            'Document defect logs and report process bottlenecks to plant manager.'
          ],
          whoYouAre: [
            'Degree or diploma in Industrial Engineering or Technical Quality Control.',
            'At least 2 years in manufacturing QA/QC environments.',
            'High attention to detail and precision testing skills.'
          ],
          benefits: [
            'Shuttle service to key Laguna pick-up points.',
            'Complete PPE provisions and medical insurance.',
            'Overtime pay and meal allowances.'
          ]
        },
        {
          title: 'Retail Store Operations Lead',
          department: 'Retail & FMCG',
          category: 'Retail',
          location: 'Taguig City, Metro Manila',
          type: 'Full-Time',
          desc: 'Manage store merchandising, cashier teams, stock inventory, and high-volume customer service.',
          aboutRole: 'Drive retail store performance, planogram visual merchandising, and staff shift scheduling.',
          specialism: 'Store Operations',
          focus: 'Retail & FMCG Customer Service',
          industry: 'Retail & FMCG',
          salary: '₱30,000 - ₱38,000 / month',
          workplaceType: 'On-Site',
          experienceLevel: 'Mid Level',
          reference: 'R4M-RET-404',
          posted: 'Posted Recently',
          consultant: 'Admin R4M',
          contactEmail: 'admin@r4m.com',
          responsibilities: [
            'Lead daily store opening/closing procedures and POS cashier reconciliations.',
            'Coordinate with FMCG merchandisers for stock replenishment.',
            'Train retail associates in customer care and product promotion.'
          ],
          whoYouAre: [
            '2+ years experience in retail store supervisory roles.',
            'Strong background in POS systems and stockroom inventory.',
            'Customer-centric attitude and high energy level.'
          ],
          benefits: [
            'Store performance incentives and commissions.',
            'HMO health benefits.',
            'Employee store discount.'
          ]
        }
      ];

      await Job.insertMany(initialJobs);
      console.log('Seeded initial job listings in MongoDB database!');
    }

    // Seed Initial Articles / Insights into MongoDB Atlas
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      const initialArticles = [
        {
          title: 'Hiring & Workforce Insights: Navigating 2026 Talent Markets',
          category: 'For Businesses',
          author: 'Admin R4M',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
          summary: 'Practical perspectives on recruitment, workforce planning, and business growth.',
          date: 'Sep 26, 2026',
          readTime: '5 min read',
          content: [
            'As organizations navigate an increasingly dynamic business landscape, recruitment strategies are undergoing a fundamental transformation. Today, successful workforce planning requires more than filling immediate vacancies—it demands a strategic approach to long-term talent alignment.',
            'Data-Driven Workforce Planning: Leading enterprises are turning to predictive analytics to anticipate labor shortages and skill gaps before they affect operational output.',
            'The Shift Toward Agile Staffing Models: Modern organizations are blending core full-time teams with flexible, specialized manpower solutions.'
          ],
          keyTakeaways: [
            'Dynamic market conditions demand flexible labor models.',
            'Predictive analytics prevents costly operational staffing bottlenecks.',
            'RPO partnerships accelerate time-to-fill while maintaining quality standards.'
          ]
        },
        {
          title: 'Career Growth & Opportunities in 2026',
          category: 'For Candidates',
          author: 'R4M Insights Team',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
          summary: 'Essential strategies for job seekers to stand out, level up skills, and land high-impact positions.',
          date: 'Sep 20, 2026',
          readTime: '4 min read',
          content: [
            'The modern job market values adaptable professionals who combine specialized technical expertise with strong interpersonal skills.',
            'Highlighting measurable outcomes—such as efficiency improvements, revenue growth, or successful project deployments—instantly sets your profile apart.'
          ],
          keyTakeaways: [
            'Focus resume points on quantifiable business outcomes.',
            'Demonstrate adaptability and continuous learning.',
            'Leverage recruitment partners to access exclusive job openings.'
          ]
        }
      ];

      await Article.insertMany(initialArticles);
      console.log('Seeded initial articles/insights in MongoDB database!');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

app.listen(PORT, async () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  await seedDatabase();
});
