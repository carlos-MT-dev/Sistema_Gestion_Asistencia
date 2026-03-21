function VerificarTardanza(
  fechaAsistencia,
  horaPunch,
  horaMaxEntrada,
  horaMaxEntradaFinSemana,
  nombreEmpleado,
) {
  const fecha = obtenerFecha(fechaAsistencia);
  const dia = ObtenerNombreDia(fecha);

  const punch = horaAMinutos(horaPunch);
  const horaSemana = horaAMinutos(horaMaxEntrada);
  const horaFinSemana = horaAMinutos(horaMaxEntradaFinSemana);


  console.log("Fecha:", fechaAsistencia);
  console.log("Dia detectado:", dia);

  // Lunes a Viernes
  if (dia >= 0 && dia <= 4) {
    if (punch > horaSemana) {
    
      return "Tarde";
    } else {
     
      return "Temprano";
    }
  }

  // Sábado y Domingo
  else if (dia === 5 || dia === 6) {
    if (punch > horaFinSemana) {
      // console.log(`${nombreEmpleado} llegó tarde`);
      return "Tarde";
    } else {
      // console.log(`${nombreEmpleado} llegó a tiempo`);
      return "Temprano";
    }
  }

  return "Fecha no válida";
}

function ObtenerNombreDia(fechaDelAsistencia) {
  const fecha = new Date(fechaDelAsistencia);
  return fecha.getDay();
}

function obtenerFecha(fechaAsistencia) {
  return fechaAsistencia.split("T")[0];
}

function horaAMinutos(hora) {
  const [h, m, s] = hora.split(":").map(Number);
  return h * 60 + m + s / 60;
}

export default VerificarTardanza;