require("dotenv").config({ path: ".env.backend" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("../src/routes/user.routes");

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "authorization",
            "Method",
            "method",
        ],
    })
);

app.use(express.json());

mongoose
    .connect(process.env.DB ?? "")
    .then(() => console.log("[DB] connected to MongoDB successfully"))
    .catch((error) =>
        console.error(
            "[DB] error when connecting to MongoDB:",
            JSON.stringify(error)
        )
    );

// routes
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`[SERVER] server running on port ${PORT}`));
