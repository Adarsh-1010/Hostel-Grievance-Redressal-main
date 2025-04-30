

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();


const complaintRoutes = require("./routes/complaintRoutes");
const studentRoutes = require("./routes/studentRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const userRoutes = require("./routes/userRoutes");
const mailRoutes = require("./routes/mailRoutes"); // Import mailRoutes

app.use(cors());
app.use(express.json());

app.use('/', complaintRoutes);
app.use('/', studentRoutes);
app.use('/', wardenRoutes);
app.use('/', userRoutes);
app.use("/api", mailRoutes);


app.listen(3000, () => {
  console.log("Application is running on port 3000");
});