const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("./validation/register.js");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Config
const db = require("./config/keys.js").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
const PORT = process.env.PORT || 5000;

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// General GET
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/*", (req, res) => {
  res.send("NOPE!");
});

//App Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
