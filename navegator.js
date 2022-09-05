window.addEventListener("DOMContentLoaded" , navigator2 , false)
window.addEventListener("hashchange" , navigator2 , false)

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
    if(location.hash.startsWith("#trend")){
        trend()

    }
    else if(location.hash.startsWith("#home")){
        home()
        console.log("home")
    }
    else if(location.hash.startsWith("#category")){
        categoria()
    }
    else if(location.hash.startsWith("#search")){
        search()
        

    } else if(location.hash.startsWith("#tv")){
        tv()
        console.log("afdadf");

    }else if(location.hash != "#movie=!0100"){
        movie()
        

    }
    
    else if(location.hash.startsWith("")){
        home()

    }
    
    else {
        home()
    }
}

async function movie() {

    
    const { data } = await api("/movie/popular?api_key=" + apikey);
    const movies = data.results;


    detail.classList.remove("inactive")
    div_boton.classList.remove("inactive")

    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    tendencia_tv_contenedor.classList.add("inactive")
    categoria_titulo.classList.add("inactive")
    categorias.classList.add("inactive")
    contenedor_img_categorias.classList.add("inactive")
    buscado.classList.add("inactive")
    tendencia.classList.add("inactive")   
     peliculas_similares_y_categorias.classList.remove("inactive")


    
    const [_ , moviebyID , moviename] = location.hash.split("=")
    
    const movienamesplit = moviename.split("%20")
    const moviejuntado = movienamesplit.join(" ")

         getmoviedetailsmovies( moviebyID, "original_title" ,movies , "movie")
     
}
async function tv() {

    console.log("hola")

    const { data } = await api("/tv/popular?api_key=" + apikey);
    const movies = data.results;

    const [_ , moviebyID , moviename] = location.hash.split("=")
    
    const movienamesplit = moviename.split("%20")
    const moviejuntado = movienamesplit.join(" ")

    detail.classList.remove("inactive")
    div_boton.classList.remove("inactive")
    pelis_sim.classList.remove("inactive")
    contenedor_de_la_imagen_recomendadasvs.classList.remove("inactive")

    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    tendencia_tv_contenedor.classList.add("inactive")
    categoria_titulo.classList.add("inactive")
    categorias.classList.add("inactive")
    contenedor_img_categorias.classList.add("inactive")
    buscado.classList.add("inactive")
    tendencia.classList.add("inactive")
    peliculas_similares_y_categorias.classList.add("inactive")
    pelis_sim.classList.add("inactive")
    contenedor_de_la_imagen_recomendadasvs.innerHTML = ""
    

    console.log(movies.id)
    
    getmoviedetailstvs(moviebyID, movies)
}

async function search() {
        
    div_boton.classList.remove("inactive")

    detail.classList.add("inactive")

        categorias_imagenes_buscado.classList.remove("inactive")
        buscado.classList.remove("inactive")

        quivanlasimgs.classList.add("inactive")
        tendencia.classList.add("inactive")
        trendingpreview.classList.add("inactive")
        tendencia_tv_contenedor.classList.add("inactive")
        categoria_titulo.classList.add("inactive")
        categorias.classList.add("inactive")
        contenedor_img_categorias.classList.add("inactive")


        const  query = location.hash.split("-")[1]
        getsearchmovies(query)
        console.log(query)
     }

function home(){
    getcategorispreview()
    gettrendingpelis()
    getcategorispreview()

    detail.classList.add("inactive")
    tendencia.classList.remove("inactive")
    trendingpreview.classList.remove("inactive")
    categorias.classList.remove("inactive")
    quivanlasimgs.classList.remove("inactive")
    categorias_botones.classList.remove("inactive")


    contenedor_img_categorias.classList.add("inactive")
    buscado.classList.add("inactive")

    div_boton.classList.add("inactive")
    tendencia_tv_contenedor.classList.add("inactive")
    
    trendingpreview.classList.remove("aqui-van-las-imgs-trend")
    trendingpreview.classList.add("tendencias-imagenes")
    tendencias_boton_ver_menos.classList.add("inactive")
    tendencias_boton.classList.remove("inactive")

}


function trend(){
    gettrendingtv()
    getcategorispreview()

    detail.classList.add("inactive")

    quivanlasimgs.classList.remove("inactive")
    tendencia.classList.remove("inactive")
    categoria_titulo.classList.remove("inactive")
    categorias_botones.classList.remove("inactive")
    categorias.classList.remove("inactive")

    div_boton.classList.remove("inactive")

    tendencia_tv_contenedor.classList.remove("inactive")
    trendingpreview.classList.remove("tendencias-imagenes")
    trendingpreview.classList.add("aqui-van-las-imgs-trend")
    contenedor_img_categorias.classList.add("inactive")
    buscado.classList.add("inactive")

    tendencias_boton_ver_menos.classList.remove("inactive")
    tendencias_boton.classList.add("inactive")



    
    
}   


function categoria(){

  
    div_boton.classList.remove("inactive")
    detail.classList.add("inactive")

    buscado.classList.add("inactive")

    tendencia_tv_contenedor.classList.add("inactive")
    quivanlasimgs.classList.add("inactive")
    tendencia.classList.add("inactive")
    trendingpreview.classList.add("inactive")
    categorias_botones.classList.add("inactive")
    
    console.log(`estas en ${location.hash}`)

    const [_ , categoryinfo] = location.hash.split("=")
    const [categoryid , categoryname] = categoryinfo.split("-")
    getcategorymovies(categoryid )
    categoria_titulo.textContent = categoryname

    contenedor_img_categorias.classList.remove("inactive")
    img_categorias.classList.remove("inactive")
    
}