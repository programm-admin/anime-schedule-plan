import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import generateUniqueId from "generate-unique-id";
import { UNIQUE_ID_OBJECT } from "../shared/variables/unique-id-object";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const hashPassword = (password: string): Promise<string> => {
    const SALT_ROUNDS: number = 10; // the higher SALT_ROUNDS, the safer the password but the slower the application
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Function for register a new user and add him to the database.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const registerUser = async (request: Request, response: Response) => {
    const { userName, password } = request.body;

    try {
        const existingUser = await User.find({ userName: userName });

        if (existingUser.length > 0) {
            console.log("bla in existing");
            response.status(400).json({ message: "Username already exists." });
            return;
        }

        const today: Date = new Date();
        const passwordHash: string = await hashPassword(password);
        const newUser = new User({
            userName,
            password: passwordHash,
            accountId: `${generateUniqueId(
                UNIQUE_ID_OBJECT
            )}-${generateUniqueId(UNIQUE_ID_OBJECT)}`,
            createdAccount: today,
            lastLogin: today,
        });

        await newUser.save();
        response.status(201).json({
            message: "New user registered successfully.",
            user: newUser,
        });
    } catch (error) {
        console.log("error when register new user", error);
        response.status(500).json({
            message: "Error when register new user.",
        });
    }
};

/**
 * Function for log in an existing user by comparing the request data with the database information.
 * @param request express.Request
 * @param response express.Response
 * @returns void
 */
export const loginUser = async (request: Request, response: Response) => {
    const { userName, password } = request.body;

    try {
        const foundUsers = await User.find({ userName });
        const user = foundUsers[0];

        if (!foundUsers || !user) {
            response.status(400).json({ message: "Invalid credentials." });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            response.status(400).json({
                message: "Invalid credentials.",
            });
            return;
        }

        const token = jwt.sign(
            {
                accountId: user.accountId,
                userName: user.userName,
            },
            process.env.SECRET as string
        );

        response.status(200).json({
            message: "Login successful.",
            token,
        });
    } catch (error) {
        console.log("Error when log in user.");
        response.status(500).json({ message: "Error when log in user." });
    }
};
