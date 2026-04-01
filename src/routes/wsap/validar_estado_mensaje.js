import express from "express";
const router = express.Router();
import validarEstadoMensaje from "../../query/validar_estado_mensaje.js";

router.post("/wsap/validacion_estado_mensaje", async (req, res) => {
    let { emp_code, fecha } = req.body;
    

    if(!emp_code ){
        return res.status(400).json({error: `el campo emp_code es requerido`})
    }
    if(!fecha ){
        return res.status(400).json({error: `el campo fecha es requerido revisar el formato de fecha, debe ser YYYY-MM-DD HH:MM:SS`})
    }
    try {
        const data = await validarEstadoMensaje(emp_code, fecha);
        res.json(data);
    } catch (error) {
        console.error("ocurrio un error al validar el estado del mensaje, revisar los parametros:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;