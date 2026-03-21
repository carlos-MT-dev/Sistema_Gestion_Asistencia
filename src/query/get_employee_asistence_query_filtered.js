import connection from "../conexion/conexion_msql2.js";

async function getAllEmployeeAsistenceFiltrado(FechaInicio, FechaFin, area) {
  const paramFechaInicio = `${FechaInicio} 00:00:00.000`;
  const paramFechaFin = `${FechaFin} 23:59:59.000`;

  let valores = [paramFechaInicio, paramFechaFin];

  let sql = `
    SELECT 
      p.first_name,
      p.emp_code,
      t.punch_time,
      p.position_id,
      p.horaMaxEntrada,
      p.horaMaxEntradaFinSemana
    FROM personnel_employee p
    INNER JOIN iclock_transaction t 
      ON p.emp_code = t.emp_code
    WHERE t.punch_time BETWEEN ? AND ?
  `;

  if (area) {
    sql += " AND p.position_id = ?";
    valores.push(area); 
  }

  sql += " ORDER BY t.punch_time ASC";

  const [rows] = await connection.query(sql, valores);
  return rows;
}

export default getAllEmployeeAsistenceFiltrado;
