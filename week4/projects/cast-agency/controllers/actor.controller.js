import Actor from "../models/actor.model.js"
import Cast from "../models/castagency.model.js"
import mongoose from "mongoose";

export const getActors = async(req, res) => {
    try {
        const actors = await Actor.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getActor = async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        res.status(200).json(actor);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addActor = async (req, res) => {
    const actor = req.body;
    const newActor = new Actor(actor);

    try {
        await newActor.save().then(
            (res) => {
                Cast.findByIdAndUpdate(
                    actor.agent,
                    { $push: { actors: res._id } },
                    { new: true },
                    (err, updatedCast) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(updatedCast);
                        }
                    }
                );
            }
        );
        res.status(201).json(newActor);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateActor = async (req, res) => {
    const { id } = req.params;

    console.log(id);
    const actorUpdate = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No actor with that id');

    // update actor
    const actor = await Actor.findById(id);
    
    if (!actor) return res.status(404).send('The actor with the given ID was not found.');

    actor.name = actorUpdate.name;
    actor.age = actorUpdate.age;
    actor.agent = actorUpdate.agent;

    await actor.save();
    res.status(200).json({
        actor
    });
}

export const deleteActor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No actor with that id');
    await Actor.findByIdAndRemove(id);
    res.json({ message: 'Actor deleted successfully' });
}
