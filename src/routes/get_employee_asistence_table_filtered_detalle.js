import express from "express";
const router = express.Router();
import getAllEmployeeAsistenceFiltrado from "../query/get_employee_asistence_query_filtered.js";
import getDescuentoTardanzas from "../query/get_count_tardanzas_descuento.js";


router.post("/employee_asistencia/filtrada/detalle", async (req, res) => {
  let {
    Fecha_inicio_detalle,
    Fecha_finalizacion_detalle,
    cbb_filtro_area_detalle,
    cbb_filtro_area_empleado_detalle,
  } = req.body;

  try {
    let resultadosFiltro = await getAllEmployeeAsistenceFiltrado(
      Fecha_inicio_detalle,
      Fecha_finalizacion_detalle,
      cbb_filtro_area_detalle,
      cbb_filtro_area_empleado_detalle,
    );

    let resDescTardanzas = await getDescuentoTardanzas(
      Fecha_inicio_detalle,
      Fecha_finalizacion_detalle,
      cbb_filtro_area_detalle,
      cbb_filtro_area_empleado_detalle,
    );

    // console.log(resultados);
    res.json({ resultadosFiltro, resDescTardanzas });
    console.log("Datos filtrados:", resultadosFiltro, "Descuentos tardanzas:", resDescTardanzas);
  } catch (error) {
    console.error("Error al obtener asistencia filtrada:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
