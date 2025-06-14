const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateUniqueId = require("generate-unique-id");

const generateAccountID = (userName) => {
    const settings = {
        length: 60,
        includeSymbols: ["!", "_", "?"],
    };
    const accountID =
        generateUniqueId(settings) + userName + generateUniqueId(settings);

    return accountID;
};

const hashPassword = async (plainPassword) => {
    const saltRounds = 12; // the higher the number, the safer the password but the slower the application
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    return hashedPassword;
};

const loginUser = async (request, response) => {
    const { userName, password } = request.body;

    console.log("[POST] login user with name:", userName);

    const foundUser = await User.findOne({
        userName,
    });

    if (!foundUser) {
        return response.status(400).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(user.password, password);
    // isValidPassword = false;

    if (!isValidPassword) {
        console.log("[DB - ERROR] Password does not match.");
        return response
            .status(401)
            .json({ message: "Wrong Password or user not found." });
    }

    const token = jwt.sign(
        {
            id: "fdfafdaggaf",
            username: "test",
        },
        process.env.JWT_SECRET
        // { expiresIn: "1d" }
    );

    response.status(200).json({
        authToken: token,
        message: "Login successfully",
        accountID: 1,
        userName: foundUser.userName,
    });
};

const registerUser = async (request, response) => {
    const { userName, password } = request.body;
    const newAccountID = generateAccountID(userName); // generating new account id
    const accountList = await User.find({});
    let doesAccountIdAlreadyExist = true;
    let doesUserNameAlreadyExist = false;

    console.log("[POST-INFO] Register user with name:" + userName + ".");

    if (accountList.map((usr) => usr.userName).includes(userName.trim())) {
        console.error(
            "[POST-ERROR] Registering user cancelled because user name " +
                userName +
                " already exists."
        );
        return response
            .status(400)
            .json({ message: "User name already exists." });
    }

    while (doesAccountIdAlreadyExist) {
        let wasNewAccountIdChanged = false;

        for (user in accountList) {
            if (user.accountID === newAccountID) {
                // generating new account id if already generated id is already in use
                newAccountID = generateAccountID(userName);
                wasNewAccountIdChanged = true;
            }
        }

        if (!wasNewAccountIdChanged) {
            doesAccountIdAlreadyExist = false;
        }
    }
    l;

    // insert new user into database
    const responseUser = new User({
        userName: userName,
        password: await hashPassword(password),
        accountID: newAccountID,
        createdAccount: new Date(),
        lastLogin: [],
    });

    await responseUser.save();
    console.log(
        `[REGISTER USER] new user in db: ${JSON.stringify(responseUser)}`
    );

    if (!responseUser) {
        return response.status(500).send("Error when inserting new user.");
    }

    const generatedAuthToken = jwt.sign(
        {
            userName: responseUser.userName,
            accountId: responseUser.accountID,
        },
        process.env.JWT_SECRET
    );

    response.status(200).json({
        authToken: generatedAuthToken,
        message: "New user inserted successfully.",
        accountID: responseUser.accountID,
    });
};

module.exports = { loginUser, registerUser };
