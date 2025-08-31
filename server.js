const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config(); // load env vars

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // for serving HTML/CSS/JS files

// MongoDB connection
mongoose.connect(process.mongodb+srv://affaraffu_db_user:4oPocilK3U9aMS09@myportfolio.8exmth2.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=myportfolio
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, // ensure TLS/SSL with Atlas on Render
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Route to handle form submission
app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await newContact.save();
    res.send("Message received! ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong ❌");
  }
});

// Serve your HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // put your form in index.html
});

// Use Render's PORT or default to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

