//folder name controller
//dashboard.controller.js

const GasDataModel = require('../models/gasdata.model');
const UserModel = require('../models/user.model');

exports.getDashboardData = async (req, res, next) => {
  try {
    console.log('Received request to get dashboard data:', req.query);

    const { email } = req.user; // Assuming you set user information in the request during authentication

    // Fetch user details to get associated deviceID
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, error: 'User not found' });
    }

    const { deviceID } = user;

    // Fetch gas data for the identified deviceID
    const gasData = await GasDataModel.find({deviceID });

    res.status(200).json({ status: true, gasData });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};
