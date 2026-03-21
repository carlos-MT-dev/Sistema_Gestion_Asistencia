
import express from "express";
const router = express.Router();
import getAllEmployeeAsistenceFiltrado from "../query/get_employee_asistence_query_filtered.js";


router.post("/employee_asistencia/filtrada", async (req, res) => {
  const { Fecha_inicio, Fecha_finalizacion, cbb_filtro_area } = req.body;

  try {
    const resultados = await getAllEmployeeAsistenceFiltrado(
      Fecha_inicio,
      Fecha_finalizacion,
      cbb_filtro_area,
    );

    // console.log(resultados);
    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener asistencia filtrada:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;