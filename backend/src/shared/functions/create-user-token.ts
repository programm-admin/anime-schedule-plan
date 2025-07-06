import jwt from "jsonwebtoken";
import { T_RequestUser } from "../interfaces-and-types/user.type";

export const createUserToken = (inputObject: T_RequestUser): string | null => {
    const SECRET = process.env.SECRET_USER || "";

    if (SECRET.length < 1) {
        return null;
    }

    return jwt.sign(inputObject, SECRET, { expiresIn: "2h" });
};
