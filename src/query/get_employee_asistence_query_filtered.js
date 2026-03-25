import connection from "../conexion/conexion_msql2.js";

async function getAllEmployeeAsistenceFiltrado(FechaInicio, FechaFin, area, empleado) {
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
  p.horaMaxEntradaFinSemana,
  t.entrada_estado,
  t.descuento
FROM personnel_employee p
INNER JOIN iclock_transaction t 
  ON p.emp_code = t.emp_code
INNER JOIN (
    SELECT 
        emp_code,
        DATE(punch_time) AS fecha,
        MIN(punch_time) AS primer_punch
    FROM iclock_transaction
    WHERE punch_time BETWEEN ? AND ?
    GROUP BY emp_code, DATE(punch_time)
) AS first_punch
ON t.emp_code = first_punch.emp_code
AND DATE(t.punch_time) = first_punch.fecha
AND t.punch_time = first_punch.primer_punch
WHERE 1=1
  `;

  
  if (area) {
    sql += " AND p.position_id = ?";
    valores.push(area);
  }

  if (empleado) {
   sql += " AND p.emp_code = ?";
   valores.push(empleado);
  }

  sql += " ORDER BY p.first_name ASC, t.punch_time ASC";

  const [rows] = await connection.query(sql, valores);
  return rows;
}

export default getAllEmployeeAsistenceFiltrado;
