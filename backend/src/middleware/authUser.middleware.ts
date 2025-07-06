import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import {
    T_DBUser,
    T_RequestUserPayload,
} from "../shared/interfaces-and-types/user.type";
import { UserModel } from "../models/user.model";

const SECRET = process.env.SECRET_USER || "";

export const verifyToken = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (SECRET.length < 1) {
        response.status(500).json({ message: "No secret found." });
        return;
    }

    const authHeader: string | undefined = request.headers["authorization"];

    if (
        !authHeader ||
        (authHeader && authHeader.trim().length < 1) ||
        (authHeader && !authHeader.startsWith("Bearer "))
    ) {
        response.status(400).json({ message: "Token is missing." });
        return;
    }

    const token: string = authHeader.split(" ")[1];

    try {
        const decoded: T_RequestUserPayload = jwt.verify(
            token,
            SECRET
        ) as T_RequestUserPayload;

        // check content of token
        if (
            !decoded.userName ||
            !decoded.userType ||
            !decoded.authId ||
            !decoded.exp
        ) {
            response.status(403).json({ message: "Token is invalid." });
            return;
        }


        // check if user exists in DB
        const foundUsers: T_DBUser[] = await UserModel.find({
            authId: decoded.authId,
            userName: decoded.userName,
            userType: decoded.userType,
        });

        if (foundUsers.length < 1) {
            response
                .status(400)
                .json({ message: "Token is invalid for user." });
            return;
        }

        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            response.status(401).json({ message: "Token is expired." });
            return;
        }

        response.status(403).json({ message: "Token is invalid." });
        return;
    }
};
