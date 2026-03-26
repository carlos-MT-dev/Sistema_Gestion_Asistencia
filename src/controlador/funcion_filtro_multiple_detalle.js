import ListarTablas from "./funcion_listar_tabla_assitencias.js";
import ListarTablaDetalle from "./funcion_listar_tabla_asistencias_detalle.js";
import exportExcelDetalle from "./reportes/get_reporte_usuario_detalle.js";

document.addEventListener("DOMContentLoaded", () => {
  // VALIDACIÓN DE EXISTENCIA DE ELEMENTOS EN EL DOM
  const btnFiltro = document.getElementById(
    "btn_filtrar_fecha_detalle_usuarios",
  );
  const btnExportarGeneral = document.getElementById(
    "btn_exportar_reporte_general",
  );
  const btnExportardescuento = document.getElementById(
    "btn_exportar_reporte_descuento",
  );
  const form = document.getElementById("form_filtros_detalle_usuarios");

  if (!btnFiltro || !btnExportarGeneral || !btnExportardescuento || !form) {
    console.error(
      "No se encontraron todos los elementos requeridos en el DOM.",
    );
    return;
  }

  // FUNCION GENERAL PARA OBTENER LOS DATOS DESDE LA RUTA DE EXPRESS
  async function fetchData() {
    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData);

      const response = await fetch(`/employee_asistencia/filtrada/detalle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Devuelve {resultadosFiltro, resDescTardanzas}
    } catch (error) {
      console.error("Error en fetchData:", error);
      return { resultadosFiltro: [], resDescTardanzas: [] };
    }
  }

  // BOTÓN FILTRAR DATOS Y MOSTRAR TABLAS
  btnFiltro.addEventListener("click", async () => {
    try {
      const { resultadosFiltro, resDescTardanzas } = await fetchData();

      console.log("Datos filtrados:", resultadosFiltro);
      console.log("Descuentos tardanzas:", resDescTardanzas);

      const tableBody = document.getElementById("employeeTableBody");
      tableBody.innerHTML = "";

      const tableBodyDetalle = document.getElementById(
        "employeeTableBodySubtotal",
      );
      tableBodyDetalle.innerHTML = "";

      ListarTablas(resultadosFiltro, tableBody);
      ListarTablaDetalle(resDescTardanzas, tableBodyDetalle);
    } catch (error) {
      console.error("Error al filtrar datos:", error);
    }
  });

  // BOTÓN EXPORTAR REPORTE GENERAL
  btnExportarGeneral.addEventListener("click", async () => {
    try {
      const { resultadosFiltro } = await fetchData();

      if (!resultadosFiltro || resultadosFiltro.length === 0) {
        console.log("No hay datos para exportar en el reporte general.");
        return;
      }

      await exportExcelDetalle(resultadosFiltro);
    } catch (error) {
      console.error("Error al exportar reporte general:", error);
    }
  });

  // BOTÓN EXPORTAR REPORTE DESCUENTOS
  btnExportardescuento.addEventListener("click", async () => {
    try {
      const { resDescTardanzas } = await fetchData();

      if (!resDescTardanzas || resDescTardanzas.length === 0) {
        console.log("No hay datos para exportar en el reporte de descuentos.");
        return;
      }

      await exportExcelDetalle(resDescTardanzas);
    } catch (error) {
      console.error("Error al exportar reporte de descuentos:", error);
    }
  });
});
