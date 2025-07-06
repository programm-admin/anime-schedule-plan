import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
    T_RequestUser,
    T_RequestUserPayload,
} from "../shared/interfaces-and-types/user.type";

const SECRET = process.env.SECRET_USER || "";

export const verifyToken = (
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
            !decoded.userAuth ||
            (decoded.userAuth && !decoded.userAuth.question) ||
            (decoded.userAuth && !decoded.userAuth.answer)
        ) {
            response.status(403).json({ message: "Token is invalid." });
            return;
        }

        next();
    } catch (error) {
        response.status(403).json({ message: "Token is invalid." });
        return;
    }
};
