import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import getEmployeeAsistenceRouter from "./src/routes/get_employee_asistence_table.js";
import getEmployeeAsistenceFilteredRouter from "./src/routes/get_employee_asistence_table_filtered.js";

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

app.use(express.static(path.join(__dirname, "src")));


// ruta base
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/vista/index.html"));
})

app.use(getEmployeeAsistenceRouter);
app.use(getEmployeeAsistenceFilteredRouter);

app.listen(app.get("port"), "0.0.0.0", () => {
  console.log("Server running on http://localhost:" + app.get("port"));
});
