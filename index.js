const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello from Front-Connect backend");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port 8080`);
});
