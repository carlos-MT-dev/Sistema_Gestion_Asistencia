

function ListarTablaDetalle(data, tableBody) {


  data.forEach((element) => {
    

    const row = document.createElement("tr");


    
    const nameCell = document.createElement("td");
    nameCell.textContent = element.first_name;

    const codeCell = document.createElement("td");
    codeCell.textContent = element.emp_code;

    const tardanzasCell = document.createElement("td");
    tardanzasCell.textContent = element.tardanzas;

    const descuentoCell = document.createElement("td");
    descuentoCell.textContent = element.total_descuento;


    row.appendChild(nameCell);
    row.appendChild(codeCell);
    row.appendChild(tardanzasCell);
    row.appendChild(descuentoCell);

    tableBody.appendChild(row);
  });
}

export default ListarTablaDetalle;
