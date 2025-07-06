const socialMediaService = require('../services/social_media.service');

exports.createSocialMedia = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.platform_name || !req.body.link || !req.body.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'platform_name, link, and subdomain are required'
      });
    }

    // Validate link format
    if (!isValidUrl(req.body.link)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format for link'
      });
    }

    const socialMedia = await socialMediaService.createSocialMedia(req.body);
    res.status(201).json({
      success: true,
      message: 'Social media link created successfully',
      data: socialMedia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating social media link',
      error: error.message
    });
  }
};

// Helper function to validate URLs
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

exports.getAllSocialMedia = async (req, res) => {
  try {
    const socialMedia = await socialMediaService.getAllSocialMedia();
    res.status(200).json({
      success: true,
      data: socialMedia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching social media links',
      error: error.message
    });
  }
};

exports.getSocialMediaBySubdomain = async (req, res) => {
  try {
    const socialMedia = await socialMediaService.getSocialMediaBySubdomain(req.params.subdomain);
    if (!socialMedia || socialMedia.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No social media links found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: socialMedia
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching social media links',
      error: error.message
    });
  }
};

exports.updateSocialMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Validate link format if provided
    if (updateData.link && !isValidUrl(updateData.link)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format for link'
      });
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }

    const updated = await socialMediaService.updateSocialMedia(id, updateData);
    
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Social media link not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Social media link updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating social media link',
      error: error.message
    });
  }
};

exports.deleteSocialMedia = async (req, res) => {
  try {
    const deleted = await socialMediaService.deleteSocialMedia(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Social media link not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Social media link deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting social media link',
      error: error.message
    });
  }
};