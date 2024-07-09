import mongoose from "mongoose";

// create schema 
const AccountSchema = new mongoose.Schema(
    {   
        token: String,
        fullName: String,
        role_id: String,
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dgmm3wigk/image/upload/v1720510481/ofoqvhck7bytjv5m2pp0.jpg"
        },
        email: String,
        password: String,
        tel: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true
    }
);

// define model
const Account = mongoose.model('Account', AccountSchema, 'accounts');

// export
export default Account;