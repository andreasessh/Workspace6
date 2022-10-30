function limpiarUsuario(){
  localStorage.removeItem("nombreDeUsuario");
}
if(localStorage.getItem("nombreDeUsuario") != null) {
  let nombreDeCampo = document.getElementById("campoDeUsuario");
  let rellenoDeCampo = "Mi Usuario";
  let nombreDeusuario = localStorage.getItem("nombreDeUsuario"); 
  nombreDeCampo.innerHTML = nombreDeusuario;
 
}




const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
let   productoId= localStorage.getItem("Idproducto");
const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productoId}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productoId}.json`;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"; //Trabajaremos con este URL para el carrito de compras.
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

//Integramos el link al json de autos. Lo hemos vinculado desde el init.js ya que aca tenemos el fetch y no necesitamos volver a escribir todo el codigo.
const AUTOS_URL= "https://japceibal.github.io/emercado-api/cats_products/101.json";
const JUGUETES_URL="https://japceibal.github.io/emercado-api/cats_products/102.json";
const MUEBLES_URL="https://japceibal.github.io/emercado-api/cats_products/103.json";
const HERRAMIENTAS_URL ="https://japceibal.github.io/emercado-api/cats_products/104.json";
const COMPUTADORAS_URL="https://japceibal.github.io/emercado-api/cats_products/105.json";
const VESTIMENTA_URL="https://japceibal.github.io/emercado-api/cats_products/106.json";
const ELECTRODOMESTICOS_URL="https://japceibal.github.io/emercado-api/cats_products/107.json";
const DEPORTE_URL="https://japceibal.github.io/emercado-api/cats_products/108.json";
const CELULARES_URL="https://japceibal.github.io/emercado-api/cats_products/109.json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}