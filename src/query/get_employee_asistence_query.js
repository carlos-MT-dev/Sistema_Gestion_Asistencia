import connection from "../conexion/conexion_msql2.js";

async function getAllEmployeeAsistence() {

const fechaActual = getFechaActual();
const paramFechaInicio = `${fechaActual} 00:00:00.000`;
const paramFechaFin = `${fechaActual} 23:59:59.000`;




  const sql = `
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
ORDER BY p.first_name ASC, t.punch_time ASC;
    `;

  const [rows] = await connection.query(sql, [paramFechaInicio, paramFechaFin]);
  return rows;
}



const resultados = await getAllEmployeeAsistence();
console.log(resultados);

export default resultados ;



function getFechaActual(){
  const fecha = new Date();
  return fecha.toISOString().split('T')[0];
}