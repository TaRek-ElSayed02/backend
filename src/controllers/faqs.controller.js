const faqsService = require('../services/faqs.service');

exports.createFaq = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.question || !req.body.answer || !req.body.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'question, answer, and subdomain are required'
      });
    }

    // Validate active field if provided
    if (req.body.active && !['yes', 'no'].includes(req.body.active)) {
      return res.status(400).json({
        success: false,
        message: 'active must be either "yes" or "no"'
      });
    }

    const faq = await faqsService.createFaq(req.body);
    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating FAQ',
      error: error.message
    });
  }
};

exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await faqsService.getAllFaqs();
    res.status(200).json({
      success: true,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQs',
      error: error.message
    });
  }
};

exports.getFaqsBySubdomain = async (req, res) => {
  try {
    const faqs = await faqsService.getFaqsBySubdomain(req.params.subdomain);
    if (!faqs || faqs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No FAQs found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQs',
      error: error.message
    });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Validate active field if provided
    if (updateData.active && !['yes', 'no'].includes(updateData.active)) {
      return res.status(400).json({
        success: false,
        message: 'active must be either "yes" or "no"'
      });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }

    const updated = await faqsService.updateFaq(id, updateData);
    
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating FAQ',
      error: error.message
    });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const deleted = await faqsService.deleteFaq(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting FAQ',
      error: error.message
    });
  }
};