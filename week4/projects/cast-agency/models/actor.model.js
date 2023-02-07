import mongoose from "mongoose";

const GenreEnum = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"]

const actorSchema = new mongoose.Schema({
    // actor
    name: String,
    age: String,
    gender: String,

    // actor's pyhsical attributes
    height: String,
    weight: String,
    hair: String,
    eyes: String,

    // actor's contact info
    phone: String,
    email: String,
    website: String,

    // actor's bio
    bio: String,
    since: String,

    // actor's photos
    headshot: String,
    fullbody: String,
    resume: String,

    // actor's social media
    social: {
        facebook: String,
        instagram: String,
        twitter: String,
    },

    // actor's credits
    credits: {
        film: String,
        tv: String,
        theater: String,
    },

    // actor's skills
    skills: {
        acting: String,
        dancing: String,
        singing: String,
        modeling: String,
        sports: String,
        other: String,
    },

    // actor's genre preferences
    genre: {
        type: String,
        enum: GenreEnum
    },

    // actor's agent
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CastAgency"
    }
    

})

const Actor = mongoose.model("Actor", actorSchema);

export default Actor;