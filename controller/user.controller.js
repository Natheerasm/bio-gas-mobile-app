// user.controller.js
const DeviceModel = require('../models/device.model');
const UserServices = require('../services/user.service');

exports.register = async (req, res, next) => {
    try {
        const { email, password, name, phoneNumber, deviceID } = req.body;

        const response = await UserServices.registerUser({ email, password, name, phoneNumber, deviceID });

        res.json({ status: true, success: 'User registered successfully' });
    } catch (err) {
        // Check for duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({ status: false, error: 'Duplicate key error. Email or deviceID is already in use.' });
        }

        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { emailOrPhoneNumber, password } = req.body;

        if (!emailOrPhoneNumber || !password) {
            throw new Error('Parameters are not correct');
        }

        let user;

        if (emailOrPhoneNumber.includes('@')) {
            user = await UserServices.checkUserByEmail(emailOrPhoneNumber);
        } else {
            user = await UserServices.checkUserByPhoneNumber(emailOrPhoneNumber);
        }

        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token
        let tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h");

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
};


exports.getData = async (req, res, next) => {
    try {
        console.log(req.query)
        const { userId } = req.query;

        const response = await UserServices.getData(userId)

        return res.json({ status: true, response });
    } catch (err) {
        // Check for duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({ status: false, error: 'Duplicate key error. Email or deviceID is already in use.' });
        }

        next(err);
    }
}