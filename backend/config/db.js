const mongoose = require("mongoose");

// Connect to MongoDB
exports.connectToDatabase = () => {
  const uri = process.env.DATABASE_URL;
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
  const run = async () => {
    try {
      await mongoose.connect(uri, clientOptions);
      console.log("Connected to MongoDB Successfully");
    } finally {
      await mongoose.disconnect();
    }
  };
  run().catch((err) => console.error("Failed to connect to MongoDB", err));
};
