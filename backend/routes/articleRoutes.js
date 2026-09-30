import express from 'express';
import mongoose from 'mongoose';
import Article from '../models/Article.js';

const router = express.Router();

// GET all articles
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { summary: searchRegex },
        { category: searchRegex },
        { author: searchRegex },
      ];
    }

    const articles = await Article.find(query).sort({ createdAt: -1 });

    const formattedArticles = articles.map((art) => ({
      id: art._id.toString(),
      _id: art._id.toString(),
      title: art.title,
      category: art.category,
      author: art.author,
      image: art.image || art.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
      coverImage: art.coverImage || art.image || '',
      summary: art.summary || art.subtitle || (Array.isArray(art.content) ? art.content[0] : art.content) || '',
      subtitle: art.subtitle || art.summary || '',
      content: Array.isArray(art.content) && art.content.length > 0 ? art.content : [art.content || ''],
      date: art.date || new Date(art.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: art.readTime || '5 min read',
      keyTakeaways: art.keyTakeaways && art.keyTakeaways.length > 0 ? art.keyTakeaways : [
        'Strategic workforce planning maintains operational continuity.',
        'Leverage specialized insights to scale your team efficiently.'
      ],
    }));

    res.json(formattedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// GET single article by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let article = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      article = await Article.findById(id);
    }

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const formattedArticle = {
      id: article._id.toString(),
      _id: article._id.toString(),
      title: article.title,
      category: article.category,
      author: article.author,
      image: article.image || article.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
      coverImage: article.coverImage || article.image || '',
      summary: article.summary || article.subtitle || (Array.isArray(article.content) ? article.content[0] : article.content) || '',
      subtitle: article.subtitle || article.summary || '',
      content: Array.isArray(article.content) && article.content.length > 0 ? article.content : [article.content || ''],
      date: article.date || new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: article.readTime || '5 min read',
      keyTakeaways: article.keyTakeaways && article.keyTakeaways.length > 0 ? article.keyTakeaways : [
        'Strategic workforce planning maintains operational continuity.',
        'Leverage specialized insights to scale your team efficiently.'
      ],
    };

    res.json(formattedArticle);
  } catch (error) {
    console.error('Error fetching article details:', error);
    res.status(500).json({ message: 'Failed to fetch article details' });
  }
});

// POST create a new article / insight
router.post('/', async (req, res) => {
  try {
    const { title, category, author, coverImage, image, subtitle, summary, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const contentArray = Array.isArray(content)
      ? content
      : typeof content === 'string'
        ? content.split('\n\n').filter(Boolean)
        : [content];

    const newArticle = await Article.create({
      title,
      category: category || 'Industry Trends',
      author: author || 'Admin R4M',
      coverImage: coverImage || image || '',
      image: image || coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
      subtitle: subtitle || summary || '',
      summary: summary || subtitle || (contentArray[0] ? contentArray[0].substring(0, 140) + '...' : ''),
      content: contentArray,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
    });

    res.status(201).json({
      success: true,
      message: 'Article published successfully',
      article: {
        id: newArticle._id.toString(),
        _id: newArticle._id.toString(),
        ...newArticle._doc,
      },
    });
  } catch (error) {
    console.error('Error publishing article:', error);
    res.status(500).json({ message: 'Failed to publish article' });
  }
});

// PUT update article
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, author, coverImage, image, subtitle, summary, content } = req.body;

    const contentArray = Array.isArray(content)
      ? content
      : typeof content === 'string'
        ? content.split('\n\n').filter(Boolean)
        : [content];

    let updatedArticle = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedArticle = await Article.findByIdAndUpdate(
        id,
        {
          title,
          category: category || 'Industry Trends',
          author: author || 'Admin R4M',
          coverImage: coverImage || image || '',
          image: image || coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
          subtitle: subtitle || summary || '',
          summary: summary || subtitle || (contentArray[0] ? contentArray[0].substring(0, 140) + '...' : ''),
          content: contentArray,
        },
        { new: true }
      );
    }

    if (!updatedArticle) {
      updatedArticle = await Article.create({
        title,
        category: category || 'Industry Trends',
        author: author || 'Admin R4M',
        coverImage: coverImage || image || '',
        image: image || coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
        subtitle: subtitle || summary || '',
        summary: summary || subtitle || (contentArray[0] ? contentArray[0].substring(0, 140) + '...' : ''),
        content: contentArray,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '5 min read',
      });
    }

    res.json({
      success: true,
      message: 'Article updated successfully',
      article: {
        id: updatedArticle._id.toString(),
        _id: updatedArticle._id.toString(),
        ...updatedArticle._doc,
      },
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Failed to update article' });
  }
});

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Article.findByIdAndDelete(id);
    }
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Failed to delete article' });
  }
});

export default router;
