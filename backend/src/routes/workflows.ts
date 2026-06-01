/**
 * WORKFLOW ROUTES
 * CRUD operations for workflows
 */

import express from 'express';

const router = express.Router();

// Get all workflows
router.get('/', (req, res) => {
  // TODO: Implement get all workflows
  res.status(200).json({ message: 'Get workflows - TODO' });
});

// Create workflow
router.post('/', (req, res) => {
  // TODO: Implement create workflow
  res.status(201).json({ message: 'Create workflow - TODO' });
});

// Get specific workflow
router.get('/:id', (req, res) => {
  // TODO: Implement get workflow by id
  res.status(200).json({ message: 'Get workflow - TODO' });
});

// Update workflow
router.put('/:id', (req, res) => {
  // TODO: Implement update workflow
  res.status(200).json({ message: 'Update workflow - TODO' });
});

// Delete workflow
router.delete('/:id', (req, res) => {
  // TODO: Implement delete workflow
  res.status(200).json({ message: 'Delete workflow - TODO' });
});

export default router;
