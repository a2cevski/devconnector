const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validatePostInput = require("../../validation/post");

// Load User Model
let User = require("../../models/User");
// Load Posts Model
let Post = require("../../models/Post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Post Works!" }));

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isValid } = validatePostInput(req.body);
    if (!isValid) {
      res.status(400).json(error);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
