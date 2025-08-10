import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
    T_DBUser,
    T_LoginUser,
    T_RegisterUser,
    T_RequestUser,
} from "../shared/interfaces-and-types/user.type";
import { createUserToken } from "../shared/functions/create-user-token";
import { generateId } from "../shared/functions/generate-id";

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
    const { user }: { user: T_RegisterUser } = request.body;

    try {
        const existingUser = await UserModel.find({ userName: user.userName });

        if (existingUser.length > 0) {
            response
                .status(400)
                .json({ message: "Der Nutzername existiert bereits." });
            return;
        }

        const today: Date = new Date();
        const passwordHash: string = await hashPassword(user.password);
        const newUser = new UserModel({
            userName: user.userName,
            password: passwordHash,
            userType: user.userType,
            authId: generateId("User"),
            accountId: generateId("UserAccount"),
            createdAccount: today,
            lastLogin: today,
            userAuth: {
                question: user.userAuth.question,
                answer: user.userAuth.answer,
            },
        });

        await newUser.save();
        response.status(201).json({
            message: "Neuer Nutzer erfolgreich registriert.",
        });
    } catch (error) {
        console.log("error when register new user", error);
        response.status(500).json({
            message: "Fehler beim Registrieren des Nutzers.",
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
    const { user }: { user: T_LoginUser } = request.body;

    try {
        const foundUsers: T_DBUser[] = await UserModel.find({
            userName: user.userName,
        });
        const foundUser = foundUsers[0];

        if (!foundUsers || !foundUser) {
            response.status(400).json({ message: "Invalid credentials." });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(
            user.password,
            foundUser.password
        );

        if (!isPasswordMatch) {
            response.status(400).json({
                message: "Invalid credentials.",
            });
            return;
        }

        const token: string | null = createUserToken({
            userName: user.userName,
            userType: user.userType,
            authId: foundUser.authId,
        });

        if (!token) {
            response.status(400).json({
                message: "Could not create token because data is missing.",
            });
            return;
        }

        response.status(200).json({
            message: "Login successful.",
            token,
            lastLogin: new Date(),
            userAccountId: foundUser.accountId,
        });
    } catch (error) {
        console.log("Error when log in user.", error);
        response.status(500).json({ message: "Error when log in user." });
    }
};
