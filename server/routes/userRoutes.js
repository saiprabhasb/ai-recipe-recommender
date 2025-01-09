const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const axios = require("axios");

// Example Route: Test User Route
router.get("/test", (req, res) => {
  res.send("User route is working!");
});

// Route: Register a New User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password, // Store password as plain text (not recommended for production)
    });

    await newUser.save();

    res.send("User Registered Successfully!");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
});

// Route: Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Directly compare the plain text password
    if (user.password !== password) {
      return res.status(400).send("Invalid Credentials");
    }

    res.send("Login Successfully");
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Error While Login");
  }
});

// Route: Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude the passwords field
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Route: Get Recipe Recommendations from Spoonacular API
router.post("/get-recipe-recommendations", async (req, res) => {
  const { dietPreferences } = req.body;

  const apiKey = "b0c97eb2ebeb456c98fc57ba9148c6bb"; // Spoonacular API key
  const modelEndpoint = `https://api.spoonacular.com/recipes/complexSearch?diet=${dietPreferences}&apiKey=${apiKey}&number=5`;

  try {
    const response = await axios.get(modelEndpoint);

    const recipeDetailsPromises = response.data.results.map(async (recipe) => {
      const recipeDetailUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      const recipeDetailResponse = await axios.get(recipeDetailUrl);
      return {
        ...recipe,
        ingredients: recipeDetailResponse.data.extendedIngredients,
        instructions: recipeDetailResponse.data.instructions,
      };
    });

    const recipesWithDetails = await Promise.all(recipeDetailsPromises);
    res.json(recipesWithDetails);
  } catch (error) {
    console.error("Error calling Spoonacular API:", error);
    res.status(500).send("Error getting recipe recommendations");
  }
});

module.exports = router;
