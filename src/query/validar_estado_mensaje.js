import connection from "../conexion/conexion_msql2.js";


async function validarEstadoMensaje(emp_code, fecha) {
 
    let sql = `
    SELECT 
    e.mobile,
    e.emp_code,
    e.first_name,
    i.env_wsap

    FROM personnel_employee e
    INNER JOIN iclock_transaction i ON e.emp_code = i.emp_code
    WHERE e.emp_code = ? AND i.punch_time = ?; 
    `

    const [rows] = await connection.query(sql, [emp_code, fecha])
    return rows;
}


export default validarEstadoMensaje;


