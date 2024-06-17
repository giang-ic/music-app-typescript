import mongoose, { Model, Schema } from "mongoose";

// create Schema
const UserSchema = new mongoose.Schema(
    {
        tokenUser: String,
        avatar: String,
        fullName: String,
        email: String,
        password: String,
        tel: String,
        sex: String,
        birth: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },{
        timestamps: true
    }
);

// create Model
const User = mongoose.model('User', UserSchema, 'users');

// export
export default User;