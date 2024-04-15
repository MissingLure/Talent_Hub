const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const createRoutes = require("./routes/createRoutes");
const updateRoutes = require("./routes/updateRoutes");


app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/create", createRoutes);
app.use("/update", updateRoutes);

app.listen(4000);
console.log('Escuchando en el puerto 3000');
