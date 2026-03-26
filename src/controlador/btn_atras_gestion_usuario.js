document.addEventListener("DOMContentLoaded", ()=> {

    const btnGestionarUsuarios = document.getElementById(
      "btn_atras_gestion_usuarios",
    );

    if(!btnGestionarUsuarios){
        console.log("No se encontro el boton en el DOM de volver atras gestion usuarios")
       return ;
    }

    btnGestionarUsuarios.addEventListener("click", async()=>{

       console.log("boton atras gestionar usuarios clickeado")

       location.href = "../vista/index.html";
    })
});

