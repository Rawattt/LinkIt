const express = require("express");
const path = require("path");

const connectDB = require("./db/mongoose");

// Importing constants
const { apiVersion } = require("./constant");

const app = express();

// MIDDLEWARE
// Body parser
app.use(express.json());

// Connect to the database
connectDB();

// Defining routes
app.use(`${apiVersion}/users`, require("./routes/api/users"));
app.use(`${apiVersion}/auth`, require("./routes/api/auth"));
app.use(`${apiVersion}/posts`, require("./routes/api/posts"));
app.use(`${apiVersion}/profile`, require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runninng on port: ${PORT}`);
});
