import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Industry Trends',
    },
    author: {
      type: String,
      default: 'Admin R4M',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
    },
    coverImage: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    content: [
      {
        type: String,
      },
    ],
    date: {
      type: String,
      default: 'Posted Recently',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    keyTakeaways: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
