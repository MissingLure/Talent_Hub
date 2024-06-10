const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const createRoutes = require("./routes/createRoutes");
const updateRoutes = require("./routes/updateRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const evaluationRoutes= require("./routes/evaluationRoutes");
const encuestaRoutes = require("./routes/EncuestaRoutes");
const competenciasRoutes = require("./routes/competencias.routes");
const competenciasHabilidadesRoutes = require("./routes/competencias.habilidades.routes");
const habilidadesPreguntasRoutes = require("./routes/habilidades.preguntas.routes");
const evaluacionesCompetenciasRoutes = require("./routes/evaluaciones.competencias.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const gridBoxRoutes = require("./routes/gridBoxRoute");
const departamentosRoutes = require("./routes/departamentosRoutes");
const puestosRoutes = require("./routes/puestosRoutes");
const metaEmpleadoResultadoRoutes = require("./routes/metaEmpleadoResultadoRoutes");


app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/create", createRoutes);
app.use("/update", updateRoutes);
app.use("/delete", deleteRoutes);
app.use("/gridbox",gridBoxRoutes);
app.use("/dep", departamentosRoutes);
app.use("/evaluationPerformance",evaluationRoutes);
app.use("/encuesta",encuestaRoutes);;
app.use("/competencias", competenciasRoutes);
app.use("/competencias-habilidades", competenciasHabilidadesRoutes);
app.use("/habilidades-preguntas", habilidadesPreguntasRoutes);
app.use("/evaluaciones-competencias", evaluacionesCompetenciasRoutes);
app.use("/puestos", puestosRoutes);
app.use("/meta-empleado-resultado", metaEmpleadoResultadoRoutes);
app.use("/dashboard", dashboardRoutes);
console.log(process.env.TALENT_HUB_DB);



app.listen(4000);
console.log("Escuchando en el puerto 4000");
