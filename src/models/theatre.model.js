import mongoose, { Schema } from "mongoose";

const theatreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
},
{timestamps: true}
)

export const Theatre = mongoose.model("Theatre", theatreSchema);
