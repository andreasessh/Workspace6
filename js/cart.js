//Confirmacion de compra
function validacion(){
     document.getElementById("main").innerHTML =  `<div class="alert alert-success" role="alert" id="alert-success">
     Gracias por tu compra :)!
   </div>`
 
 }
//Validacion Formulario
(() => {
     'use strict'
 
     const forms = document.querySelectorAll('.needs-validation')
     Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
               if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
               }else{
                 validacion();
               }
               form.classList.add('was-validated')
          }, false)
     })
 })()

 //Variables
let productosComprados= [];
let linksproducts=[];
let pdeEnvio;
//Entrega 6!!!
let subtotalGeneral= document.getElementById("subtotalGeneral");
let costoTotal= document.getElementById("costoTotal");
let envioSelect = document.getElementsByName("envioSelect");
let tabla = document.getElementById("tablaCarrito");
//Modal
let NrodeCuenta = document.getElementById("NrodeCuenta");
let NroTarjeta = document.getElementById("NroTarjeta");
let Transferencia = document.getElementById("Transferencia");
let Vencimiento = document.getElementById("Vencimiento");
let CodSeguridad = document.getElementById("CodSeguridad");
let TarjCredit = document.getElementById("TarjCredit");
let alertaModal = document.getElementById("alertaModal");
alertaModal.style.display = "inline";

//Cuando agregamos o sacamos un atributo, dentro del parentesis, 
//irian el nombre del atributo y el valor. En este caso, las comillas vacias indican que el valor esta vacio. 

if (TarjCredit.checked){
    NroTarjeta.removeAttribute("disabled", "");
    NroTarjeta.setAttribute("required", "");
    CodSeguridad.removeAttribute("disabled", "");
    CodSeguridad.setAttribute("required", "");
    Vencimiento.removeAttribute("disabled", "");
    Vencimiento.setAttribute("required", "");

    NrodeCuenta.setAttribute("disabled", "");
    NrodeCuenta.removeAttribute("required", "");
     
     }

     let transOtarjeta;

function metodoPago(){
    let metodoDePago = document.getElementsByName("tipoDepago");
    for(let i = 0; i < metodoDePago.length; i++){
        let pagoElemento = metodoDePago[i];
        if(pagoElemento.checked){
            transOtarjeta = pagoElemento.value;
        }
    }
    if(transOtarjeta == 1){
        NroTarjeta.removeAttribute("disabled", "");
        NroTarjeta.setAttribute("required", "");
        CodSeguridad.removeAttribute("disabled", "");
        CodSeguridad.setAttribute("required", "");
        Vencimiento.removeAttribute("disabled", "");
        Vencimiento.setAttribute("required", "");

        NrodeCuenta.setAttribute("disabled", "");
        NrodeCuenta.removeAttribute("required", "");
        if(NroTarjeta.value !== "" && CodSeguridad.value !== "" && Vencimiento.value !== ""){
            alertaModal.style.display="none";
        }else{
            alertaModal.style.display="inline";
        }
    }
    if(transOtarjeta == 2){
        NroTarjeta.setAttribute("disabled", "");
        NroTarjeta.removeAttribute("required", "");
        CodSeguridad.setAttribute("disabled", "");
        CodSeguridad.removeAttribute("required", "");
        Vencimiento.setAttribute("disabled", "");
        Vencimiento.removeAttribute("required", "");

        NrodeCuenta.removeAttribute("disabled", "");
        NrodeCuenta.setAttribute("required", "");
        if(NrodeCuenta.value !== ""){
            alertaModal.style.display="none";
        }else{
            alertaModal.style.display="inline";
        }
    }

}

     



function calculoDeEnvio(){
     let costoXenvio= document.getElementById("costoXenvio");
     let envioSelect = document.getElementsByName("envioSelect");
     for(let i=0; i<envioSelect.length;i++){
         let tipoDeEnvio=envioSelect[i];
         console.log(tipoDeEnvio);
         if(tipoDeEnvio.checked){
          pdeEnvio=tipoDeEnvio.value;
          console.log(pdeEnvio);
         }
     }
     let sTotal=parseInt(subtotalGeneral.innerHTML);
     let costoDeEnvio=Math.round((pdeEnvio/100)*sTotal);
     costoXenvio.innerHTML=costoDeEnvio;
     costoTotal.innerHTML=Math.round(costoDeEnvio+sTotal);
}


function subTotales(){
     let subTotales=document.getElementsByClassName("subTotales");
     let sumaTotales=0;
     for (let i = 0; i < subTotales.length; i++) {
          sumaTotales+= parseInt(subTotales[i].innerHTML)
          
     }

     subtotalGeneral.innerHTML=sumaTotales;
     calculoDeEnvio();
     
}





function subTotal(id,costo){
     //console.log(id);
     let cantidad=parseInt(document.getElementById(`cantidad${id}`).value);
     let subtotalFinal=cantidad*costo;
     let labelsubTotal=document.getElementById(`subTotal${id}`);
     labelsubTotal.innerHTML=subtotalFinal;
     subTotales();
}
let cantidad = 1;

(() => {
     'use strict'

     
     const forms = document.querySelectorAll('.needs-validation')

     Array.from(forms).forEach(form => {
          
          form.addEventListener('submit', event => {
               if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
               }


               form.classList.add('was-validated')
          }, false)
     })
})()


//let productoCarts= [];
function mostrarProducto(array){
let producto=array[0];
tabla.innerHTML+= `<table class="estiloDeLetra table table-hover">



<thead>
  
</thead>
<tbody>
  <tr>
    <th class=" col-1">${producto.name}</th>
    <td class=" col-1"><img src="${producto.image}" class="imgTable"></td>
    <td class=" col-1">${producto.currency}${producto.unitCost}</td>
    <td class=" col-1"><input id="cantidad${producto.id}" class="text-center botonesFiltrado" type="number" min="1" max="9999" value="${producto.count}" onchange="subTotal(${producto.id},${producto.unitCost})"></td>
    <td class=" col-1"><label class="subTotales" id="subTotal${producto.id}">${producto.unitCost*producto.count}</label><label>${producto.currency} </label></td> 
<td class="col-1"><button type="button" class="btn btn-secondary btn-sm botonesFiltrado"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
</svg></button></td>
</tbody>
</table>`

subTotales();
}


function mostrarProducto2(producto){
     
     tabla.innerHTML+= `<table class="estiloDeLetra table table-hover">
     <thead>
       
     </thead>
     <tbody>
       <tr>
         <th class="col-1">${producto.name}</th>
         <td class="col-1"><img src="img/prod${producto.id}_1.jpg" class="imgTable"></td>
         <td class="col-1">${producto.currency}${producto.cost}</td>
         <td class="col-1"><input id="cantidad${producto.id}" class="text-center botonesFiltrado" type="number" min="1" max="9999" value="${cantidad}" onchange="subTotal(${producto.id},${producto.cost})"></td>
         <td class="col-1"><label class="subTotales" id="subTotal${producto.id}">${producto.cost*cantidad}</label><label>${producto.currency}</label></td>
<td class="col-1"><button type="button" class="btn btn-secondary btn-sm botonesFiltrado"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
</svg></button></td> 
     </tbody>
     </table>`
     subTotales();
     }

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
         if (resultObj.status === "ok") {
              
              productoCarts = resultObj.data.articles;
              mostrarProducto(productoCarts);
              
              console.log(productoCarts)

         }
    });
productosComprados=JSON.parse(localStorage.getItem("selectproducts2"));
for (let i=0; i<productosComprados.length; i++){
     let idproducto = productosComprados[i];
     let linkproducto = `https://japceibal.github.io/emercado-api/products/`+idproducto+`.json`;
     if (!linksproducts.includes(linkproducto)){
          linksproducts.push(linkproducto);
          console.log(linksproducts);
     }
}
for (let i=0; i<linksproducts.length; i++){
     let URL = linksproducts[i];
     getJSONData(URL).then(function (resultObj) {
          if (resultObj.status === "ok") {
               
               newproduct = resultObj.data;
               mostrarProducto2(newproduct);
               
 
          }
     });
     
}

for (let i = 0; i < envioSelect.length; i++) {
     envioSelect[i].addEventListener("change",function(){
          subTotales();
     }) ;
     
}
calculoDeEnvio();



});






