const urltrendingmovies ="/trending/movie/week?api_key="
const urlcategorymovies = "/discover/movie"
let infinitescroll;



let numpage = 1 





window.addEventListener("DOMContentLoaded" , navigator2 , false)
window.addEventListener("hashchange" , navigator2 , false)
window.addEventListener("scroll" , infinitescroll , false)



searchformbuton.addEventListener("click", ()=> {location.hash = ("search-" + searchinput.value)})


    flecha_button.addEventListener("click", ()=>{
        history.back()

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
clicklogo()


async function navigator2(){

    if(infinitescroll){
        window.removeEventListener("scroll", infinitescroll ,  false)
        infinitescroll = undefined
    }

    if(location.hash.startsWith("#trend")){
        trend()
        numpage  = 1

    }
    else if(location.hash.startsWith("#home")){
        home()
        console.log("home")
        numpage  = 1

    }
    else if(location.hash.startsWith("#category")){
        categoria()

    }
    else if(location.hash.startsWith("#search")){
        search()
        

    } else if(location.hash.startsWith("#tv")){
        tv()

    }else if(location.hash.startsWith("#moretrending")){
        moretrending()
               

    }else if(location.hash != "#movie=!0100"){
        movie()
        

    }
    
    
    else if(location.hash.startsWith("")){
        trendingpreview.innerHTML = ""
        home()


    }
    
    else {
        trendingpreview.innerHTML = ""
        home()

    }
    if(infinitescroll){
        window.addEventListener("scroll", infinitescroll , false)
    }
  
}

async function movie() {

    
    const { data } = await api("/movie/popular?api_key=" + apikey);
    const movies = data.results;
    trendingpreview.classList.add("inactive2") 
    titulo_peliculas_favoritas.classList.add("inactive")


    detail.classList.remove("inactive")
    div_boton.classList.remove("inactive")
    peliculas_favoritas.classList.add("inactive2")
    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    peliculas_favoritas.classList.add("inactive")
    tendencia_tv_contenedor.classList.add("inactive")
    categoria_titulo.classList.add("inactive")
    categorias.classList.add("inactive")
    contenedor_img_categorias.classList.add("inactive")
    tendencia.classList.add("inactive")   
     peliculas_similares_y_categorias.classList.remove("inactive")


    
    const [_ , moviebyID , moviename] = location.hash.split("=")
    

         getmoviedetailsmovies( moviebyID, "original_title" ,movies , "movie")
     
}
async function tv() {

    console.log("hola")

    const { data } = await api("/tv/popular?api_key=" + apikey);
    const movies = data.results;
    peliculas_favoritas
    const [_ , moviebyID , moviename] = location.hash.split("=")
    
    const movienamesplit = moviename.split("%20")
    const moviejuntado = movienamesplit.join(" ")
    titulo_peliculas_favoritas.classList.add("inactive")

    detail.classList.remove("inactive")
    div_boton.classList.remove("inactive")
    pelis_sim.classList.remove("inactive")
    contenedor_de_la_imagen_recomendadasvs.classList.remove("inactive")
    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    peliculas_favoritas.classList.add("inactive2")
    trendingpreview.classList.add("inactive")
    tendencia_tv_contenedor.classList.add("inactive")
    categoria_titulo.classList.add("inactive")
    categorias.classList.add("inactive")
    contenedor_img_categorias.classList.add("inactive")
    tendencia.classList.add("inactive")
    peliculas_similares_y_categorias.classList.add("inactive")
    pelis_sim.classList.add("inactive")
    contenedor_de_la_imagen_recomendadasvs.innerHTML = ""
        trendingpreview.classList.add("inactive2") 


    console.log(movies.id)
    
    getmoviedetailstvs(moviebyID, movies)
}

async function search() {
      
    div_boton.classList.remove("inactive")

    detail.classList.add("inactive")
    trendingpreview.classList.add("inactive2") 
    peliculas_favoritas.classList.add("inactive2") 

        contenedor_img_categorias.classList.remove("inactive")
        img_categorias.classList.remove("inactive")
        quivanlasimgs.classList.add("inactive")
        tendencia.classList.add("inactive")
        trendingpreview.classList.add("inactive")
        tendencia_tv_contenedor.classList.add("inactive")
        categoria_titulo.classList.add("inactive")
        categorias.classList.add("inactive")
    titulo_peliculas_favoritas.classList.add("inactive")

        const  query = location.hash.split("-")[1]
        getsearchmovies(query)
        console.log(query) 
        infinitescroll = scrollformorecontentofsearch(query)
        
     }

function home(){
    trendingpreview.innerHTML = ""
    getcategorispreview()
    gettrendingpelis() 
    getlikedmoviesimage()
    titulo_peliculas_favoritas.classList.remove("inactive")

    scrollbartendencias.classList.remove("inactive")
    detail.classList.add("inactive")
    tendencia.classList.remove("inactive")
    trendingpreview.classList.remove("inactive2")
    categorias.classList.remove("inactive")
    quivanlasimgs.classList.remove("inactive")
    categorias_botones.classList.remove("inactive")
    peliculas_favoritas.classList.remove("inactive2")
    botondecargarmas.classList.add("inactive2")
    contenedor_img_categorias.classList.add("inactive")
    
    div_boton.classList.add("inactive")
    tendencia_tv_contenedor.classList.add("inactive")
    
    tendencias_boton_ver_menos.classList.add("inactive")
    tendencias_boton.classList.remove("inactive")
    categoria_titulo.textContent = "categorias"

}


function trend(){
    quivanlasimgs.innerHTML = ""

    gettrendingtv()
    getcategorispreview()
    titulo_peliculas_favoritas.classList.remove("inactive")

    botondecargarmas.classList.remove("inactive2")

    peliculas_favoritas.classList.remove("inactive2")
    trendingpreview.classList.remove("inactive2") 
    trendingpreview.classList.remove("inactive") 
    detail.classList.add("inactive")

    quivanlasimgs.classList.remove("inactive")
    tendencia.classList.remove("inactive")
    categoria_titulo.classList.remove("inactive")
    categorias_botones.classList.remove("inactive")
    categorias.classList.remove("inactive")

    div_boton.classList.remove("inactive")

    tendencia_tv_contenedor.classList.remove("inactive")
    
    contenedor_img_categorias.classList.add("inactive")

    tendencias_boton_ver_menos.classList.remove("inactive")
    tendencias_boton.classList.add("inactive")

    categoria_titulo.textContent = "categorias"

    
    
}   


function categoria(){

    trendingpreview.classList.add("inactive2") 
    peliculas_favoritas.classList.add("inactive2") 
    titulo_peliculas_favoritas.classList.add("inactive")

    div_boton.classList.remove("inactive")
    detail.classList.add("inactive")


    tendencia_tv_contenedor.classList.add("inactive")
    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    categorias_botones.classList.add("inactive")
    

    const [_ , categoryinfo] = location.hash.split("=")
    const [categoryid , categoryname] = categoryinfo.split("-")
    infinitescroll = scrollformorecontentofcategory(categoryid)
    const categorianombre = categoryname.split("%20").join(" ")
    console.log(categorianombre)

    getcategorymovies(categoryid )
    categoria_titulo.textContent = categorianombre

    contenedor_img_categorias.classList.remove("inactive")
    img_categorias.classList.remove("inactive")
    console.log(infinitescroll)
}


function moretrending(){
    console.log("aaf")
    loadMoretrendingpelis()
    div_boton.classList.remove("inactive")
    detail.classList.add("inactive")
    titulo_peliculas_favoritas.classList.add("inactive")

    trendingpreview.classList.add("inactive2") 

    peliculas_favoritas.classList.add("inactive2") 

    tendencia_tv_contenedor.classList.add("inactive")
    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    categorias_botones.classList.add("inactive")
    contenedor_img_categorias.classList.remove("inactive")
    img_categorias.classList.remove("inactive")

    infinitescroll = scrollformorecontent
}