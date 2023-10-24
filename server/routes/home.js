const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// get all persons
router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, p.person_id, p.person_fname, p.person_lname, to_timestamp(p.person_bday) AS person_bday, p.person_sex, p.person_address FROM users AS u LEFT JOIN persons as p ON u.user_id = p.user_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// add a person
router.post("/persons", authorization, async (req, res) => {
  try {
    const { fname, lname, bday, sex, address } = req.body;
    // convert bday to unix
    const unixTimeStamp = Math.floor(new Date(bday).getTime() / 1000);
    // send query to the server
    const newPerson = await pool.query(
      "INSERT INTO persons(user_id, person_fname, person_lname, person_bday, person_sex, person_address ) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING *",
      [req.user.id, fname, lname, unixTimeStamp, sex, address]
    );
    res.json(newPerson.rows[0]);
    console.log(newPerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
