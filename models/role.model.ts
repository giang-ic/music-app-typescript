import mongoose from "mongoose";
import { permission } from "process";

// create shcema
const RoleSchema = new mongoose.Schema({
        title: String,
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },{
        timestamps: true
    }
);

// define model
const Role = mongoose.model('Role', RoleSchema, 'models');

// export
export default Role;