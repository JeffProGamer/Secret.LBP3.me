// server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔐 Store your API key securely in the environment settings on Render
const API_KEY = process.env.process.env.API_KEY

app.post("/create-place", async (req, res) => {
    const { playerName } = req.body;

    if (!playerName) {
        return res.status(400).json({ error: "Missing player name!" });
    }

    try {
        const response = await axios.post(
            `https://apis.roblox.com/universes/v1/${UNIVERSE_ID}/places/create`,
            {
                name: `${playerName} Unnamed Level`,
                description: `A personal world for ${playerName}`,
                isPublic: false
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                }
            }
        );

        return res.json(response.data);
    } catch (error) {
        console.error("❌ Failed to create place:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to create place." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
