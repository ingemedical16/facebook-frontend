const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const app = express();
//const options = { origin: "http://localhost:3000", useSuccessStatus: 200 };
app.use(cors());

// Read all files in the "routes" directory and add their routes to the app routes
readdirSync("./routes").map((file) =>
  app.use(`/api/${file.split(".")[0]}`, require(`./routes/${file}`))
);
app.get("/", (req, res) => {
  res.send("welcome from home");
});
app.get("/books", (req, res) => {
  res.send("hello");
});
app.listen(8000, () => {
  console.log("server is listening...");
});
