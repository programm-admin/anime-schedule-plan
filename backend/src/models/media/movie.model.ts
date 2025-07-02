import mongoose, { mongo } from "mongoose";

const MovieSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    plannedAirDate: { type: Date, required: true },
    realAirDate: { type: Date, required: true },
    watched: { type: Boolean, required: true },
    rating: { type: Number, required: false },
    notes: { type: String, required: false },
});

export default mongoose.model("Movie", MovieSchema);
