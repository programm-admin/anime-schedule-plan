const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    accountID: { type: String, required: true, unique: true },
    createdAccount: { type: Date, required: true },
    lastLogin: { type: [Date], required: true },
});

// hash password before saving it
userSchema.pre("save", async (next) => {
    // if (!this.isModified("password")) return next();
    // this.password = await bcrypt.hash(this.password, 10);

    next();
});

// validate password
userSchema.methods.matchPassword = async (enteredPasswort) => {
    return await bcrypt.compare(enteredPasswort, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
