
const apikey = "0a8c928df346aad46752e35300e6114e";
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
    ,
    headers: {
        "content-type": "application/json;charset=utf-8"
    },
    params: {
        "api_key": apikey
    }
})/* const { id } = require("date-fns/locale");
 */
let maxPage;


function muchasimagenes(movies ,  lazyloader = true){
    movies.forEach(movie => {



        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-categorias")


        const categorytext = document.createTextNode(movie.title)


        const namedelapeli = document.createElement("h3")
        namedelapeli.appendChild(categorytext)
        namedelapeli.classList.add("texoth3")

        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute("dates-img", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        if (!movie.poster_path) {
            movieimg.setAttribute("dates-img", "./assets/interrogation-mark.png")
        }
        if (lazyloader) {
            lazyload.observe(movieimg)
        }
        movieimg.addEventListener("click", () => {

            const movie_id = movie.id
            location.hash = `#movie=${movie_id}=${movie.title}`

        })

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)

        img_categorias.appendChild(movieconteiner)
        const btn_favorite_movie = document.createElement("button")

        btn_favorite_movie.classList.add("boton_introducir_a_fav")
        likedmovielist()[movie.id] && btn_favorite_movie.classList.add("bonton_ya_introducido")
        btn_favorite_movie.addEventListener("click", ()=>{
            btn_favorite_movie.classList.toggle("bonton_ya_introducido")
            likemovie(movie)

        })
        movieconteiner.appendChild(btn_favorite_movie)
    })
}




function botonoes(movieconteiner , movie){
    const btn_favorite_movie = document.createElement("button")
    likedmovielist()[movie.id] && btn_favorite_movie.classList.add("bonton_ya_introducido")

    btn_favorite_movie.classList.add("boton_introducir_a_fav")
    btn_favorite_movie.addEventListener("click", ()=>{
        btn_favorite_movie.classList.toggle("bonton_ya_introducido")
        likemovie(movie)

    })
    movieconteiner.appendChild(btn_favorite_movie)

} 

const lazyload = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute("dates-img")
            entry.target.setAttribute("src", url)
        }
    })
});

//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------

function likedmovielist(){
    const item = JSON.parse(localStorage.getItem("liked_movies"))
    let pelis;
    
    if(item){
        pelis = item
    }else{
        pelis = {}
    }

    console.log(pelis)
    console.log("pelis")
    return pelis
    
}

function likemovie(movie){
    let likedmovies = likedmovielist()

    if(likedmovies[movie.id]){
        likedmovies[movie.id] = undefined
    }else{
        likedmovies[movie.id] = movie 

        
    }

    localStorage.setItem('liked_movies',JSON.stringify(likedmovies))
}

function getlikedmoviesimage(){
    const likedmovies = likedmovielist()
    const moviearrays = Object.values(likedmovies)
    
    peliculas_favoritas_contendor.innerHTML = ""
    getpelis(moviearrays , "title" , peliculas_favoritas_contendor, "movie" )

}
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------
//--------------------------------------------

 async function getpelis(movies , name , trend, hash , lazyloader = true){
    
    quivanlasimgs.innerHTML = ""
    movies.forEach(movie => {


        const trendingpreview = document.querySelector(".aqui-van-las-imgs")


        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-tendencias-tv")


        const categorytext = document.createTextNode(movie[name])


        

        const namedelapeli = document.createElement("h3")
        namedelapeli.appendChild(categorytext)
        namedelapeli.classList.add("texoth3")

        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie[name])
        movieimg.setAttribute(
            "dates-img",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path);
        movieimg.addEventListener("click", () => {
            const movie_id = movie.id
            const movietitle = movie[name]
            location.hash = `#${hash}=${movie_id}=${movietitle}`

        })
        if (lazyloader) {
            lazyload.observe(movieimg)
        }

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)
        trend.appendChild(movieconteiner)
        
        const btn_favorite_movie = document.createElement("button")
       
        likedmovielist()[movie.id] && btn_favorite_movie.classList.add("bonton_ya_introducido")

        btn_favorite_movie.classList.add("boton_introducir_a_fav")
        btn_favorite_movie.addEventListener("click", ()=>{
            btn_favorite_movie.classList.toggle("bonton_ya_introducido")
            likemovie(movie)
        })
        movieconteiner.appendChild(btn_favorite_movie)
        });
        botondecargarmas.addEventListener("click", () => { location.hash = "#moretrending" })
        trendingpreview.appendChild(botondecargarmas)
} 



//este es el de peliculsa trending
async function gettrendingpelis(lazyloader = true) {
    const { data } = await api("/trending/movie/week?api_key=" + apikey);
    const movies = data.results;
    trendingpreview.innerHTML = ""

    getpelis(movies, "title", trendingpreview,"movie")
    
    
}




async function getmoviedetailstvs(id, movies) {

    window.scroll({
        top: 0,
        behavior: 'smooth'

    })
    const { data: movie } = await api(`/tv/` + id);
    botones_sugerencias.innerHTML = ""
    const asa = movie.genres




    movies.forEach(movies => {

        resumen.innerHTML = movie.overview
        nombre_de_la_peli.innerHTML = movie.name
        puntuacion.innerHTML = `⭐ ${movie.vote_average}`
        imagen_de_la_pelicula_clickeada.src = "https://image.tmdb.org/t/p/w300" + movie.poster_path




    })

    asa.forEach(moviesr2 => {
        const botonesmovies = document.createElement("button")
        const textodelboton = document.createTextNode(moviesr2.name)
        botonesmovies.appendChild(textodelboton)
        botones_sugerencias.appendChild(botonesmovies)
        botonesmovies.addEventListener("click", () => {
            location.hash = `#category=${moviesr2.name}-${moviesr2.id}`;

        })

    })



}



async function getmoviedetailsmovies(id, name, movies, url) {

    const { data: movie } = await api(`/movie/` + id);
    botones_sugerencias.innerHTML = ""
    const asa = movie.genres


    asa.forEach(moviesr2 => {
        const botonesmovies = document.createElement("button")
        const textodelboton = document.createTextNode(moviesr2.name)
        botonesmovies.appendChild(textodelboton)
        botones_sugerencias.appendChild(botonesmovies)
        botonesmovies.addEventListener("click", () => {
            location.hash = `#category=${moviesr2.name}-${moviesr2.id}`;

        })

    })



    movies.forEach(movies => {

        resumen.innerHTML = movie.overview
        nombre_de_la_peli.innerHTML = movie[name]
        puntuacion.innerHTML = `⭐ ${movie.vote_average}`
        imagen_de_la_pelicula_clickeada.src = "https://image.tmdb.org/t/p/w300" + movie.poster_path




        getreloadedmoviesbyid(id)
    })
    window.scroll({
        top: 0,
        behavior: 'smooth'

    })

}



async function getcategorispreview() {



    const { data } = await api("/genre/movie/list?api_key=" + apikey);
    const categorias = data.genres;

    categorias_botones.innerHTML = ""

    categorias.forEach(categorys => {



        const categoriepreview = document.querySelector("#contenedor-de-categoritas .categorias-botones")

        const categorycontainerssssss = document.createElement("div")
        categorycontainerssssss.classList.add("category-lista")



        const categortconteiner = document.createElement("button")
        categortconteiner.classList.add("botones")
        categortconteiner.setAttribute("id", categorys.name)
        categortconteiner.addEventListener("click", () => {
            location.hash = `#category=${categorys.id}-${categorys.name}`;
        })

        const categorytext = document.createTextNode(categorys.name)

        categortconteiner.appendChild(categorytext)
        categorycontainerssssss.appendChild(categortconteiner)
        categoriepreview.appendChild(categorycontainerssssss)

    });
}



async function getreloadedmoviesbyid(id) {
    const { data: movie } = await api("/movie/" + id + "/recommendations");
    const movies = movie.results

    contenedor_de_la_imagen_recomendadasvs.innerHTML = ""



    movies.forEach(movies2 => {

        const movieconteiner = document.createElement("img")
        movieconteiner.classList.add("imagen-tendencias-tv")
        movieconteiner.src = `https://image.tmdb.org/t/p/w300${movies2.poster_path}`

        const nombreDelapelicularecomendadavs = document.createElement("h3")
        nombreDelapelicularecomendadavs.innerHTML = movies2.title

        const divdelcontenedor = document.createElement("div")
        divdelcontenedor.classList.add("contenedordiv")

        divdelcontenedor.appendChild(movieconteiner)
        divdelcontenedor.appendChild(nombreDelapelicularecomendadavs)
        contenedor_de_la_imagen_recomendadasvs.appendChild(divdelcontenedor)

        movieconteiner.addEventListener("click", () => {

            location.hash = `#movie=${movies2.id}=${movies2.title}`
        })

        
        const btn_favorite_movie = document.createElement("button")
        likedmovielist()[movies2.id] && btn_favorite_movie.classList.add("bonton_ya_introducido")
    
        btn_favorite_movie.classList.add("boton_introducir_a_fav")
        btn_favorite_movie.addEventListener("click", ()=>{
            btn_favorite_movie.classList.toggle("bonton_ya_introducido")
            likemovie(movies2)
    
        })
        divdelcontenedor.appendChild(btn_favorite_movie)
    })


}
     
let pageofsearch = 2


async function getsearchmovies(id , lazyloader = true) {
    pageofsearch = 2
    
    img_categorias.innerHTML = ""
    window.scroll({
        top: 0,
        behavior: "smooth"

    })
    const { data } = await api("/search/movie", {
        params: {
            query: id
        }
    });
    const movies = data.results;

    maxPage = data.total_pages;
    muchasimagenes(movies)
}



function scrollformorecontentofsearch (query){
  


   return async function funcioninterna(){
        const {scrollTop , scrollHeight , clientHeight} = document.documentElement;

   
    const isscrollbotom = (scrollTop + clientHeight) >= (scrollHeight - 15)
    
    const paginateisnotmax = pageofsearch < maxPage;

    if(isscrollbotom && paginateisnotmax){
        const { data } = await api(`/search/movie`, {
            params: {
                page: pageofsearch++,
                query
            }
    
        });

        const movies2 = data.results
        muchasimagenes(movies2)  

       }
    }
   
    

}


async function gettrendingtv(lazyloader = true) {

   
    const { data } = await api("/tv/popular?api_key=" + apikey);
    const movies = data.results;

    quivanlasimgs_tvs.innerHTML= ""
    
    await getpelis(movies,"name",quivanlasimgs_tvs, "tv")

    
    maxPage = data.total_pages;


}



async function loadMoretrendingpelis( lazyloader = true) {
   
   
    img_categorias.innerHTML = ""
    const { data } = await api(`/trending/movie/week?api_key=${apikey}`, {
        params: {
            page: numpage++ ,
        }

    });
   
   
    const movies2 = data.results;
    categoria_titulo.innerHTML = "trending movies" 



    muchasimagenes(movies2)  
    

    



}


async function getcategorymovies(id, lazyloader = true) {
    pageofsearch = 2
    img_categorias.innerHTML =""
    window.scroll({
        top: 0,
        behavior: 'smooth'

    })
    const { data } = await api("/discover/movie", {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;
    
    img_categorias.innerHTML = ""
    muchasimagenes(movies)
    
}


async function scrollformorecontent (){
    
   
    const {scrollTop , scrollHeight , clientHeight} = document.documentElement;

   
    const isscrollbotom = (scrollTop + clientHeight) >= (scrollHeight - 15)
    const paginateisnotmax = pageofsearch < maxPage;

    if(isscrollbotom && paginateisnotmax){
        const { data } = await api(`/trending/movie/week?api_key=${apikey}`, {
            params: {
                page: numpage++,
            }
    
        });

        const movies2 = data.results
        muchasimagenes(movies2)  

       }

}

function scrollformorecontentofcategory (id){
  


    return async function funcioninterna(){
         const {scrollTop , scrollHeight , clientHeight} = document.documentElement;
 
    
     const isscrollbotom = (scrollTop + clientHeight) >= (scrollHeight - 15)

     const paginateisnotmax = pageofsearch < maxPage;

     if(isscrollbotom ){
         const { data } = await api(`/discover/movie`, {
             params: {
                 page: pageofsearch++,
                 with_genres: id
             }
     
         });
 
         const movies2 = data.results
         muchasimagenes(movies2)  
 
        }
     }
    
     
 
 }