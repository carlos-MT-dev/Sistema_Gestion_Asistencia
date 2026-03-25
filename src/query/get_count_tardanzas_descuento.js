import connection from "../conexion/conexion_msql2.js";

async function getDescuentoTardanzas(fechaInicio, fechaFin, area, empleado) {
  const paramFechaInicio = `${fechaInicio} 00:00:00.000`;
  const paramFechaFin = `${fechaFin} 23:59:59.000`;

  let valores = [paramFechaInicio, paramFechaFin];

  let sql = `
    SELECT 
      p.first_name,
      p.emp_code,
      COUNT(CASE WHEN t.entrada_estado = 'Tarde' THEN 1 END) AS tardanzas,
      SUM(t.descuento) AS total_descuento
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

    WHERE t.entrada_estado IS NOT NULL
  `;


  if (area) {
    sql += " AND p.position_id = ?";
    valores.push(area);
  }

  if (empleado) {
    sql += " AND p.emp_code = ?";
    valores.push(empleado);
  }

  sql += " GROUP BY p.emp_code, p.first_name ORDER BY p.emp_code ASC";

  const [rows] = await connection.query(sql, valores);
  return rows;
}

export default getDescuentoTardanzas;
