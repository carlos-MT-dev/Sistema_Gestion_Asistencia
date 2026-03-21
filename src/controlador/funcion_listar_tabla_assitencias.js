import VerificarTardanza from "../controlador/funcion_verificar_tardanza.js";
import calcularDescuentos from "../controlador/funcion_calcular_descuentos.js";

function ListarTablas(data, tableBody) {
  // function VerificarTardanza(fechaAsistencia, horaPunch, horaMaxEntrada, horaMaxEntradaFinSemana, nombreEmpleado)

  data.forEach((element) => {
    let formatearHora = element.punch_time.split(" ")[1].split(".")[0];
    let formatearFecha = element.punch_time.split(" ")[0];

    let descuento = calcularDescuentos(
      formatearFecha,
      formatearHora,
      element.horaMaxEntrada,
      element.horaMaxEntradaFinSemana,
      element.position_id
    );

    let estadoAsistencia = VerificarTardanza(
      formatearFecha,
      formatearHora,
      element.horaMaxEntrada,
      element.horaMaxEntradaFinSemana,
      element.first_name,
    );


   
 


    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = element.first_name;

    const codeCell = document.createElement("td");
    codeCell.textContent = element.emp_code;

    const punchTimeCell = document.createElement("td");
    punchTimeCell.textContent = formatearHora;

    const punchFechaCell = document.createElement("td");
    punchFechaCell.textContent = formatearFecha;

    const estadoAsistCell = document.createElement("td");
    estadoAsistCell.textContent = estadoAsistencia;

    const descuentoCell = document.createElement("td");
    descuentoCell.textContent =  `${descuento} Soles` ;

    row.appendChild(nameCell);
    row.appendChild(codeCell);
    row.appendChild(punchFechaCell);
    row.appendChild(punchTimeCell);
    row.appendChild(estadoAsistCell);
    row.appendChild(descuentoCell);
    

    tableBody.appendChild(row);
  });
}

export default ListarTablas;
