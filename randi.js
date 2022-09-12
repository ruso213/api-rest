
header__select.addEventListener("change" , (vals)=> {
        cambiarlenguaje(vals.target.value)
    })

function cambiarlenguaje(lenguaje){
    lenguages = lenguaje
    localStorage.setItem("lenguage", lenguages)
    window.location.reload()
}

const lazyload = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute("dates-img")
            entry.target.setAttribute("src", url)
        }
    })
});

