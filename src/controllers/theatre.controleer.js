import { Theatre } from '../models/theatre.model.js';

export const addTheatre = async (req, res) => {
    try{
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "New theatre has been added!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

export const getAllTheatres = async (req, res) => {
    try{
        const allTheatres = await Theatre.find().populate('owner');
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
}

export const getAllTheatresByOwner = async (req, res) => {
    try{
        const allTheatres = await Theatre.find({owner: req.body.owner});
        res.send({
            success: true,
            message: "All theatres fetched successfully!",
            data: allTheatres
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

export const updateTheatre = async (req, res) => {
    try{
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        res.send({
            success: true,
            message: "Theatre has been updated!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

export const deleteTheatre = async (req, res) => {
    try{
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: "The theatre has been deleted!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}