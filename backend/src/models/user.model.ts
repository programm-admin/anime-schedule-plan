import mongoose, { Document, Schema } from "mongoose";
import { T_DBUser } from "../shared/interfaces-and-types/user.type";

export type T_MONGO_DBUser = T_DBUser & Document;

const UserSchema: Schema<T_MONGO_DBUser> = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    accountId: { type: String, required: true, unique: true },
    createdAccount: { type: Date, required: true },
    lastLogin: { type: Date, required: true },
    userAuth: {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
});

export default mongoose.model("User", UserSchema);
