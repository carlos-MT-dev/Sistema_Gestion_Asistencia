import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import getEmployeeAsistenceRouter from "./src/routes/get_employee_asistence_table.js";
import getEmployeeAsistenceFilteredRouter from "./src/routes/get_employee_asistence_table_filtered.js";
import getEmployeeAsistenceFilteredRouterDetalle from "./src/routes/get_employee_asistence_table_filtered_detalle.js";
import setEstadoDescuento from "./src/query/set_estadoEntrada_descuento.js";
import getAllEmployeeRouter from "./src/routes/get_employee_list.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("port", 8000);
app.set("case sensitive routing", false);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "cambiar_este_secret_en_produccion",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  }),
);


// SETEA LOS VALORES DE DESCUENTO AUTOMATICAMENTE AL INICIAL EL SERVIDOR
(async () => {
  try {
    await setEstadoDescuento();
    console.log("Proceso automático ejecutado al iniciar el servidor.");
  } catch (error) {
    console.error("Error en ejecución inicial:", error);
  }
})();


setInterval(async () => {
  try {
    console.log("Ejecutando proceso automático...");
    await setEstadoDescuento();
    console.log("Proceso automático ejecutado correctamente.");
  } catch (error) {
    console.error("Error en proceso automático:", error);
  }
}, 1800000);

// FIN DE LA EJECUCION AUTOMATICA DE DESCUENTO

//RUTA BASE PARA SERVIR ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, "src")));

// RUTA BASE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/vista/index.html"));
});

//RUTAS PROVENIENTES DE LOS ROUTERS
app.use(getEmployeeAsistenceRouter);
app.use(getEmployeeAsistenceFilteredRouter);
app.use(getEmployeeAsistenceFilteredRouterDetalle);
app.use(getAllEmployeeRouter);


// CONFIGURACION DE PUERTO Y ARRANQUE DEL SERVIDOR
app.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Server running on http://localhost:" + app.get("port"));
});
