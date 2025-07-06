const commentsService = require('../services/comments.service');

exports.createComment = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.comment || !req.body.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'comment and subdomain are required'
      });
    }

    // Validate rate if provided (should be between 1 and 5)
    if (req.body.rate && (req.body.rate < 1 || req.body.rate > 5)) {
      return res.status(400).json({
        success: false,
        message: 'rate must be between 1 and 5'
      });
    }

    // Validate status field if provided
    if (req.body.status && !['pending', 'approved', 'rejected'].includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: 'status must be either "pending" or "approved" or "rejected"'
      });
    }

    const comment = await commentsService.createComment(req.body);
    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error.message
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentsService.getAllComments();
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

exports.getCommentsBySubdomain = async (req, res) => {
  try {
    const comments = await commentsService.getCommentsBySubdomain(req.params.subdomain);
    if (!comments || comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No comments found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Validate rate if provided
    if (updateData.rate && (updateData.rate < 1 || updateData.rate > 5)) {
      return res.status(400).json({
        success: false,
        message: 'rate must be between 1 and 5'
      });
    }

    // Validate status field if provided
    if (updateData.status && !['pending', 'approved', 'rejected'].includes(updateData.status)) {
      return res.status(400).json({
        success: false,
        message: 'status must be either "pending" or "approved" or "rejected"'
      });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }

    const updated = await commentsService.updateComment(id, updateData);
    
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating comment',
      error: error.message
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deleted = await commentsService.deleteComment(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
};