const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes"); // Importing routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Universal middleware

// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI ||
  "MONGODB_URI";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Route
app.get("/", (req, res) => {
  res.send("Hello, the server is working fine with MongoDB connection!");
});

app.use("/api/users", userRoutes);

// Start the Server
const port = 3000; // Default port
app.listen(port, () => {
  console.log("Server started on localhost:" + port);
});
