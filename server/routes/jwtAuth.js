const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

//* register route
router.post("/register", async (req, res) => {
  try {
    //destructure req.body
    const { name, email, password } = req.body;

    // query to users table using email
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // check if user already exist
    if (user.rows.length !== 0) {
      return res.status(401).json("user already exist"); // 401 means unauthenticated
    }
    // hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // query to store new user;
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // return newUser
    res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
