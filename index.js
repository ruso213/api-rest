/* const { id } = require("date-fns/locale");
 */



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
})

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
        movieconteiner.addEventListener("click", () => {

            const movie_id = movie.id
            location.hash = `#movie=${movie_id}=${movie.title}`

        })

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)

        img_categorias.appendChild(movieconteiner)
    })
}

const lazyload = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute("dates-img")
            entry.target.setAttribute("src", url)
        }
    })
});





//este es el de peliculsa trending
async function gettrendingpelis(lazyloader = true) {

    const { data } = await api("/trending/movie/week?api_key=" + apikey);
    const movies = data.results;

   
    quivanlasimgs.innerHTML = ""

    movies.forEach(movie => {

        const trendingpreview = document.querySelector(".aqui-van-las-imgs")


        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-tendencias")


        const categorytext = document.createTextNode(movie.title)


        movieconteiner.addEventListener("click", () => {
            const movie_id = movie.id
            const movietitle = movie.title
            location.hash = `#movie=${movie_id}=${movietitle}`

            console.log(movietitle, movie_id)
        })

        const namedelapeli = document.createElement("h3")
        namedelapeli.appendChild(categorytext)
        namedelapeli.classList.add("texoth3")

        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute(
            "dates-img",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        if (lazyloader) {
            lazyload.observe(movieimg)
        }

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)
        trendingpreview.appendChild(movieconteiner)
    });
}




async function getmoviedetailstvs(id, movies) {

    window.scroll({
        top: 0,
        behavior: 'smooth'

    })
    const { data: movie } = await api(`/tv/` + id);
    botones_sugerencias.innerHTML = ""
    const asa = movie.genres

    console.log(imagen_de_la_pelicula_clickeada)



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


async function getmoviedetailsmovies(id, name, movies, url) {

    const { data: movie } = await api(`/movie/` + id);
    botones_sugerencias.innerHTML = ""
    const asa = movie.genres
    console.log(imagen_de_la_pelicula_clickeada)


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


async function getreloadedmoviesbyid(id) {
    const { data: movie } = await api("/movie/" + id + "/recommendations");
    const movies = movie.results

    contenedor_de_la_imagen_recomendadasvs.innerHTML = ""



    movies.forEach(movies2 => {

        const movieconteiner = document.createElement("img")
        movieconteiner.classList.add("imagen-tendencias")
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


    })


}
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//aqui empieza el search movies :)       
let pageofsearch = 1


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
    console.log("maximo de pagina " + maxPage)
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
        console.log(data)
        muchasimagenes(movies2)  

        console.log(pageofsearch)
       }
    }
   
    

}

//aqui acaba el search movies :)
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//aqui empieza el gettrending

async function gettrendingtv(lazyloader = true) {

    
    const { data } = await api("/tv/popular?api_key=" + apikey);
    const movies = data.results;

    

  

    botondecargarmas.addEventListener("click", () => { location.hash = "#moretrending" })
    quivanlasimgs.appendChild(botondecargarmas)

    


    quivanlasimgs_tvs.innerHTML= ""
    
    movies.forEach(movie => {

        const trendingpreview = document.querySelector(".aqui-van-las-imgs-tv")


        const movieconteiners = document.createElement("div")
        movieconteiners.classList.add("imagen-tendencias-tv")


        const categorytext = document.createTextNode(movie.original_name)


        const namedelapeli = document.createElement("h3")
        namedelapeli.classList.add("texoth3")
        namedelapeli.appendChild(categorytext)




        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli-tv");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute("dates-img", "https://image.tmdb.org/t/p/w300" + movie.poster_path);


        if (lazyloader) {
            lazyload.observe(movieimg)
        }

        movieconteiners.appendChild(movieimg)
        movieconteiners.appendChild(namedelapeli)
        trendingpreview.appendChild(movieconteiners)
        movieimg.addEventListener("click", () => {
            const movie_id = movie.id

            location.hash = `#tv=${movie_id}=${movie.original_name}`
        })
    });
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
        console.log(data)
        muchasimagenes(movies2)  

       }

}

//aqui acaba el gettrending :)
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//--------------------------------
//este es el click de las categorias 
async function getcategorymovies(id, lazyloader = true) {
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
function scrollformorecontentofcategory (id){
  


    return async function funcioninterna(){
         const {scrollTop , scrollHeight , clientHeight} = document.documentElement;
 
    
     const isscrollbotom = (scrollTop + clientHeight) >= (scrollHeight - 15)

 
     if(isscrollbotom ){
         const { data } = await api(`/discover/movie`, {
             params: {
                 page: pageofsearch++,
                 with_genres: id
             }
     
         });
 
         const movies2 = data.results
         console.log(data)
         muchasimagenes(movies2)  
 
         console.log(pageofsearch)
        }
     }
    
     
 
 }