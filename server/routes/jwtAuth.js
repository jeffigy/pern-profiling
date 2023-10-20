const express = require("express");
const router = express.Router();
const pool = require("../db");

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

    // query store
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
