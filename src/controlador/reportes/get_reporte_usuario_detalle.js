
async function exportExcelDetalle(data) {
  let fechaActual = new Date();

  // Convertir a hoja
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Crear libro
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Descargar archivo
  XLSX.writeFile(
    workbook,
    `Reporte_detalle_${fechaActual.toISOString().split("T")[0]}.xlsx`,
  );
}

export default exportExcelDetalle;
