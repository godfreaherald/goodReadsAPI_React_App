const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user/auth", authRoute);
app.use("/user", userRoute);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(process.env.MONGO_URI));

// app.get("/user/auth", (req, res) => {
//   //const { email,password} = req.body;
//   res.status(400).json({ errors: { global: "An error occured" } });
// });

app.listen(8080, console.log("App running"));
