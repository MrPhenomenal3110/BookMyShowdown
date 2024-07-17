import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shows",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    seats: {
        type: Array,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
