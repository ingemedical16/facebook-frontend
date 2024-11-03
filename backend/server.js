const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");

dotenv.config();
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
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
