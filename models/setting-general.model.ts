import mongoose, { Schema } from "mongoose";

// create Schema
const SettingGeneralSchema = new mongoose.Schema(
    {
        websiteName: String,
        logo: String,
        email: String,
        phone: String,
        address: String,
        copyright: String,
        googleMap: String,
    },
    {
        timestamps: true
    }
);

// create model
const SettingGeneral = mongoose.model('SettingGeneral', SettingGeneralSchema, 'setting-general');

// export
export default SettingGeneral;