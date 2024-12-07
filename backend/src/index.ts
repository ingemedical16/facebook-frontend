import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import { connectToDatabase } from "./config/db";
import formidable from "formidable";
import path from "path";

import fileParser from "./middlewares/fileParser";
import uploadCloud from "./utils/uploadCloud";

const app: Application = express();
dotenv.config();
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend origin
  credentials: true, // Allow credentials (cookies, etc.)
  optionsSuccessStatus: 200, // Status for preflight responses
};
app.use(cors(corsOptions));

// Function to dynamically import routes as ES modules
const loadRoutes = async () => {
  const routeFiles = readdirSync(path.join(__dirname, "routes")).filter(
    (file) => file.endsWith(".ts")
  ); // Only load .ts files
  if (!routeFiles.length) {
    console.error("No routes found in the routes directory.");
    process.exit(1);
  }
  await Promise.all(
    routeFiles.map(async (file) => {
      const routePath = `/api/${file.split(".")[0]}`;

      const route = await import(`./routes/${file}`); // Dynamically import the route module

      // Use the default export if available, or the entire module otherwise
      app.use(routePath, route.default || route);
    })
  );
};

// Load routes and handle errors
loadRoutes().catch((error: Error) => {
  console.error("Error loading routes:", error.message);
});
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome Facebook API</h1>");
});

// Connect to the database
connectToDatabase();

// Start the server on the specified port or 8000 if not provided as an environment variable
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
