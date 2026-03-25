document.addEventListener("DOMContentLoaded", ()=> {

    const btnGestionarUsuarios = document.getElementById(
      "btn_gestion_usuarios",
    );

    if(!btnGestionarUsuarios){
        console.log("No se encontro el boton en el DOM")
       return ;
    }

    btnGestionarUsuarios.addEventListener("click", async()=>{

       console.log("boton gestionar usuarios clickeado")

       location.href = "../vista/gestionar_usuarios.html";
    })
});

