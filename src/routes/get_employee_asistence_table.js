
import express from "express";
const router = express.Router();
import resultados from "../query/get_employee_asistence_query.js";


router.get("/employee_asistencia", (req,res)=>{

    res.json(resultados);

})

export default router;