import mongoose, { Schema } from "mongoose";

// create Schema
const SingerSchema = new mongoose.Schema(
    {
        fullName: String,
        avatar: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

// create model
const Singer = mongoose.model('Singer', SingerSchema, 'singers');

// export
export default Singer;