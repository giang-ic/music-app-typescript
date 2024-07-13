import mongoose, { Schema } from "mongoose";

// create Schema
const SingerSchema = new mongoose.Schema(
    {
        fullName: String,
        avatar: String,
        status: String,
        position: Number,
        createdBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

// create model
const Singer = mongoose.model('Singer', SingerSchema, 'singers');

// export
export default Singer;