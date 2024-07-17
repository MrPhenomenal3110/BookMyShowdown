import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
    {
        title: {
            type: String, 
            required: true,  
        },
        description: {
            type: String, 
            required: true, 
        },
        duration: {
            type: Number, 
            required: true,   
        },
        genre: {
            type: String, 
            required: true,   
        },
        language: {
            type: String, 
            required: true ,   
        },
        releaseDate: {
            type: Date, 
            required: true,   
        },
        poster: {
            type: String, 
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Movie = mongoose.model('Movie', movieSchema);
