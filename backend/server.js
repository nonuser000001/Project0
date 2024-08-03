const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const carData = require("./routes/CarData.js")


// init app & middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
env.config();
app.use(express.json());
app.use(authRoutes)
app.use(carData)

// db connection


mongoose.connect("mongodb://host.docker.internal:27017/Project0", { //url on local dev proccess.env.DB_URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const mongo = mongoose.connection
