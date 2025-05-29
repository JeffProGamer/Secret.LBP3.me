const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your actual environment variable name for your API key
const API_KEY = process.env.API_KEY || "F5BBcd+Td0qFo42VK52I9z8y+k0igV3P1zL2e/Qzw6y+PLodZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaVlYTmxRWEJwUzJWNUlqb2lSalZDUW1Oa0sxUmtNSEZHYnpReVZrczFNa2s1ZWpoNUsyc3dhV2RXTTFBeGVrd3laUzlSZW5jMmVTdFFURzlrSWl3aWIzZHVaWEpKWkNJNklqRTFNVGs1TXprNE56Y2lMQ0poZFdRaU9pSlNiMkpzYjNoSmJuUmxjbTVoYkNJc0ltbHpjeUk2SWtOc2IzVmtRWFYwYUdWdWRHbGpZWFJwYjI1VFpYSjJhV05sSWl3aVpYaHdJam94TnpRMU16SXlOREUyTENKcFlYUWlPakUzTkRVek1UZzRNVFlzSW01aVppSTZNVGMwTlRNeE9EZ3hObjAuZVMtNGN6VUVwU1NhOUtieFBGd1B0TDhhYVBCckNUcUlMbWRVZnhxRlRfckd6dmpZdmpQV2dLNThNakozUWxOa25hTzk0S1dxLTU3YmxNcEsyUUpHNXB5eC1ldkVZMC1EWGFkLU9LUXU2UHlGaWh5QURtRUg4YzlMTS0tUHdkSUtSWFQwSUFfdzFFUzFrRzFzdTRfWjRpWF9qWGFoSjlMWXVVNlZZbkJYSWF5c1ZtdjkyZHJ1LU5QUW93NkIzSTJtZHROTmhiT0R1WDk4WEViS3JRUkdsaTlPWGxxdnVfN2IwUkdVaUEtd05rZG1nSTF5VzZBbWJOZUlxZElkVERvdk9LU21TUnlnSEVzN28zTkZpMXV1VWR6TkpvYzVMbGVGUnEyZ05WQjV5bzZmMFF4cEplUWE4ZTlJS2NUdHlNeWtLOTRZeVN2eXhvZ0pOQjBaZE90eFV3"; 
const UNIVERSE_ID = "6742973974"; // Your actual universe ID

// Root route — just to confirm the server is running
app.get("/", (req, res) => {
  res.send("Roblox Place API is live. Use POST /create-place to create a place.");
});

// POST /create-place route
app.post("/create-place", async (req, res) => {
  const { playerName, userId } = req.body;

  if (!playerName) {
    return res.status(400).json({ error: "Missing player name!" });
  }

  // Optionally use userId if you want to do something with it
  console.log("Creating place for player:", playerName, "UserId:", userId);

  try {
    const response = await axios.post(
      `https://apis.roblox.com/universes/v1/${UNIVERSE_ID}/places/create`,
      {
        name: `${playerName} Unnamed Level`,
        description: `A personal world for ${playerName}`,
        isPublic: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("❌ Failed to create place:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to create place." });
  }
});
