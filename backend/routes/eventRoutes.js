const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const { firebaseAuthMiddleware } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/', firebaseAuthMiddleware, createEvent); 
router.get('/', getEvents);

module.exports = router;
