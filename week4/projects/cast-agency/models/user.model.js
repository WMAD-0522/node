import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    // create a role which takes a enum of AGENCY, ACTOR, DIRECTOR
    role: {
        type: String,
        enum: ["AGENCY", "ACTOR", "DIRECTOR", "USER"],
        default: "USER"
    },
    // create a field which takes a reference to the cast agency
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CastAgency"
    },
    // create a field which takes a reference to the actor
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor"
    },
});

const User = mongoose.model("User", userSchema);

export default User;
