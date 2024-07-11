import mongoose from "mongoose";

// create shcema
const TopicSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        avatar: String,
        position: Number,
        slug: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// create model
const Topic = mongoose.model('Topic', TopicSchema, 'topics');

// export
export default Topic;
