import mongoose from "mongoose";

// create Schema
const ForgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 0,
        default: 0
    }
});

// create Model
const ForgotPassword = mongoose.model('ForgotPassword', ForgotPasswordSchema, 'forgot-password');

// export
export default ForgotPassword;