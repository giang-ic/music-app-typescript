import mongoose from "mongoose";

// create Schema
const LikeSongSchema = new mongoose.Schema({
    songID: String, 
    userIDs: {
        type: Array,
        default: []
    } // contain  users id liked song
});

// create Model
const LikeSong = mongoose.model('LikeSong', LikeSongSchema, 'likes-song');

// export
export default LikeSong;