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



async function gettrendingpelis() {

    const { data } = await api("/trending/movie/week?api_key=" + apikey);
    const movies = data.results;
    
    quivanlasimgs.innerHTML = ""

    movies.forEach(movie => {

        const trendingpreview = document.querySelector(".aqui-van-las-imgs")


        const movieconteiner = document.createElement("div")
        movieconteiner.classList.add("imagen-tendencias")




        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);


        movieconteiner.appendChild(movieimg)
        trendingpreview.appendChild(movieconteiner)
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




        const movieimg = document.createElement("img");
        movieimg.classList.add("imagen-de-la-peli");
        movieimg.setAttribute("alt", movie.title)
        movieimg.setAttribute("src", "https://image.tmdb.org/t/p/w300" + movie.poster_path);


        movieconteiner.appendChild(movieimg)
        trendingpreview.appendChild(movieconteiner)
    });
}



console.log("afasdfasdfaaaaaaaaaaaaaaaaaaaa")








async function getcategorispreview() {

    const { data } = await api("/genre/movie/list?api_key=" + apikey);
    const categorias = data.genres;
    console.log(categorias)

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


