import express from "express";
const router = express.Router();
import getAllEmployee from "../query/get_employee_list.js";

router.get("/employee_list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultados = await getAllEmployee(id);
    res.json(resultados);

  } catch (error) {
    console.error("Error fetching employee list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
