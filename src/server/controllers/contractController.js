
const Contract = require('../models/contractModel');
const User = require('../models/userModel');
const logger = require('../utils/logger');

// @desc    Get all contracts for the logged-in user
// @route   GET /api/contracts
// @access  Private
const getContracts = async (req, res) => {
  try {
    const { status, crop, search, sortBy, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Filter by user role (farmer or buyer)
    if (req.user.role === 'farmer') {
      query.farmer = req.user.id;
    } else if (req.user.role === 'buyer') {
      query.buyer = req.user.id;
    }
    
    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by crop if provided
    if (crop) {
      query.crop = crop;
    }
    
    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Build sort options
    let sortOptions = {};
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    } else {
      // Default sort by created date, newest first
      sortOptions = { createdAt: -1 };
    }
    
    // Execute query with pagination
    const contracts = await Contract.find(query)
      .populate('farmer', 'name email')
      .populate('buyer', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Contract.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: contracts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      contracts,
    });
  } catch (error) {
    logger.error(`Error in getContracts: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single contract by ID
// @route   GET /api/contracts/:id
// @access  Private
const getContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('farmer', 'name email phone farmDetails')
      .populate('buyer', 'name email phone companyDetails')
      .populate('messages.sender', 'name email role')
      .populate('disputeDetails.raisedBy', 'name email role');
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to view this contract
    if (
      contract.farmer._id.toString() !== req.user.id &&
      contract.buyer._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this contract',
      });
    }
    
    res.status(200).json({
      success: true,
      contract,
    });
  } catch (error) {
    logger.error(`Error in getContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create new contract
// @route   POST /api/contracts
// @access  Private
const createContract = async (req, res) => {
  try {
    const {
      title,
      description,
      farmerId,
      buyerId,
      crop,
      quantity,
      quantityUnit,
      price,
      priceUnit,
      paymentTerms,
      qualityStandards,
      deliveryDetails,
      additionalTerms,
    } = req.body;
    
    // Determine farmer and buyer based on user role
    let farmer, buyer;
    
    if (req.user.role === 'farmer') {
      farmer = req.user.id;
      buyer = buyerId;
    } else if (req.user.role === 'buyer') {
      farmer = farmerId;
      buyer = req.user.id;
    } else {
      // Admin can specify both
      farmer = farmerId;
      buyer = buyerId;
    }
    
    // Calculate total value
    const totalValue = (
      price.unit === 'total' ? price.value :
      price.value * quantity.value
    );
    
    // Create initial timeline
    const timeline = [
      {
        event: 'Contract Created',
        date: new Date(),
        description: 'Contract has been created and is waiting for signatures',
        completed: true,
      },
      {
        event: 'Contract Signed',
        date: null,
        description: 'Contract needs to be signed by both parties',
        completed: false,
      },
    ];
    
    // Create contract
    const contract = await Contract.create({
      title,
      description,
      farmer,
      buyer,
      crop,
      quantity: {
        value: quantity,
        unit: quantityUnit,
      },
      price: {
        value: price,
        unit: priceUnit,
      },
      totalValue,
      paymentTerms,
      qualityStandards,
      deliveryDetails,
      additionalTerms,
      status: 'draft',
      timeline,
    });
    
    res.status(201).json({
      success: true,
      contract,
    });
  } catch (error) {
    logger.error(`Error in createContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update contract
// @route   PUT /api/contracts/:id
// @access  Private
const updateContract = async (req, res) => {
  try {
    let contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to update this contract
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this contract',
      });
    }
    
    // Can only update if contract is in draft state
    if (contract.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update contract after it has been signed',
      });
    }
    
    // Update contract
    contract = await Contract.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      contract,
    });
  } catch (error) {
    logger.error(`Error in updateContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete contract
// @route   DELETE /api/contracts/:id
// @access  Private
const deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to delete this contract
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this contract',
      });
    }
    
    // Can only delete if contract is in draft state
    if (contract.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete contract after it has been signed',
      });
    }
    
    await contract.remove();
    
    res.status(200).json({
      success: true,
      message: 'Contract deleted successfully',
    });
  } catch (error) {
    logger.error(`Error in deleteContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Sign a contract
// @route   POST /api/contracts/:id/sign
// @access  Private
const signContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to sign this contract
    const isFarmer = contract.farmer.toString() === req.user.id;
    const isBuyer = contract.buyer.toString() === req.user.id;
    
    if (!isFarmer && !isBuyer) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to sign this contract',
      });
    }
    
    // Update signature status
    if (isFarmer) {
      contract.signedByFarmer = true;
    } else if (isBuyer) {
      contract.signedByBuyer = true;
    }
    
    // If both parties have signed, update status to active
    if (contract.signedByFarmer && contract.signedByBuyer) {
      contract.status = 'active';
      
      // Update timeline
      const signedTimelineItem = contract.timeline.find(item => item.event === 'Contract Signed');
      if (signedTimelineItem) {
        signedTimelineItem.date = new Date();
        signedTimelineItem.completed = true;
      }
      
      // Add payment timeline item if advance payment is required
      if (contract.advancePayment && contract.advancePayment.percentage > 0) {
        contract.timeline.push({
          event: 'Advance Payment Due',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          description: `${contract.advancePayment.percentage}% advance payment of ${contract.advancePayment.amount} is due`,
          completed: false,
        });
      }
    }
    
    await contract.save();
    
    res.status(200).json({
      success: true,
      message: 'Contract signed successfully',
      contract,
    });
  } catch (error) {
    logger.error(`Error in signContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Raise a dispute on contract
// @route   POST /api/contracts/:id/dispute
// @access  Private
const disputeContract = async (req, res) => {
  try {
    const { reason, description } = req.body;
    
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to raise dispute on this contract
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to raise dispute on this contract',
      });
    }
    
    // Update contract status and dispute details
    contract.status = 'dispute';
    contract.disputeDetails = {
      raisedBy: req.user.id,
      reason,
      description,
      raisedAt: new Date(),
      status: 'pending',
    };
    
    // Add to timeline
    contract.timeline.push({
      event: 'Dispute Raised',
      date: new Date(),
      description: `Dispute raised: ${reason}`,
      completed: true,
    });
    
    await contract.save();
    
    res.status(200).json({
      success: true,
      message: 'Dispute raised successfully',
      contract,
    });
  } catch (error) {
    logger.error(`Error in disputeContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Resolve a dispute
// @route   PUT /api/contracts/:id/resolve-dispute
// @access  Private
const resolveDispute = async (req, res) => {
  try {
    const { resolution, newStatus } = req.body;
    
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if contract is in dispute status
    if (contract.status !== 'dispute') {
      return res.status(400).json({
        success: false,
        message: 'Contract is not in dispute state',
      });
    }
    
    // Check if user is authorized to resolve dispute
    // Only the party that didn't raise the dispute or an admin can resolve
    const disputeRaisedBy = contract.disputeDetails.raisedBy.toString();
    
    if (
      disputeRaisedBy === req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'The party that raised the dispute cannot resolve it',
      });
    }
    
    // Update contract
    contract.status = newStatus || 'active';
    contract.disputeDetails.resolution = resolution;
    contract.disputeDetails.resolvedAt = new Date();
    contract.disputeDetails.status = 'resolved';
    
    // Add to timeline
    contract.timeline.push({
      event: 'Dispute Resolved',
      date: new Date(),
      description: `Dispute resolved: ${resolution}`,
      completed: true,
    });
    
    await contract.save();
    
    res.status(200).json({
      success: true,
      message: 'Dispute resolved successfully',
      contract,
    });
  } catch (error) {
    logger.error(`Error in resolveDispute: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Add message to contract
// @route   POST /api/contracts/:id/messages
// @access  Private
const addMessage = async (req, res) => {
  try {
    const { content } = req.body;
    
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to send message on this contract
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send message on this contract',
      });
    }
    
    // Add message
    contract.messages.push({
      sender: req.user.id,
      content,
      timestamp: new Date(),
      readBy: [{ user: req.user.id, readAt: new Date() }],
    });
    
    await contract.save();
    
    // Populate sender info for the response
    const message = contract.messages[contract.messages.length - 1];
    await User.populate(message, { path: 'sender', select: 'name email role' });
    
    res.status(200).json({
      success: true,
      message: 'Message added successfully',
      data: message,
    });
  } catch (error) {
    logger.error(`Error in addMessage: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Upload document to contract
// @route   POST /api/contracts/:id/documents
// @access  Private
const uploadDocument = async (req, res) => {
  try {
    // In a real implementation, this would handle file upload with multer
    const { name, type, url } = req.body;
    
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to upload document on this contract
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to upload document on this contract',
      });
    }
    
    // Add document
    contract.documents.push({
      name,
      type,
      url,
      uploadedAt: new Date(),
      uploadedBy: req.user.id,
    });
    
    await contract.save();
    
    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      document: contract.documents[contract.documents.length - 1],
    });
  } catch (error) {
    logger.error(`Error in uploadDocument: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get documents for a contract
// @route   GET /api/contracts/:id/documents
// @access  Private
const getDocuments = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .select('documents')
      .populate('documents.uploadedBy', 'name email role');
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to view documents for this contract
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view documents for this contract',
      });
    }
    
    res.status(200).json({
      success: true,
      count: contract.documents.length,
      documents: contract.documents,
    });
  } catch (error) {
    logger.error(`Error in getDocuments: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update delivery status
// @route   PUT /api/contracts/:id/delivery
// @access  Private
const updateDeliveryStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Check if user is authorized to update delivery status
    if (
      contract.farmer.toString() !== req.user.id &&
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update delivery status',
      });
    }
    
    // Add to timeline
    contract.timeline.push({
      event: `Delivery ${status}`,
      date: new Date(),
      description: notes || `Delivery status updated to ${status}`,
      completed: true,
    });
    
    // If delivery is completed, update contract status
    if (status === 'completed') {
      // Add timeline item for quality check
      contract.timeline.push({
        event: 'Quality Check',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        description: 'Quality check needs to be performed',
        completed: false,
      });
    }
    
    await contract.save();
    
    res.status(200).json({
      success: true,
      message: 'Delivery status updated successfully',
      contract,
    });
  } catch (error) {
    logger.error(`Error in updateDeliveryStatus: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Mark contract as complete
// @route   PUT /api/contracts/:id/complete
// @access  Private
const completeContract = async (req, res) => {
  try {
    const { actualQuantity, qualityAssessment, issues } = req.body;
    
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found',
      });
    }
    
    // Only buyer or admin can mark contract as complete
    if (
      contract.buyer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Only the buyer or admin can mark a contract as complete',
      });
    }
    
    // Update contract status and final report
    contract.status = 'completed';
    contract.finalReport = {
      actualQuantity,
      qualityAssessment,
      issues,
      completionDate: new Date(),
    };
    
    // Add to timeline
    contract.timeline.push({
      event: 'Contract Completed',
      date: new Date(),
      description: 'All terms fulfilled and contract marked as complete',
      completed: true,
    });
    
    await contract.save();
    
    res.status(200).json({
      success: true,
      message: 'Contract marked as complete',
      contract,
    });
  } catch (error) {
    logger.error(`Error in completeContract: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get contract statistics
// @route   GET /api/contracts/statistics
// @access  Private
const getContractStatistics = async (req, res) => {
  try {
    let matchQuery = {};
    
    // Filter by user role (farmer or buyer)
    if (req.user.role === 'farmer') {
      matchQuery.farmer = mongoose.Types.ObjectId(req.user.id);
    } else if (req.user.role === 'buyer') {
      matchQuery.buyer = mongoose.Types.ObjectId(req.user.id);
    }
    
    const stats = await Contract.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$totalValue' },
        },
      },
    ]);
    
    // Transform to more user-friendly format
    const result = {
      totalContracts: 0,
      totalValue: 0,
      byStatus: {},
    };
    
    stats.forEach((stat) => {
      result.totalContracts += stat.count;
      result.totalValue += stat.totalValue;
      result.byStatus[stat._id] = {
        count: stat.count,
        value: stat.totalValue,
      };
    });
    
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error(`Error in getContractStatistics: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
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
};
