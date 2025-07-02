import mongoose from "mongoose";

const AnimePlanSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    userAccountId: { type: String, required: true, unique: true },
    
});
