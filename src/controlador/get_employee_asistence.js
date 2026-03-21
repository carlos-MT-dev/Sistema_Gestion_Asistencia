
import ListarTablas from "../controlador/funcion_listar_tabla_assitencias.js"

document.addEventListener("DOMContentLoaded", async function () {
    

    const response = await fetch("/employee_asistencia")
    const data = await response.json();
    
    const tableBody = document.getElementById("employeeTableBody");

    ListarTablas(data, tableBody);

})