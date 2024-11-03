const mongoose = require("mongoose");

// Connect to MongoDB
exports.connectToDatabase = async () => {
  const uri = process.env.DATABASE_URL;
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
    try {
      await mongoose.connect(uri, clientOptions);
      console.log("Connected to MongoDB Successfully");
    } catch(err) {
        console.error("Error connecting to MongoDB:", err.message);
  
   }

};
