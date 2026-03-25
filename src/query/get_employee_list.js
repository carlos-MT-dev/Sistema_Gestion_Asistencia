import connection from "../conexion/conexion_msql2.js";

async function getAllEmployee(id) {
  const sql = `
    SELECT 
    first_name,
    emp_code,
    position_id
    FROM
    personnel_employee 
    WHERE position_id = ?
  `;

  const [rows] = await connection.query(sql, [id]);
  return rows;

}


export default getAllEmployee;

