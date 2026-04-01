async function validarEstadoMensaje(emp_code, fecha) {
  try {
    const response = await fetch("/wsap/validacion_estado_mensaje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emp_code, fecha }),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default validarEstadoMensaje;

