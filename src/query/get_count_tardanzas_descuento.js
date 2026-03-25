import connection from "../conexion/conexion_msql2.js";

async function getDescuentoTardanzas(fechaInicio, fechaFin, area) {
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
    WHERE t.punch_time BETWEEN ? AND ?
    AND t.entrada_estado IS NOT NULL
  `;

  if (area) {
    sql += " AND p.position_id = ?";
    valores.push(area);
  }

  sql += " GROUP BY p.emp_code, p.first_name ORDER BY p.emp_code ASC";

  const [rows] = await connection.query(sql, valores);
  return rows;
}

export default getDescuentoTardanzas;
