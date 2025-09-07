const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // also parse form data
app.use(express.static("public"));

// Check env
console.log("MONGO_URI from .env:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing");

// Connect MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

// Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", contactSchema);

// Route
app.post("/contact", async (req, res) => {
  console.log("📩 Received at /contact:", req.body);

  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log("✅ Saved to DB:", contact);
    res.json({ message: "✅ Message saved successfully!" });
  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ message: "❌ Error saving message." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
