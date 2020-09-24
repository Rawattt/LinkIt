const mongoose = require("mongoose");
const config = require("config");

const uri = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    // Exit process in failure
    process.exit(1);
  }
};

module.exports = connectDB;
