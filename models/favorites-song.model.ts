import mongoose, { mongo } from "mongoose";

// create Schema
const FavoriteSongSchema = new mongoose.Schema({
    songID: String,
    userIDs: {
        type: Array,
        default: []
    }
});

// create Model
const FavoriteSong = mongoose.model('FavoriteSong', FavoriteSongSchema, 'favorites-song');

// export
export default FavoriteSong;