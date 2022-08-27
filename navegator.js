
searchformbuton.addEventListener("click", ()=>{
    location.hash = ("#search=" + searchinput.value)
})


function clickvermas(){
    location.hash = "trend"
}

function clicklogo(){
    location.hash = "home"
}
function searchbutton(){
    location.hash = "search"
    
}



const $ = (id) => document.querySelector(id);

const eliminarhijo = function (padre, hijo){
    let d_padre = document.getElementsByClassName(padre);
    let d_hijo = document.getElementsByClassName(hijo);
    let elemento = d_padre.remove(d_hijo)
    console.log(elemento)
}
 
 
 if(!location.hash){
        home()
    }else if(location.hash === "home"){
        home()
    }


window.addEventListener("DOMcontentLoaded" , navigator , false)
window.addEventListener("hashchange" , navigator , false)

function navigator (){
    if(location.hash.startsWith("#trend")){
        trend()

    }
    else if(location.hash.startsWith("#home")){
        home()
    }
    else if(location.hash.startsWith("#category")){
        categoria()
    }
    else if(location.hash.startsWith("#search")){
        search()

    } else if(location.hash.startsWith("")){
        home()

    }
    else {
        home()
    }
}
    

function search() {
        console.log("hola")

        tendencia.classList.add("inactive")
        categoria_titulo.classList.add("inactive")
        trendingpreview.classList.add("inactive")
        quivanlasimgs.classList.add("inactive")
        categorias.classList.add("inactive")
        contenedor_img_categorias.classList.add("inactive")
        tendencia_tv_contenedor.classList.add("inactive")
        

    }



function home(){
    getcategorispreview()
    gettrendingpelis()


    


    tendencia_tv_contenedor.classList.add("inactive")

    trendingpreview.classList.remove("aqui-van-las-imgs-trend")
    trendingpreview.classList.add("tendencias-imagenes")
    tendencias_boton_ver_menos.classList.add("inactive")
    tendencias_boton.classList.remove("inactive")

}


function trend(){
    gettrendingtv()
    getcategorispreview()

    tendencia_tv_contenedor.classList.remove("inactive")
    trendingpreview.classList.remove("tendencias-imagenes")
    trendingpreview.classList.add("aqui-van-las-imgs-trend")

    tendencias_boton_ver_menos.classList.remove("inactive")
    tendencias_boton.classList.add("inactive")

    
    
    /* console.log(categorias)
    categorias.classList.add("inactive")
    categoria_titulo.classList.add("inactive")

    
    trendingpreview.classList.remove("tendencias-imagenes")
    trendingpreview.classList.add("tendencia-arriba-trend")

    tendencias_texto.classList.remove("tendencias-texto")
    tendencias_texto.classList.add("tendencias-texto-trend")
    quivanlasimgs.classList.remove("aqui-van-las-imgs") 
    quivanlasimgs.classList.add("imagenes-trend")  */

    
    
}   


function categoria(){



    tendencia_tv_contenedor.classList.add("inactive")
    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    categorias_botones.classList.add("inactive")
    
    console.log(`estas en ${location.hash}`)

    const [_ , categoryinfo] = location.hash.split("=")
    const [categoryid , categoryname] = categoryinfo.split("-")
    getcategorymovies(categoryid)
    categoria_titulo.textContent = categoryname

    contenedor_img_categorias.classList.remove("inactive")
    img_categorias.classList.remove("inactive")
    
}