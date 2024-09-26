// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://malidadashi:Ma101010@nodejs.sgw7o.mongodb.net/test?retryWrites=true&w=majority&appName=nodejs";

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected")
     client.db("test").command({ ping: 1 });
})
    .catch((error) => console.error("MongoDB connection error:", error));

// Define user schema and model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("NewUser", userSchema);

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // const user = new User({ email, password });

    try {
        await User.create({
            email,
            password
        });
        res.status(200).send("User saved to database");
    } catch (error) {
        res.status(500).send("Error saving user to database");
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
