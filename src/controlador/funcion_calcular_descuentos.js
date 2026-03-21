function calcularDescuentos(
  fechaAsistencia,
  horaPunch,
  horaMaxEntrada,
  horaMaxEntradaFinSemana,
  positionId,
) {
  const fecha = obtenerFecha(fechaAsistencia);
  const dia = ObtenerNombreDia(fecha);
  const punch = horaAMinutos(horaPunch);
  const horaSemana = horaAMinutos(horaMaxEntrada);
  const horaFinSemana = horaAMinutos(horaMaxEntradaFinSemana);

  // Lunes a Viernes
  if (dia >= 0 && dia <= 4) {
    if (punch > horaSemana + 5) {
      if (
        positionId == 2 ||
        positionId == 3 ||
        positionId == 4 ||
        positionId == 5 ||
        positionId == 7 ||
        positionId == 8
      ) {
        return 20; //esto es para personal de estructura
      } else if (positionId == 6) {
        return 10; //esto es para asesores
      } else if (positionId == 9 || positionId == 11) {
        return 2; //esto es para practicantes
      }
    }

    if (punch > horaSemana) {
      if (
        positionId == 2 ||
        positionId == 3 ||
        positionId == 4 ||
        positionId == 5 ||
        positionId == 7 ||
        positionId == 8
      ) {
        return 5; //esto es para personal de estructura
      } else if (positionId == 6) {
        return 3; //esto es para asesores
      } else if (positionId == 9 || positionId == 11) {
        return 2; //esto es para practicantes
      }
    }
    if (punch <= horaSemana) {
      return 0; // a tiempo
    }
  }

  // Sábado y Domingo
  if (dia === 5 || dia === 6) {
    if (punch > horaFinSemana + 5) {
      if (
        positionId == 2 ||
        positionId == 3 ||
        positionId == 4 ||
        positionId == 5 ||
        positionId == 7 ||
        positionId == 8
      ) {
        return 20; //esto es para personal de estructura
      } else if (positionId == 6) {
        return 10; //esto es para asesores
      } else if (positionId == 9 || positionId == 11) {
        return 2; //esto es para practicantes
      }
    }

    if (punch > horaFinSemana) {
      if (
        positionId == 2 ||
        positionId == 3 ||
        positionId == 4 ||
        positionId == 5 ||
        positionId == 7 ||
        positionId == 8
      ) {
        return 5; //esto es para personal de estructura
      } else if (positionId == 6) {
        return 3; //esto es para asesores
      } else if (positionId == 9 || positionId == 11) {
        return 2; //esto es para practicantes
      }
    }
    if (punch <= horaFinSemana) {
      return 0; // a tiempo
    }
  }

  
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

export default calcularDescuentos;
