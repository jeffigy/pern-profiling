const express = require("express");
const app = express();
const cors = require("cors");

//*Middleware
app.use(cors()); // allows client and server to interact
app.use(express.json()); // allows us to access req.body

//*Routes
app.use("/auth", require("./routes/jwtAuth"));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
