import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

// create shcema
const TopicSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        avatar: String,
        position: Number,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
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
