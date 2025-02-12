const admin = require('firebase-admin');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { uid, email } = req.body; // Firebase sends this data

  try {
    // Check if the user already exists in MongoDB
    let user = await User.findOne({ firebaseUID: uid });
    if (user) {
      return res.status(200).json({ message: 'User already registered', user });
    }

    // Create a new user in MongoDB
    user = await User.create({
      firebaseUID: uid,
      email: email || 'Anonymous',
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const { token } = req.body; // Frontend sends Firebase ID Token

  try {
    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);

    // Check if user exists in MongoDB
    let user = await User.findOne({ firebaseUID: decoded.uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid Firebase token' });
  }
};

exports.attendees = async (req, res) => {
  const { token } = req.body; // Frontend sends Firebase ID Token

  try {
    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);

    // Check if user exists in MongoDB
    let user = await User.find({ });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User found and sending the user data'});
  } catch (error) {
    res.status(401).json({ error: 'Invalid Firebase token' });
  }
};
