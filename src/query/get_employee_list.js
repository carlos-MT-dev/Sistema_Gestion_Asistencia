import connection from "../conexion/conexion_msql2.js";

async function getAllEmployee() {
  const sql = `
    SELECT 
    first_name,
    emp_code
    FROM
    personnel_employee 
  `;

  const [rows] = await connection.query(sql);
  return rows;

}


export default getAllEmployee;

