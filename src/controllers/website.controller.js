const websiteService = require('../services/website.service');

exports.createWebsite = async (req, res) => {
  try {


    const websiteData = {
      ...req.body,
      img_hero: req.files?.img_hero?.data || null,
      img_hero_mime_type: req.files?.img_hero?.mimetype || null
    };

    const website = await websiteService.createWebsite(websiteData);
    res.status(201).json({
      success: true,
      message: 'Website created successfully',
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating website',
      error: error.message
    });
  }
};

exports.getAllWebsites = async (req, res) => {
  try {
    const websites = await websiteService.getAllWebsites();
    res.status(200).json({
      success: true,
      data: websites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching websites',
      error: error.message
    });
  }
};

exports.getWebsiteBySubdomain = async (req, res) => {
  try {
    const website = await websiteService.getWebsiteBySubdomain(req.params.subdomain);
    if (!website) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }
    res.status(200).json({
      success: true,
      data: website
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching website',
      error: error.message
    });
  }
};

exports.updateWebsite = async (req, res) => {
  try {
    const websiteData = {
      ...req.body,
      img_hero: req.files?.img_hero?.data || null,
      img_hero_mime_type: req.files?.img_hero?.mimetype || null
    };
    const updated = await websiteService.updateWebsite(req.params.subdomain, websiteData);
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Website updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating website',
      error: error.message
    });
  }
};

exports.deleteWebsite = async (req, res) => {
  try {
    const deleted = await websiteService.deleteWebsite(req.params.subdomain);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Website not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Website deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting website',
      error: error.message
    });
  }
};