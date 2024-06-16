import mongoose from "mongoose";

// create schema
const SongSchema = new mongoose.Schema(
    {
        singerId: String,
        topicId: String,
        title: String,
        description: String,
        lyrics: String,
        audio: String, 
        avatar: String,
        slug: String, // slug phục vụ cho tìm kiếm và SEO
        listen: Number, // lượt nghe, có thể sau này lưu vô collection
        like: String, // lưu tạm, sau này lưu vô collection khác luôn
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
const Song = mongoose.model('Song', SongSchema, 'songs');

// export
export default Song;