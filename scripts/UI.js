"use strict"
const {random:rand, floor:floor} = Math,
	raf = requestAnimationFrame || (ts => (setTimeout(ts, 1000/60))),
	cancelRaf = (h) => {
		cancelAnimationFrame ? cancelAnimationFrame(h) : clearTimeout(h)
	}
	

const UI = function (loader) {
    this.hdClose = document.querySelector(".hdclose")
	this.hdNav = document.querySelector("nav")
	this.hdMn = document.querySelector(".hdmn")
	this.lists = document.querySelectorAll(".mobile .hdmn .hash")
	this.mobNav = document.querySelector(".mobile")
    this.views = Array.from(document.querySelectorAll(".inview"))
    this.loader = document.querySelector(loader)
	this.hmview = document.querySelector(".hmdiv")
	this.imgs = document.querySelectorAll("img")
	this.srchBtn = document.querySelectorAll(".srchbtn")
	this.srchForm = document.querySelector(".srch-form")
	this.srchDiv = document.querySelector(".srch-box")
	this.srchClose = document.querySelector(".srchclose")
	this.accDrop = document.querySelector(".drop-ctn")
	this.accDropBx = document.querySelector(".acc-drop")
	this.srch = document.querySelector("#srch")
	this.slidesCtn = document.querySelector(".slides-box")
	this.slidesBx = Array.from(document.querySelectorAll(".slides-box .slide-ctn"))
	this.slidDots = Array.from(document.querySelectorAll(".slidDots span"))
	this.i = 0
	
}

	UI.prototype.slide = function () {
		if(this.i >= this.slidesBx.length){
			this.i = 0
		}
		
		for(let j = 0; j<this.slidDots.length; j++){
		    this.slidDots[j].addEventListener("click", () =>{
			    this.i = j
		    })
		this.slidDots[j].classList.remove("link")
		this.slidesBx[j].classList.remove("slidetxtAnim")
		}
		let Wid = this.slidesBx[this.i].getBoundingClientRect().left
		this.slidesCtn.scrollLeft += Wid
		this.slidDots[this.i].classList.add("link")
		this.slidesBx[this.i].classList.add("slidetxtAnim")
		
		this.i++

	}
	
	UI.prototype.inValid = function (s) {
		return !s.trim().length
	}
	
	UI.prototype.isBlank = function (fs) {
		return fs.some(f => inValid(f.value))
	}
	
	UI.prototype.endLoad = function () {
		this.loader.style.display = "none"
		this.toggleBodyscroll()
	}
	
	UI.prototype.isInView = function (el, p, d = true) {
		const percentVisible = p/100,
		{top:elemTop, bottom:elemBottom, height:elemHeight} = el.getBoundingClientRect(),
		overhang = elemHeight * (1 - percentVisible)
	 	
	 	if(!d){return (elemTop >= -overhang && elemBottom <= window.innerHeight + overhang)}
		return elemBottom <= window.innerHeight + overhang
	}
	 
    UI.prototype.toggleBodyscroll = function () {
		if (!document.body.classList.contains("noscroll")){
			document.body.classList.add("noscroll")
		}else{document.body.classList.remove("noscroll")}
	}
	
	UI.prototype.addScroll = function () {
			if (document.body.classList.contains("noscroll")){
				document.body.classList.remove("noscroll")
			}
	}
	
	UI.prototype.removeScroll = function () {
		    if (!document.body.classList.contains("noscroll")){
		    	document.body.classList.add("noscroll")
		    }
	}
	
	UI.prototype.events = function () {
		this.lists.forEach(l => {
			l.addEventListener("click", (e) => {
				e.preventDefault()
				const el = document.querySelector(e.target.getAttribute("href")),
				offT = el.offsetTop
				
				this.hdClose.classList.remove("active")
				this.mobNav.classList.remove("activea")
				document.body.classList.remove("blur")
				this.addScroll()
				
				if(offT !== null){
					setTimeout(() => {
						window.scrollTo({top: offT, behavior: "smooth"})
					}, 700)
				}
			})
		})
		
		this.imgs.forEach(img =>{
			img.addEventListener("load", (e) => {
				e.preventDefault()
		})})
		document.body.addEventListener("click", (e) => {
			this.accDrop.classList.remove("acc-drop-active")
		}, true)
		this.accDrop.addEventListener("click", (e) => {
			this.accDrop.classList.toggle("acc-drop-active")
		})
		
		this.srchForm.addEventListener("submit", (e) => {
			e.preventDefault()
		})
		this.srchBtn.forEach(btn => {btn.addEventListener("click", (e) => {
			this.srchDiv.classList.toggle("srchblock")
				this.srch.focus()
			})
		})
		this.srchClose.addEventListener("click", (e) => {
			this.srchDiv.classList.remove("srchblock")
		})
		
		this.hdClose.addEventListener("click",(e)=>{
			this.hdClose.classList.toggle("active")
			this.mobNav.classList.toggle("activea")
			document.body.classList.toggle("blur")
			this.toggleBodyscroll()
		})
		
		window.addEventListener("click",(e)=>{
			if(e.target == this.mobNav ){
				this.hdClose.classList.remove("active")
				this.mobNav.classList.remove("activea")
				document.body.classList.remove("blur")
				this.addScroll()
			}
		})
		
	}
	UI.prototype.rRand = function (x,y=0) {
		return this.rnd(rand()*(y-x)) + x
	}
 
	UI.prototype.slidView = function () {
		this.views.forEach(view => {
			if(this.isInView(view, 30)){
				view.classList.add("toview")
			}else{view.classList.remove("toview")}
 		})
 	}
 		
 	UI.prototype.slidHom = function () {
 		if(this.isInView(this.hmview, 50, false)){
 			document.body.classList.add("navbg")
 			this.hmview.classList.add("toview")
 		}else{
 			document.body.classList.remove("navbg")
 			this.hmview.classList.remove("toview")
 			}

 	}
 	
 	UI.prototype.appendCopy = function () {
 		let yr = new Date()
 		document.querySelector(".btm .copy-yr").innerText = yr.getFullYear()
 		let imgs = document.querySelectorAll("img")
 		imgs.forEach(img =>{
 			img.setAttribute("draggable", false)
 		})
 		
 	}