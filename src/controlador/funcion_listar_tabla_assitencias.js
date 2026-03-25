

function ListarTablas(data, tableBody) {



  data.forEach((element) => {
    let formatearHora = element.punch_time.split(" ")[1].split(".")[0];
    let formatearFecha = element.punch_time.split(" ")[0];


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
    estadoAsistCell.textContent = element.entrada_estado;  //este

    const descuentoCell = document.createElement("td");
    descuentoCell.textContent =  `${element.descuento} Soles` ;  //este

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
