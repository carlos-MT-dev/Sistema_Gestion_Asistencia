document.addEventListener("DOMContentLoaded", async () => {
  const cbbArea = document.getElementById("cbb_filtro_area_1");

  cbbArea.addEventListener("change", async () => {
    let valorArea = cbbArea.value;

    if (!valorArea) {
      console.warn("No se seleccionó área");
      return;
    }

    try {
      const response = await fetch(`/employee_list/${valorArea}`);

      if (!response.ok) {
        console.error("Error al obtener empleados:", response.status);
        return;
      }

      let data;
      try {
        data = await response.json();
      } catch {
        console.error("Respuesta no válida (no JSON)");
        return;
      }

      if (!data || data.length === 0) {
        console.warn("No se encontraron empleados para el área seleccionada");
        return;
      }

      const select = document.getElementById("cbb_filtro_area_2");

      if (!select) {
        console.warn("Select no encontrado");
        return;
      }

      select.innerHTML = `<option value="">SELECCIONAR</option>`;

      data.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.emp_code;
        opt.textContent = item.first_name;
        opt.setAttribute("data-position-id", item.position_id);
        select.appendChild(opt);
      });
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  });
});
