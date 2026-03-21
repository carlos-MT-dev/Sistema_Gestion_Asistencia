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
    p.horaMaxEntradaFinSemana
    FROM
    personnel_employee p
    INNER JOIN
    iclock_transaction t ON p.emp_code = t.emp_code
    WHERE t.punch_time BETWEEN ? 
    AND ?
    ORDER BY t.punch_time ASC
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