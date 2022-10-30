let listaDeAutos = [];
let maximo = document.getElementById("costoMayor")
let minimo = document.getElementById("costoMinimo")
let filtro = document.getElementById("filtrar")
let limpiar = document.getElementById("limpiar")
let ascendente = document.getElementById("btnAscendente")
let descendente = document.getElementById("btnDescendente")
let relevancia = document.getElementById("btnRelevancia")
let costo_minimo = undefined;
let costo_maximo = undefined;
let busqueda = document.getElementById("Busqueda")
// creamos un array que va a contener los elementos del json de autos.

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM.
function guardarIdproducto(id) {
    localStorage.setItem("Idproducto", id);

    window.location.href = "product-info.html";

}

function mostrarListaDeAutos(array){
    let htmlContentToAppend = "";
    console.log(array);
    
    //el for lo utilizamos para hacer un recorrido por cada elemento del array de autos, posteriormente utilizamos un string template para crea el listado de autos
    //con la ayuda de boostraps utilizando el list group.
    for(let i = 0; i < array.length; i++){ 
        let autos = array[i];
        console.log(autos);
        if (((costo_minimo == undefined) || (costo_minimo != undefined && parseInt(autos.cost) >= costo_minimo)) &&
                ((costo_maximo == undefined) || (costo_maximo != undefined && parseInt(autos.cost) <= costo_maximo))) {
                    
        
        htmlContentToAppend += `
        <div onclick="guardarIdproducto(`+autos.id+`)"; class="list-group-item list-group-item-action contenedorProductos">
            <div class="row">
                <div class="col-3">
                    <img src="` + autos.image + `" alt="product image" class="img-thumbnail" style="border-radius:25px; background-color:#5B2C6F;">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between;">
                        <div class="mb-1">
                        <h2 style=" font-weight:bolder; color:#6C3483;">`+ autos.name +`</h2> 
                        <p class = "estiloDeLetra" "colorDeLetra"> `+ autos.description + `</p> 
                        </div>
                        <small class = "estiloDeLetra">` + autos.cost + ` `+  autos.currency +` </small>
                         
                        <small class = "estiloDeLetra">` + autos.soldCount + ` cantidad vendidos </small>
                        

                    </div>

                </div>
            </div>
        </div>
        `
                }
        //aca identificamos el div contenedor del porducts html donde vamos a mandar la lista de autos y lo escribimos gracias al innerhtml que nos permite
        //que el HTML nos reconozca las etiquetas que estamos mandando en el el template que contiene el HTML contentToAppend.
        document.getElementById('autos-list-container').innerHTML = htmlContentToAppend; 
    }
}



// creoamos el DOM para editar el html desde js y este DOM nos permite obtener la lista de autos, desde AUTOS_URL. 
//lo que hace esta funcion es verificar los datos del json y si esta todo bien los almacena en nuestro array listaDeAutos
//posteriormente llamamos a la funcion listaDeAutos.
document.addEventListener("DOMContentLoaded", function(e){

    let catID = localStorage.getItem("catID");
    let listaDeProductos;
    if (catID == 101){
        listaDeProductos = AUTOS_URL;
    } else if (catID == 102){
        listaDeProductos = JUGUETES_URL;
    }
    else if (catID == 103){
        listaDeProductos = MUEBLES_URL
    }
    else if (catID == 104){
        listaDeProductos = HERRAMIENTAS_URL
    }
    else if (catID == 105){
        listaDeProductos = COMPUTADORAS_URL
    }
    else if (catID == 106){
        listaDeProductos = VESTIMENTA_URL
    }
    else if (catID == 107){
        listaDeProductos = ELECTRODOMESTICOS_URL
    }
    else if (catID == 108){
        listaDeProductos = DEPORTE_URL
    }
   




    getJSONData(listaDeProductos).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            listaDeAutos = resultObj.data.products;
            mostrarListaDeAutos(listaDeAutos);
        }
    });
    
    filtro.addEventListener ("click", function() {
        costo_minimo = minimo.value;
        costo_maximo = maximo.value;

        if (costo_minimo != undefined && costo_minimo != "" && parseInt(costo_minimo) >= 0) {
            costo_minimo = parseInt(costo_minimo);
        } else {
            costo_minimo = undefined;
        }

        if (costo_maximo != undefined && costo_maximo != "" && parseInt(costo_maximo) >= 0) {
            costo_maximo = parseInt(costo_maximo);
        } else {
            costo_maximo = undefined;
        }
           mostrarListaDeAutos(listaDeAutos);


    });
    limpiar.addEventListener("click", function(){
    minimo.value="";
    maximo.value="";
    costo_minimo=undefined;
    costo_maximo=undefined;

    (mostrarListaDeAutoslistaDeAutos);

});
ascendente.addEventListener("click", function(){
let productoEnOrden=[];
let productosAOrdenar=listaDeAutos;
productoEnOrden=productosAOrdenar.sort(function(datoa, datob){
    return datoa.cost - datob.cost;
});
mostrarListaDeAutos(productoEnOrden);

});

descendente.addEventListener("click", function(){
let productoEnOrden=[];
let productosAOrdenar=listaDeAutos;
productoEnOrden=productosAOrdenar.sort(function(datoa, datob){
    return datob.cost - datoa.cost;

})
mostrarListaDeAutos(productoEnOrden);


});

relevancia.addEventListener("click", function(){
let productoEnOrden=[];
let productosAOrdenar=listaDeAutos;
productoEnOrden=productosAOrdenar.sort(function(datoa, datob){
    return datob.soldCount - datoa.soldCount;
})
mostrarListaDeAutos(productoEnOrden);

});

});
//DESAFIATE
busqueda.addEventListener("keyup", function(a){

   let buscar = a.target.value
   let objetosFiltrados = listaDeAutos.filter(objetos =>{
   return objetos.name.toLowerCase().includes(buscar) || objetos.description.toLowerCase().includes(buscar); 

   });
   console.log(objetosFiltrados);
   mostrarListaDeAutos(objetosFiltrados);

});
