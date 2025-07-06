const timesService = require('../services/times.service');

exports.createTime = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.time_available || !req.body.day_available || !req.body.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'time_available, day_available, and subdomain are required'
      });
    }

    // Validate day_available field
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (!validDays.includes(req.body.day_available)) {
      return res.status(400).json({
        success: false,
        message: 'day_available must be a valid day of the week'
      });
    }

    // Validate active field if provided
    if (req.body.active && !['yes', 'no'].includes(req.body.active)) {
      return res.status(400).json({
        success: false,
        message: 'active must be either "yes" or "no"'
      });
    }

    const time = await timesService.createTime(req.body);
    res.status(201).json({
      success: true,
      message: 'Time availability created successfully',
      data: time
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating time availability',
      error: error.message
    });
  }
};

exports.getAllTimes = async (req, res) => {
  try {
    const times = await timesService.getAllTimes();
    res.status(200).json({
      success: true,
      data: times
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching time availabilities',
      error: error.message
    });
  }
};

exports.getTimesBySubdomain = async (req, res) => {
  try {
    const times = await timesService.getTimesBySubdomain(req.params.subdomain);
    if (!times || times.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No time availabilities found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: times
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching time availabilities',
      error: error.message
    });
  }
};

exports.updateTime = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Validate day_available if provided
    if (updateData.day_available) {
      const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      if (!validDays.includes(updateData.day_available)) {
        return res.status(400).json({
          success: false,
          message: 'day_available must be a valid day of the week'
        });
      }
    }

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

    const updated = await timesService.updateTime(id, updateData);
    
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Time availability not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Time availability updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating time availability',
      error: error.message
    });
  }
};

exports.deleteTime = async (req, res) => {
  try {
    const deleted = await timesService.deleteTime(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Time availability not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Time availability deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting time availability',
      error: error.message
    });
  }
};