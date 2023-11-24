//user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be empty"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Email format is not correct",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    name: {
        type: String,
        required: [true, "Fullname is required"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
    },
    deviceID: {
        type: String,
        required: [true, "Device name is required"],
        ref: 'devices'
    },
}, { timestamps: true });

// Used while encrypting the user entered password
userSchema.pre("save", async function () {
    var user = this;
    if (!user.isModified("password")) {
        return
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        throw err;
    }
});
//used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;