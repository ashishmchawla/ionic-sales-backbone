const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const corsConfig = require("./config/config").cors;
const errorHandler = require("./config/config").error;
require("dotenv").config();

// CORS prevention
app.use(corsConfig);

// Connect to the database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

// Starting the application
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.use(bodyParser.json());
app.use("/", router);

// Error Handling
app.use(errorHandler);

module.exports = app;
