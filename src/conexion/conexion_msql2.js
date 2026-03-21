import mysql from "mysql2/promise";

// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "biotime",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   timezone: "-05:00",
//   dateStrings: true, 
// });


const connection = mysql.createPool({
  host: "192.168.1.22", 
  user: "glosap", 
  password: "C33POQU33N", 
  database: "biotime", 
  port: 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "-05:00",
  dateStrings: true,
});

export default connection;
