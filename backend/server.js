const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { connectToDatabase } = require("./config/db");

dotenv.config();
const app = express();
app.use(express.json());
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
// connect to Database
connectToDatabase();

// Start the server on the specified port or 8000 if not provided as an environment variable
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
