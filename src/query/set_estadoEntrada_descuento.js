import connection from "../conexion/conexion_msql2.js";

async function setEstadoDescuento() {
  const fechaActual = getFechaActual();

  const paramFechaInicio = `${fechaActual} 00:00:00`;
  const paramFechaFin = `${fechaActual} 23:59:59`;

  const sql = `
    UPDATE iclock_transaction t
    INNER JOIN personnel_employee p 
      ON p.emp_code = t.emp_code
    SET 
      t.entrada_estado = CASE 
        WHEN DAYOFWEEK(t.punch_time) BETWEEN 2 AND 6 THEN
          CASE 
            WHEN TIME_TO_SEC(TIME(t.punch_time)) > TIME_TO_SEC(p.horaMaxEntrada)
              THEN 'Tarde'
            ELSE 'Temprano'
          END
        WHEN DAYOFWEEK(t.punch_time) IN (1,7) THEN
          CASE 
            WHEN TIME_TO_SEC(TIME(t.punch_time)) > TIME_TO_SEC(p.horaMaxEntradaFinSemana)
              THEN 'Tarde'
            ELSE 'Temprano'
          END
      END,

      t.descuento = CASE 
        WHEN DAYOFWEEK(t.punch_time) BETWEEN 2 AND 6 THEN
          CASE 
            WHEN TIME_TO_SEC(TIME(t.punch_time)) > TIME_TO_SEC(p.horaMaxEntrada) + 300 THEN
              CASE 
                WHEN p.position_id IN (2,3,4,5,7,8) THEN 20
                WHEN p.position_id = 6 THEN 10
                WHEN p.position_id IN (9,11) THEN 2
                ELSE 0
              END
            WHEN TIME_TO_SEC(TIME(t.punch_time)) > TIME_TO_SEC(p.horaMaxEntrada) THEN
              CASE 
                WHEN p.position_id IN (2,3,4,5,7,8) THEN 5
                WHEN p.position_id = 6 THEN 3
                WHEN p.position_id IN (9,11) THEN 2
                ELSE 0
              END
            ELSE 0
          END
        WHEN DAYOFWEEK(t.punch_time) IN (1,7) THEN
          CASE 
            WHEN TIME_TO_SEC(TIME(t.punch_time)) > TIME_TO_SEC(p.horaMaxEntradaFinSemana) + 300 THEN
              CASE 
                WHEN p.position_id IN (2,3,4,5,7,8) THEN 20
                WHEN p.position_id = 6 THEN 10
                WHEN p.position_id IN (9,11) THEN 2
                ELSE 0
              END
            WHEN TIME_TO_SEC(TIME(t.punch_time)) > TIME_TO_SEC(p.horaMaxEntradaFinSemana) THEN
              CASE 
                WHEN p.position_id IN (2,3,4,5,7,8) THEN 5
                WHEN p.position_id = 6 THEN 3
                WHEN p.position_id IN (9,11) THEN 2
                ELSE 0
              END
            ELSE 0
          END
      END

    WHERE t.punch_time BETWEEN ? AND ?;
  `;

  const [result] = await connection.query(sql, [
    paramFechaInicio,
    paramFechaFin,
  ]);

  console.log("Filas afectadas:", result.affectedRows);
  return result;
}

export default setEstadoDescuento;

function getFechaActual() {
  const fecha = new Date();
  return fecha.toISOString().split("T")[0];
}
