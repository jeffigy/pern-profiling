const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//* register route
router.post("/register", validInfo, async (req, res) => {
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

    //generate just token
    const token = jwtGenerator(newUser.rows[0].user_id);

    // return newUser
    // res.json(newUser.rows[0].user_id);

    res.json({ token });
    //* we need enclose the token in an curly bracket so that
    //* it will return as key value pair, without that value will only return
  } catch (error) {
    console.error(error.message);
  }
});

//* login route
router.post("/login", validInfo, async (req, res) => {
  try {
    // destucture req.body;
    const { email, password } = req.body;

    // query users table using email
    const user = await pool.query(
      "SELECT * FROM users WHERE  user_email = $1",
      [email]
    );

    // if theres no existing user, throw error
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //check if password is similar to the user_password stored in users table
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    // if not, throw error
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // generate a jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
  }
});

//* this route is for jwt token verification
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
