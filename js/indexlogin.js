//creamos el DOM para poder editar nuestro html desde js. El DOM tiene una funcion que cuando nosotros presionamos el boton del formulario llama a la funcion de validar formulario

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
//le damos estilos a los labels de error de usuario y clave para que no se muestren al inicializar la pagina
  document.getElementById("errordeusuario").style.display="none";
  document.getElementById("errordeclave").style.display="none";
  
  //esta funcion nos permite verificar que los inputs de usuario y clave no esten vacios para enviar el formulario y redirigirnos a la pagina inicial, en el caso de que 
  //algunos de ellos esta vacio. Como se puede observar nos muestra una alerta y hace visibles los labels de error de usuario o contraseña


function guardarUsuario(){
  let nombreUsuario = document.getElementById("usuario").value;
  localStorage.setItem("nombreDeUsuario",nombreUsuario);

}

   function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('usuario').value;
    if(usuario.length == 0) {
      alert('No has escrito nada en el usuario');
      document.getElementById("errordeusuario").style.display="";

      return;
    }
    var clave = document.getElementById('clave').value;
    if (clave.length < 1) {
      alert('La clave no es válida');
      document.getElementById("errordeclave").style.display="";
      return;
    }
    this.submit();
    
    guardarUsuario();
  }

  //Este es el codigo que nos provee google de la funcion para verificar el login con google
  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    window.location.href="iniciodepagina.html"
   }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "898988692678-p3qtb9mjmmkopl62ki37sodqcksaprsa.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
      google.accounts.id.prompt(); // also display the One Tap dialog
  }
