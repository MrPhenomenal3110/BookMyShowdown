import mongoose, { Schema } from "mongoose";

const showSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movies',
            required: true,
        },
        ticketPrice: {
            type: Number,
            required: true,
        },
        totalSeats: {
            type: Number,
            required: true,
        },
        bookedSeats: {
            type: Array,
            default: [],
        },
        theatre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'theatres',
            required: true
        },
    }, 
    {
        timestamps: true
    }
);

export const Show = mongoose.model("Show", showSchema);
