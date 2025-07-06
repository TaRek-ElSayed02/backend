const menuService = require('../services/menu.service');

exports.createMenuItem = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.subdomain) {
      return res.status(400).json({
        success: false,
        message: 'name and subdomain are required'
      });
    }

    // Validate price if provided
    if (req.body.price && isNaN(req.body.price)) {
      return res.status(400).json({
        success: false,
        message: 'price must be a number'
      });
    }

    // Validate active field if provided
    if (req.body.active && !['yes', 'no'].includes(req.body.active)) {
      return res.status(400).json({
        success: false,
        message: 'active must be either "yes" or "no"'
      });
    }

    const menuItem = await menuService.createMenuItem(req.body);
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating menu item',
      error: error.message
    });
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuService.getAllMenuItems();
    res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message
    });
  }
};

exports.getMenuItemsBySubdomain = async (req, res) => {
  try {
    const menuItems = await menuService.getMenuItemsBySubdomain(req.params.subdomain);
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No menu items found for this subdomain'
      });
    }
    res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Validate price if provided
    if (updateData.price && isNaN(updateData.price)) {
      return res.status(400).json({
        success: false,
        message: 'price must be a number'
      });
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

    const updated = await menuService.updateMenuItem(id, updateData);
    
    if (updated.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      updatedFields: Object.keys(updateData)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating menu item',
      error: error.message
    });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const deleted = await menuService.deleteMenuItem(req.params.id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting menu item',
      error: error.message
    });
  }
};