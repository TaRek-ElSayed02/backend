const mapService = require('../services/map.service');

exports.createMap = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.title || !req.body.link || !req.body.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'title, link, and subdomain are required'
      });
    }

    // Validate active field if provided
    if (req.body.active && !['yes', 'no'].includes(req.body.active)) {
      return res.status(400).json({
        success: false,
        message: 'active must be either "yes" or "no"'
      });
    }

    const map = await mapService.createMap(req.body);
    res.status(201).json({
      success: true,
      message: 'Map created successfully',
      data: map
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating map',
      error: error.message
    });
  }
};

exports.getAllMaps = async (req, res) => {
  try {
    const maps = await mapService.getAllMaps();
    res.status(200).json({
      success: true,
      data: maps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching maps',
      error: error.message
    });
  }
};

exports.getMapsBySubdomain = async (req, res) => {
  try {
    const maps = await mapService.getMapsBySubdomain(req.params.subdomain);
    if (!maps || maps.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No maps found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: maps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching maps',
      error: error.message
    });
  }
};

exports.updateMap = async (req, res) => {
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

    const updated = await mapService.updateMap(id, updateData);
    
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Map not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Map updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating map',
      error: error.message
    });
  }
};

exports.deleteMap = async (req, res) => {
  try {
    const deleted = await mapService.deleteMap(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Map not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Map deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting map',
      error: error.message
    });
  }
};