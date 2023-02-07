import Cast from "../models/castagency.model.js"
import mongoose from "mongoose";

export const getAllCast = async (req, res) => {
    try {
        const cast = await Cast.find();
        res.status(200).json(cast);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCast = async (req, res) => {
    try {
        // find cast by id with actor inside it 
        const cast = await Cast.findById(req.params.id);

        return res.status(200).json(cast);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const addCast = async (req, res) => {
    const cast = req.body;
    const newCast = new Cast(cast);
    try {
        await newCast.save();
        res.status(201).json(newCast);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCast = async (req, res) => {
    const { id: _id } = req.params;
    const castUpdate = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No cast with that id');
    const cast = await Cast.findById(id);
    if (!cast) return res.status(404).send('The cast with the given ID was not found.');
    cast.name = castUpdate.name;
    cast.age = castUpdate.age;
    await cast.save();
    res.status(200).json({
        cast
    });
}

export const deleteCast = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No cast with that id');
    await Cast.findByIdAndRemove(id);
    res.status(200).json({ message: "Cast deleted successfully." });
}
