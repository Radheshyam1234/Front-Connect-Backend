const express = require("express");
const app = express();
const cors = require("cors");
const { initializeConnection } = require("./database/databaseConnection");

app.use(express.json());
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;
initializeConnection();

app.get("/", (req, res) => {
  res.send("Hello from Front-Connect backend");
});

app.use("/user", require("./routes/userRouter"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port 8080`);
});
