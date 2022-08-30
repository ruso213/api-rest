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






async function getmoviedetailsmovies(id , name ,movies  , url){
    
    
    const  {data:movie}  = await api(`/${url}/`+ id );
    botones_sugerencias.innerHTML = ""
    const asa = movie.genres
    console.log(asa)
    console.log(imagen_de_la_pelicula_clickeada)


    asa.forEach(moviesr2 =>{
        const botonesmovies = document.createElement("button")
        const textodelboton = document.createTextNode (moviesr2.name)
        botonesmovies.appendChild(textodelboton)
        botones_sugerencias.appendChild(botonesmovies)
        botonesmovies.addEventListener("click" , ()=>{
            location.hash =`#category=${moviesr2.name}-${moviesr2.id}`;

        })
       
    })

    movies.forEach(movies => {

        resumen.innerHTML = movie.overview
        nombre_de_la_peli.innerHTML = movie[name]
        puntuacion.innerHTML = `⭐ ${movie.vote_average}`
        imagen_de_la_pelicula_clickeada.src = "https://image.tmdb.org/t/p/w300"+ movie.poster_path
    

        
        getreloadedmoviesbyid(id)
    })
}

async function getreloadedmoviesbyid(id){
    const  {data:movie}  = await api("/movie/"+ id + "/recommendations" );
    const movies = movie.results

    contenedor_de_la_imagen_recomendadasvs.innerHTML =""
            
    movies.forEach(movies2 =>{
        
        const imagendelapeliculaclickeadavs = document.createElement("img")
        imagendelapeliculaclickeadavs.classList.add("imagen_de_la_pelicula_clickeadavs")
        imagendelapeliculaclickeadavs.src= `https://image.tmdb.org/t/p/w300${movies2.poster_path}`

        const nombreDelapelicularecomendadavs = document.createElement("h3")
        nombreDelapelicularecomendadavs.innerHTML = movies2.title
        
        const divdelcontenedor = document.createElement("div")
        divdelcontenedor.classList.add("contenedordiv")
        
        divdelcontenedor.appendChild(imagendelapeliculaclickeadavs)
        divdelcontenedor.appendChild(nombreDelapelicularecomendadavs)
        contenedor_de_la_imagen_recomendadasvs.appendChild(divdelcontenedor)
    
        imagendelapeliculaclickeadavs.addEventListener("click", () =>{
            
            location.hash =`#movie=${movies2.id}=${movies2.title}` 
            getmoviedetailsmovies(movies2.id ,"original_title" ,movies  , "movie")
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
        categortconteiner.addEventListener("click" , ()=>{
            location.hash =`#category=${categorys.id}-${categorys.name}`;
        })

        const categorytext = document.createTextNode(categorys.name)

        categortconteiner.appendChild(categorytext)
        categorycontainerssssss.appendChild(categortconteiner)
        categoriepreview.appendChild(categorycontainerssssss)

    });
}

async function gettrendingtv() {

    const { data } = await api("/tv/popular?api_key=" + apikey);
    const movies = data.results;
    
    quivanlasimgs_tvs.innerHTML = ""

    movies.forEach(movie => {

        const trendingpreview = document.querySelector(".aqui-van-las-imgs-tv")


        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-tendencias")


        const categorytext = document.createTextNode(movie.original_name)


        const namedelapeli = document.createElement("h3")
        namedelapeli.classList.add("texoth3")
        namedelapeli.appendChild(categorytext)
        


        movieconteiner.addEventListener("click", ()=>{
            const movie_id = movie.id
            location.hash = `#movie=${movie_id}=${movie.original_name}`
            console.log(movie.original_name , movie_id)      
            getmoviedetailsmovies(movie_id , "name" , movies,  "tv")
        })

        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)
        trendingpreview.appendChild(movieconteiner)
    });
}

async function getsearchmovies(id) {

    const { data } = await api("/search/movie" ,{ params:{
        query : id
    }
} );
    const movies = data.results;
   
    categorias_imagenes_buscado.innerHTML = ""

    movies.forEach(movie => {

        //añadir el addeventlistener
        
        

        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-categorias")

        const namedelapeli = document.createElement("h3")
        namedelapeli.classList.add("texoth3")
        const categorytext = document.createTextNode(movie.title)
        namedelapeli.appendChild(categorytext)

        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.original_title)
        movieimg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        categorias_imagenes_buscado.appendChild(movieconteiner)

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)


        movieconteiner.addEventListener("click", ()=>{
            const movie_id = movie.id
            const movietitle = movie.title
            location.hash = `#movie=${movie_id}=${movietitle}`
            getmoviedetailsmovies(movie_id , "original_title" , movies,  "movie")


            console.log(movie.title , movie_id)        })
    });
}

//este es el de peliculsa trending

async function gettrendingpelis() {

    const { data } = await api("/trending/movie/week?api_key=" + apikey);
    const movies = data.results;
    
    quivanlasimgs.innerHTML = ""

    movies.forEach(movie => {

        const trendingpreview = document.querySelector(".aqui-van-las-imgs")


        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-tendencias")


        const categorytext = document.createTextNode(movie.title)

        
        movieconteiner.addEventListener("click", ()=>{
            const movie_id = movie.id
            const movietitle = movie.title
            location.hash = `#movie=${movie_id}=${movietitle}`
            getmoviedetailsmovies(movie_id , "original_title" , movies , "movie")

            console.log(movietitle , movie_id)        })

        const namedelapeli = document.createElement("h3")
        namedelapeli.appendChild(categorytext)
        namedelapeli.classList.add("texoth3")

        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        
        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)
        trendingpreview.appendChild(movieconteiner)
    });
}

//este es el click de las categorias 

async function getcategorymovies(id) {

    const { data } = await api("/discover/movie" ,{ params:{
        with_genres : id,
    }
} );
    const movies = data.results;
   
    img_categorias.innerHTML = ""

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
        movieimg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);

        movieconteiner.addEventListener("click", ()=>{
           
            const movie_id = movie.id
            location.hash = `#movie=${movie_id}=${movie.title}`      
            console.log(movie.title , movie_id)
            getmoviedetailsmovies(movie_id , "original_title" , movies , "movie" )

        })

        movieconteiner.appendChild(movieimg)
        movieconteiner.appendChild(namedelapeli)

        img_categorias.appendChild(movieconteiner)
    });
}
