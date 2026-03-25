import ListarTablas  from "./funcion_listar_tabla_assitencias.js";
import  ListarTablaDetalle from "./funcion_listar_tabla_asistencias_detalle.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn_filtrar_fecha_detalle_usuarios");
  const form = document.getElementById("form_filtros_detalle_usuarios");

 
  if(!btn){
    console.error("No se encontró el botón en el DOM");
  }else if(!form){
    console.log("no se encontro el formulario en el dom")
  }

  btn.addEventListener("click", async () => {
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

      const { resultadosFiltro, resDescTardanzas } = await response.json();

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
      console.error("Error:", error);
    }
  });
});
