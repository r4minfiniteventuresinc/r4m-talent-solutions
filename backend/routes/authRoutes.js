import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Admin Login API endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    // Fallback for plain text password comparison during initial seed testing
    const isValid = isMatch || password === user.password;

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'r4m_secret_key_2026',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName || 'Admin',
        lastName: user.lastName || 'R4M',
        name: user.name || 'Admin R4M',
        email: user.email,
        phone: user.phone || '+63 918 647 9352',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
});

// GET admin profile details
router.get('/profile', async (req, res) => {
  try {
    let user = await User.findOne({ role: 'admin' });
    if (!user) {
      user = await User.findOne();
    }

    if (!user) {
      return res.status(404).json({ message: 'Admin profile not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName || 'Admin',
        lastName: user.lastName || 'R4M',
        name: user.name || `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || '+63 918 647 9352',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// PUT update admin profile details (All fields optional, password change optional)
router.put('/profile', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, avatar, currentPassword, newPassword, confirmPassword } = req.body;

    let user = await User.findOne({ role: 'admin' });
    if (!user) {
      user = await User.findOne();
    }

    if (!user) {
      return res.status(404).json({ message: 'User account not found' });
    }

    // Update optional text fields if provided
    if (firstName !== undefined && firstName.trim() !== '') user.firstName = firstName.trim();
    if (lastName !== undefined && lastName.trim() !== '') user.lastName = lastName.trim();
    if (firstName || lastName) {
      user.name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    if (email !== undefined && email.trim() !== '') user.email = email.toLowerCase().trim();
    if (phone !== undefined && phone.trim() !== '') user.phone = phone.trim();
    if (avatar !== undefined && avatar.trim() !== '') user.avatar = avatar.trim();

    // Optional password update
    if (newPassword && newPassword.trim() !== '') {
      if (confirmPassword && newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New passwords do not match' });
      }

      // If current password is provided, verify it
      if (currentPassword && currentPassword.trim() !== '') {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch && currentPassword !== user.password) {
          return res.status(400).json({ message: 'Current password is incorrect' });
        }
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

export default router;
