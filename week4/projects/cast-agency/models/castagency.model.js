import mongoose from "mongoose";

const castAgencySchema = new mongoose.Schema({
    // cast agency
    name: String,
    location: String,
    phone: String,
    website: String,
    email: String,
    bio: String,
    since: String,
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actor",
        }
    ]
})

const CastAgency = mongoose.model("CastAgency", castAgencySchema);

export default CastAgency;