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

// edit a person
router.put("/persons/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, bday, sex, address } = req.body;
    const unixTimeStamp = Math.floor(new Date(bday).getTime() / 1000);
    const updatePerson = await pool.query(
      "UPDATE persons SET person_fname = $1, person_lname = $2, person_bday = $3, person_sex = $4, person_address = $5 WHERE person_id = $6 AND user_id = $7 RETURNING *",
      [fname, lname, unixTimeStamp, sex, address, id, req.user.id]
    );
    if (updatePerson.rows.length === 0) {
      return res.json("This person record is not yours");
    }
    res.json("Person was updated");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a person's record

router.delete("/persons/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePerson = await pool.query(
      "DELETE FROM persons WHERE person_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deletePerson.rows.length === 0) {
      return res.json("this person record is not yours");
    }
    res.json("Person was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
