// user.service.js
const DeviceModel = require('../models/device.model');
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserServices {
    static async registerUser({ email, password, name, phoneNumber, deviceID }) {
        try {
            // Check if deviceID exists in the DeviceModel
            const existingDevice = await DeviceModel.findOne({ deviceID });

            if (!existingDevice) {
                throw new Error('DeviceID does not exist in the database');
            }

            // Check if deviceID is already associated with a user
            // const existingUser = await UserModel.findOne({ deviceID });

            // if (existingUser) {
            //     throw new Error('DeviceID is already associated with a user');
            // }

            // Implementation for user registration
            const createUser = new UserModel({ email, password, name, phoneNumber, deviceID });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }

    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (err) {
            console.log(err);
        }
    }

    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async checkUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async checkUserByPhoneNumber(phoneNumber) {
        try {
            return await UserModel.findOne({ phoneNumber });
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }

    static async getData(userId) {
        console.log(userId);
        try {
            const data = await UserModel.findById(userId).populate('deviceID')
            console.log(data);
            return data
        } catch (error) {
            return error
        }
    }
}

module.exports = UserServices;
