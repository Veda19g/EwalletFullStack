const mongoose =require("mongoose");

const mongoURI = "mongodb+srv://vedang19:vedang123@cluster0.x1ymzdc.mongodb.net/Ewallet";

mongoose.connect(mongoURI,{useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;