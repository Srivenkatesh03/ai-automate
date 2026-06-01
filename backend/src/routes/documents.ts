/**
 * DOCUMENT ROUTES
 * File uploads, parsing, and AI processing
 */

import express from 'express';

const router = express.Router();

// Upload document
router.post('/upload', (req, res) => {
  // TODO: Implement document upload
  res.status(200).json({ message: 'Upload document - TODO' });
});

// Get document
router.get('/:id', (req, res) => {
  // TODO: Implement get document
  res.status(200).json({ message: 'Get document - TODO' });
});

// Process document with AI
router.post('/:id/process', (req, res) => {
  // TODO: Implement document processing
  res.status(200).json({ message: 'Process document - TODO' });
});

export default router;
