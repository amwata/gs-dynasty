
"use strict"

window.onload = () =>{
    const GsUI = new UI(".adm-loader"),
   	GsUX = new ADM_UX(),
   	detDiv = document.querySelector(".details"),
   	prods = document.querySelector(".adm-prds")
   	let theme = localStorage.getItem('data-theme')
   	
   	prods.addEventListener("click", e => {
   		e.preventDefault()
   		GsUX.getItem(detDiv)
   		removeMn()
   	})
   
    if (theme !=='dark'){
        changeThemeToLight()
    }else{
        changeThemeToDark()
    }   
    
	GsUI.endLoad()
}

function toggleMn(){
	const toggle = document.querySelector(".toggle"),
	 nav = document.querySelector(".adm-nav"),
          main = document.querySelector(".main")
          toggle.classList.toggle("active")
          nav.classList.toggle("active")
          main.classList.toggle("active")
}

function removeMn(){
	const toggle = document.querySelector(".toggle"),
          nav = document.querySelector(".adm-nav"),
          main = document.querySelector(".main")
          toggle.classList.remove("active")
          nav.classList.remove("active")
          main.classList.remove("active")
}

function itemCol(x){
	document.querySelector(".itemCol").style.background= x
}

function imgPrev(e){
	let file = e.target.files[0]
	let src = URL.createObjectURL(file)
	let img = `<img src=${src} alt="&sigma;">`
	document.querySelector(".img-prev").innerHTML = img
}

let theme = localStorage.getItem('data-theme'),
mtag = document.querySelector("meta[name=theme-color]")
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark")
    mtag.content = "dark"
    localStorage.setItem("data-theme", "dark")
}

const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light")
    mtag.content = "light"
    localStorage.setItem("data-theme", 'light')
}

const cb = document.querySelector("#check")
cb.addEventListener('change', () => {
    let theme = localStorage.getItem('data-theme')
    if (theme ==='dark'){
        changeThemeToLight()
    }else{
        changeThemeToDark()
    }   
})