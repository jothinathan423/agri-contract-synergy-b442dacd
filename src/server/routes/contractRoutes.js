
const express = require('express');
const { 
  getContracts,
  getContract,
  createContract,
  updateContract,
  deleteContract,
  signContract,
  disputeContract,
  resolveDispute,
  addMessage,
  uploadDocument,
  getDocuments,
  updateDeliveryStatus,
  completeContract,
  getContractStatistics,
} = require('../controllers/contractController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// GET all contracts for the logged-in user
router.get('/', getContracts);

// GET contract statistics
router.get('/statistics', getContractStatistics);

// GET single contract by ID
router.get('/:id', getContract);

// POST create new contract
router.post('/', createContract);

// PUT update contract
router.put('/:id', updateContract);

// DELETE contract
router.delete('/:id', deleteContract);

// POST sign a contract
router.post('/:id/sign', signContract);

// POST dispute a contract
router.post('/:id/dispute', disputeContract);

// PUT resolve a dispute
router.put('/:id/resolve-dispute', resolveDispute);

// POST add a message to contract
router.post('/:id/messages', addMessage);

// POST upload document to contract
router.post('/:id/documents', uploadDocument);

// GET documents for a contract
router.get('/:id/documents', getDocuments);

// PUT update delivery status
router.put('/:id/delivery', updateDeliveryStatus);

// PUT mark contract as complete
router.put('/:id/complete', completeContract);

module.exports = router;
