require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middleware/auth.middleware');
const User = require('./models/user.model');

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

app.use('/api/auth', authRoutes);
app.get('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      message: 'Profile fetched successfully',
      user: {
        fullName: user.fullName,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching profile' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));