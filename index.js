const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

require("dotenv").config();

const userRoutes = require("./server/routes/userRoutes");
const dataRoutes = require("./server/routes/dataRoutes");
const createRoutes = require("./server/routes/createRoutes");
const updateRoutes = require("./server/routes/updateRoutes");


app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/create", createRoutes);
app.use("/update", updateRoutes);

app.listen(4000);
console.log('Escuchando en el puerto 4000');
