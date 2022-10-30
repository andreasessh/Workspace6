let info_producto = []
let comentario_P = []
let pRelacionados = []
let compra = []




function comprar(id){
  if (localStorage.getItem("selectproducts2") !=null){
    compra = JSON.parse(localStorage.getItem("selectproducts2"));
  }
 if (!compra.includes(id)){
  compra.push(id);
  localStorage.setItem("selectproducts2",JSON.stringify(compra));
 }
  
}




function guardarIdproducto(id) {
    localStorage.setItem("Idproducto", id);

    window.location.href = "product-info.html";

}

function showRelacionados(array){
    let contenido = "";
    console.log(array)
    for(let x=0; x<array.length;x++){
        let producto = array[x];
        console.log(producto);
        contenido+=`<div onclick="guardarIdproducto(${producto.id})" class="card id_producto" style="width: 18rem;">
        <img src="${producto.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">${producto.name}</p>
        </div>
      </div>
      `;
    }

    document.getElementById("productosRelacionados").innerHTML=contenido;
}

function mostrarListaDeAutos(array,arrayC){
    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";
    
    console.log(array);
    
     
  
                        
        htmlContentToAppend +=`
        
        <div class="list-group-item list-group-item-action contenedorProductos">
            <div>
               
                <div class="d-flex w-80 justify-content-between">
                    <div class=" w-100 justify-content-between">
                        <div>
                        <h2 class = "text-center" style=" font-weight:bolder; color:#6C3483;">`+ array.name +`</h2> 
                        <br>
                    
                        <div class="w-100 text-end">
                        <button onclick="comprar(${array.id})" class="BotonFiltrar">Añadir al carrito</button>
                        </div>
                  
                        <br>

                        <p class = "estiloDeLetra colorDeLetra"> `+ array.description + `</p> 
                        <p class = "estiloDeLetra"> <strong>Precio:</strong> ` + array.cost + ` `+  array.currency +` </p>
                         
                        <p class = "estiloDeLetra">` + array.soldCount + ` cantidad vendidos </p>
                        </div>
                        <br>
                        
        
                    </div>

                </div>
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/prod${productoId}_1.jpg" class="d-block w-90 h-20 m-auto" alt="..." style="background-color:#6C3483 ; border-radius:20%; border:5px solid #6C3483">
    </div>
    <div class="carousel-item">
      <img src="img/prod${productoId}_2.jpg" class="d-block w-90 h-20 m-auto" alt="..." style="background-color:#6C3483 ; border-radius:20%; border:5px solid #6C3483">
    </div>
    <div class="carousel-item">
      <img src="img/prod${productoId}_3.jpg" class="d-block w-90 h-20 m-auto" alt="..." style="background-color:#6C3483 ; border-radius:20%; border:5px solid #6C3483">
    </div>
    <div class="carousel-item">
      <img src="img/prod${productoId}_4.jpg" class="d-block w-90 h-20 m-auto" alt="..." style="background-color:#6C3483 ; border-radius:20%; border:5px solid #6C3483">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style="background-color:#6C3483">
    <span class="carousel-control-prev-icon" aria-hidden="true" ></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style="background-color:#6C3483">
    <span class="carousel-control-next-icon" aria-hidden="true"  ></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

                
        </div>
        
        
        `
         for(let x=0; x<arrayC.length;x++){ //Recorrido de un array
            let comentario= arrayC[x];
            let puntuacion= "";
            console.log(arrayC)

            for(let y=1; y<= comentario.score; y++){

            puntuacion +=`<span class= "fa fa-star checked"></span>`;}
            for (let y=comentario.score+1; y<=5; y++){
                puntuacion +=`<span class= "fa fa-star"></span>`;}

            

            htmlContentToAppend2+=`
            
            <hr>
           <div class="container">
           <p>${comentario.user}escribio:</p>
           <p>${comentario.description} <div style="text-align:right;">${puntuacion}</div>
           </p>
           <p>${comentario.dateTime}</p>
           
           
           
           </div>
`}

                
        
        document.getElementById('lista_de_productos').innerHTML = htmlContentToAppend; 
        document.getElementById("comments_info").innerHTML = htmlContentToAppend2;
    }



document.addEventListener("DOMContentLoaded", function(e){
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        comentario_P = resultObj.data;
        
    }
});

getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
        info_producto = resultObj.data;
        pRelacionados = info_producto.relatedProducts;
        mostrarListaDeAutos(info_producto,comentario_P);
        showRelacionados(pRelacionados);
        
    
    }
});


});

