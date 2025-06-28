import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    accountId: { type: String, required: true, unique: true },
    createdAccount: { type: Date, required: true },
    lastLogin: { type: Date, required: true },
});

export default mongoose.model("User", UserSchema);
