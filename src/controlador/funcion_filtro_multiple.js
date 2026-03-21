import ListarTablas  from "../controlador/funcion_listar_tabla_assitencias.js";


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn_filtrar_fecha");
  const form = document.getElementById("form_filtros");

  if (!btn || !form) {
    console.error("No se encontraron los elementos en el DOM");
    return; // 👈 importante para evitar errores
  }

  btn.addEventListener("click", async () => {
    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData);

      const response = await fetch(`/employee_asistencia/filtrada`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();

      console.log("Datos filtrados:", data);

      const tableBody = document.getElementById("employeeTableBody");
      tableBody.innerHTML = "";

      ListarTablas(data, tableBody);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
