document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/employee_list");

    if (!response.ok) {
      console.error("Error al obtener la lista de empleados:", response.status);
      return;
    }

    const data = await response.json();

    const idSelect = "cbb_filtro_area_2";
    const id = "emp_code";
    const campo = "first_name";

    const select = document.getElementById(idSelect);

    if (!select) {
      console.warn(`Elemento #${idSelect} no encontrado`);
      return;
    }

    // LIMPIAR SELECT
    select.innerHTML = `<option value="">SELECCIONAR</option>`;

    // Insertar opciones
    data.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item[id];
      opt.textContent = item[campo];
      select.appendChild(opt);
    });
  } catch (error) {
    console.error("Error en fetch:", error);
  }
});
