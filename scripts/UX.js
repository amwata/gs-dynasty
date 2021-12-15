"use strict"
let ss = window.sessionStorage,
ls = window.localStorage
const UX = function () {
    this.url = "https://script.google.com/macros/s/AKfycbyOke6Oi1lXB8x0WW-NFdxqZJUT3xq67ureyCvyF9zsm0LS1KPtjoSlI301Kc0xWvc2Gg/exec"
    this.imgUrl = "https://drive.google.com/uc?export=view&id"
    this.subs = 0
    const ua = navigator.userAgent
    let s = ua.indexOf(";") + 1, e = ua.indexOf(")")
    this.os = ua.substring(s, e)
    this.tagAlt = {
    			  	'&': '&amp;',
    			  	'<': '&lt;',
    			  	'>': '&gt;'
    			  }
}
	
	UX.prototype.inValid = function (obj) {
		for(let k in obj){
			if(this.isBlank(obj[k].value)) {
			     setTimeout(()=>{obj[k].focus()}, 1)
			     obj[k].classList.add("dd")
			     this.timeOut(obj[k])
			     return true
			}
		}
	}
	
	UX.prototype.updateAuth = function(x, y){
		let auth = JSON.parse(ls.getItem("auth"))
		auth[x] = y
		ls.setItem("auth", JSON.stringify(auth))
	}
	
	UX.prototype.zip = function (t) {
		return t.replace(/[&<>]/g, x => this.tagAlt[x])
	}
	UX.prototype.beginFetch = function (){
		document.querySelector(".fetch-load").style.display = "flex"
	}
	UX.prototype.endFetch = function (){
		document.querySelector(".fetch-load").style.display = "none"
	}
	UX.prototype.addStruct = function (){
		document.querySelector("#skeleton-c").style.display = "grid"
	}
	UX.prototype.removeStruct = function (){
		document.querySelector("#skeleton-c").style.display = "none"
	}
	UX.prototype.addHmStruct = function (){
		document.querySelector("#skeleton-c").style.display = "grid"
		document.querySelector("#skeleton-s").style.display = "flex"
	}
	UX.prototype.removeHmStruct = function (){
		document.querySelector("#skeleton-c").style.display = "none"
		document.querySelector("#skeleton-s").style.display = "none"
	}
	UX.prototype.loadImg = function (x){
		Array.from(x.querySelectorAll("img")).forEach(i => i.addEventListener("load", (e) => {
			i.parentElement.parentElement.children[0].style.display = "none"
		}))
	}
	UX.prototype.escRx = function(s){
		return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	}
	UX.prototype.srch = function (items, x) {
		const phrases = x.split(" ").filter(p => !!p),
		re2 = /gr(a|e)y/gi,
		srchMatch = []
		
		for(let i = 0; i < phrases.length; i++){
			let re
		
			if(!!phrases[i].match(re2)) re = re2
			else re = new RegExp(`${this.escRx(phrases[i])}`, "gi")
		
			srchMatch.push(items.filter(j => {
			return j[1].toString().match(re) || j[2].toString().match(re) || j[3].toString().match(re) || j[4].toString().match(re) || j[5].toString().match(re) || j[6].toString().match(re)
			}))
		}
		return !!srchMatch.flat().toString() ? [...new Set(srchMatch.flat())] : false
		
	}
	
	UX.prototype.srchSubmit = function () {
		const btn = document.querySelector("#srchsubmit"),
		ctn = document.querySelector("#srch-results"),
		item = JSON.parse(ls.getItem("sigma"))
		
		if(item && item.prods) {
			let x = this.srch(item.prods, e.target.value)
		}	
	}
	
	UX.prototype.loadReq = function (t, msg) {
		t.style.pointerEvents = "none"
		t.innerHTML = `<div class="spinner btn-loader">
							<p>${msg}</p>
							<div>
								<span style="--sc:0;"></span>
								<span style="--sc:1;"></span>
								<span style="--sc:2;"></span>
								<span style="--sc:3;"></span>
								<span style="--sc:4;"></span>
								<span style="--sc:5;"></span>
								<span style="--sc:6;"></span>
								<span style="--sc:7;"></span>
							</div>
						</div>`
	}
	
	UX.prototype.scsRes = function (t, msg) {
		t.innerHTML += `<div class="btn-loader">
							<p>${msg}</p> <span class="status "><i class="check"></i></span>
					    </div>`
	}
	
	UX.prototype.errRes = function (t, msg) {
		t.innerHTML += `<div class="btn-loader">
							<p>${msg}</p> <span class="status err">!</span>
					    </div>`
	}
	
	UX.prototype.unloadReq = function (t, msg) {
		t.style.pointerEvents = "auto"
		t.innerHTML = msg
	}
	
	UX.prototype.scsMsg = function (el, txt, msg){
		this.scsRes(el, msg)
		setTimeout(() => {
			this.unloadReq(el, txt)
			this.subs = 0
		}, 5000)
	}
	
	UX.prototype.errMsg = function (el, txt, msg){
		this.errRes(el, msg)
		setTimeout(() => {
			this.unloadReq(el, txt)
			this.subs = 0
		}, 5000)
	}
	
	UX.prototype.timeOut = function (x) {
		setTimeout(() => {
			x.classList.remove("dd")
		}, 5000)
	}
	
	UX.prototype.isBlank = function (val) {
		return !val.trim().length
	}
	
	UX.prototype.showMsg = function (x) {
		let msg = ls.getItem("err") || `<div class="err-txt">
											<h1>Oops!</h1>
											<p>Something went wrong. Go to Home page.</p>
											<a href="${this.homePg}" class="tag link">Home</a>
										</div>`,
		   	item = JSON.parse(ls.getItem("sigma"))
		x.innerHTML = msg
		
		let errCtn = x.querySelector(".err-srch")
		if(errCtn){
			let inp = x.querySelector("input"),
			scon = x.querySelector("span")
		
			inp.addEventListener("search", (e) => {
				e.preventDefault()
				if(!this.isBlank(inp.value)){
				let st = this.srch(item.prods, inp.value)
				ls.setItem("search", JSON.stringify(st))
				ls.setItem("srchInp", inp.value)
				location.href = `collections/store/${this.searchPg}`
			}})
		
			scon.addEventListener("click", (e) => {
			e.preventDefault()
			if(!this.isBlank(inp.value)){
				let st = this.srch(item.prods, inp.value)
				ls.setItem("search", JSON.stringify(st))
				ls.setItem("srchInp", inp.value)
				location.href = `collections/store/${this.searchPg}`
			}})
		}
	}
	
	function ADM_UX () {
		UX.call(this)
	}
	ADM_UX.prototype = Object.create(UX.prototype)
	Object.defineProperty(ADM_UX.prototype, 'constructor', {
		value: ADM_UX,
		enumerable: false,
		writable: true
	})
	
	ADM_UX.prototype.getItem = function (a) {
		a.innerHTML = `<div class="prods-ctn">
					  		<div class="prod-crud">
					  			<div class="add">
					  				<span><i class="fa fa-cart-plus"></i></span>
					  				<p>Add</p>
					  			</div>
					  			<div class="edit">
					  				<span><i class="fa fa-pencil"></i></span>
					  				<p>Edit</p>
					  			</div>
					  			<div class="del">
					  				<span><i class="fa fa-trash"></i></span>
					  				<p>Delete</p>
					  			</div>
					  		</div>
					  		<div class="prods"></div>
					  	</div>`
					  	
		const frmCtn = document.querySelector(".prods"),
		addBtn = document.querySelector(".prod-crud .add")
		addBtn.addEventListener("click", (a) =>{
			this.addItem(frmCtn)
		})
	}
	
	ADM_UX.prototype.addItem = function (a){
		a.innerHTML = ` <div class="adm-box adm-add-item-box">
							<form name="adm-add-item-form" class="form create-item" autocomplete="off">
								<div class="field">
									<input class="item-brand inp" id="item-brand" type="text" required >
									<label for="item-brand">Item Brand</label>
								</div>
								<div class="field">
									<input class="item-name inp" id="item-name" type="text" required >
									<label for="item-name">Item Name</label>
								</div>
								<div class="field">
									<input class="item-type inp" id="item-type" type="text" required >
									<label for="item-type">Item Type</label>
								</div>
								<div class="field">
									<input class="item-size inp" id="item-size" type="text" required >
									<label for="item-size">Item Size</label>
								</div>
								<div class="field">
									<input class="item-col inp" id="item-col" type="text" onKeyup="itemCol(this.value)" required >
									<label for="item-col">Item Color</label>
									<span class="itemCol"></span>
								</div>
								<div class="field">
									<input class="item-cost inp" id="item-cost" type="number" placeholder="For analytics use only" required >
									<label for="item-cost">Item Cost (KSh.)</label>
								</div>
								<div class="field">
									<input class="item-price inp" id="item-price" type="number" required >
									<label for="item-price">Item Price (KSh.)</label>
								</div>
								<div class="field">
									<input class="item-qty inp" id="item-qty" type="number" required >
									<label for="item-qty">Item Quantity</label>
								</div>
								<div class="field">
									<input accept="image/*" class="item-img inp" id="item-img" type="file" onchange="imgPrev(event)" required >
									<label for="item-img">Upload Image</label>
									<span class="img-prev"></span>
								</div>
								<div class="send">
									<button class="link" type="submit" id="submit">Add Item <i class ="fa fa-upload"></i></button>
								</div>
							</form> 
						</div>`
						
		const form = document.querySelector(".create-item"),
		send = form.querySelector("#submit")
		
		send.addEventListener("click", (e)=>{
		e.preventDefault()
			this.create(e, form)
		})
		
	}
	
	ADM_UX.prototype.create = function(e, form) {
		if(+this.subs > 0) return
		const loader = e.target
		
		const obj = {
			brand: form.querySelector(".item-brand"),
			name: form.querySelector(".item-name"),
			size: form.querySelector(".item-size"),
			type: form.querySelector(".item-type"),
			col: form.querySelector(".item-col"),
			cost: form.querySelector(".item-cost"),
			price: form.querySelector(".item-price"),
			qnty: form.querySelector(".item-qty"),
			file: form.querySelector(".item-img")
		}
		
		if(this.inValid(obj)) return
		if(!obj.file.files[0].type.includes("image")) {
			obj.file.classList.add("dd")
			obj.file.focus()
			this.timeOut(obj.file)
			return
		}
		if(obj.file.files[0].size > 5000000) return
		this.loadReq(loader)
	
		const fr = new FileReader(),
		file = obj.file.files[0],
		data = new FormData()
		
		for(const k in obj){
			data.append(k, obj[k].value)
		}
		
		data.append("subs", ++this.subs)
		data.append("tag", "admin")
		data.append("action", "create")
		fr.readAsArrayBuffer(file)
		fr.onload = f => {
			const file = [...new Int8Array(f.target.result)]
			data.append("blob", file)
			data.append("blobType", obj.file.files[0].type)
			data.append("blobSize", obj.file.files[0].size)
			
			/*fetch(this.url, {method: "POST", body: data})
			.then().then().then().catch()*/
		}
	
	}
	
	ADM_UX.prototype.auth = function(form) {
		let i = 0
		const data = new FormData()
			
		form.onsubmit = (e) => {
			e.preventDefault()
			const obj = 
			{
				user: form.querySelector("#asiu").value,
				pass: form.querySelector("#asip").value,
				tag: "admin",
				action: "sign-in",
				os: this.os
			}
			
			if(i > 0) return
			const time = Date.now()
			for(const k in obj){
				data.append(k, obj[k])
			}
			data.append("subs", ++i)
			data.append("time", time)
		
			const loader = form.querySelector("#asib")
			this.loadReq(loader, "Signing in")
		
		/*fetch(this.url, {method: "POST", body: data})
		.then().then().then().catch()*/
		}
	}
	UX.prototype.encp = function(x) {
		let len = x.toString().length,
		key = 1, nStr = [], src =""
		
		for(let i = len-1; i>=0; i--){
			key = x.charCodeAt(i) - key%len
			nStr[i] = key + x.charCodeAt(i)%len
			src += String.fromCharCode(nStr[i])
		}return src
	}
	
	function Client_UX() {
		UX.call(this)
		this.store = ["lv", "cd", "hm", "th", "dg", "gg", "cc", "ge", "wv", "ck", "pr", "vc", "ff", "ysl"]
		
		this.itemLen = 18
		this.delFee = 4
		this.sigma
		
		this.aboutPg = "about-us"
		this.cartPg = "cart"
		this.categoriesPg = "categories"
		this.checkoutsPg = "checkouts"
		this.errPg = "error"
		this.homePg = ""
		this.loginPg = "sign-in"
		this.orderPg = "order"
		this.ordersPg = "orders-list"
		this.privacyPg = "privacy-policy"
		this.searchPg = "search"
		this.shopPg = "shop"
		this.storePg = "store"
		this.uinfoPg = "user-information"
		this.vericPg = "verification"
		
	}
	Client_UX.prototype = Object.create(UX.prototype)
	Object.defineProperty(Client_UX.prototype, 'constructor', {
		value: Client_UX,
		enumerable: false,
		writable: true
	})
	
	Client_UX.prototype.__init__ = function(y) {
		this.addHmStruct()
		this.initSet()
		const ctn = document.querySelector(y),
		ctn2 = document.querySelector(".arrvls-ctn")
		const data = new FormData()
		const obj = {
			store: ls.getItem("auth") || ls.getItem("user") || 0,
			tag: "client",
			action: "INIT",
			clicks:0,
			os: this.os
		}
		
		for(const k in obj){
			data.append(k, obj[k])
		}
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(e => {
			if(e.error){
				throw new Error(e.error)
				return
			}document.querySelector(".dom-overlay").style.display = "none"
			if(e.cookie){
				ls.setItem("user", JSON.stringify(e.cookie))
			}
			if(e.cart){
				ls.setItem("cart", e.cart)
			}else ls.removeItem("cart")
			
			ls.setItem("srpg", 1)
			ls.setItem("stpg", 1)
			ls.setItem("svpg", 1)
			ls.setItem("pg-end", "false")
			
			let sigma = JSON.stringify(e)
			ls.setItem("sigma", sigma)
			this.checkCart()
			this.checkAuth()
			this.sigma = JSON.parse(ls.getItem("sigma"))
			const itemsData = this.page(this.itemLen, 1, e.prods),
			items = itemsData.items
			let newArrv = this.page(7, 1, e.prods.filter(i => i[9].toString().toUpperCase() === "NEW")),
			arrvls = newArrv.items
			
			let ictn = document.createElement("div")
			ictn.setAttribute("class", "maxwid arrvls-box")
			
			
			for(let i = 0; i < arrvls.length; i++){
				let box = document.createElement("div")
				box.setAttribute("class", "arrvl-ctn")
			
				box.innerHTML = `<div class="arv-desc">	
								 	<h4> ${this.zip(arrvls[i][1])}<br>${this.zip(arrvls[i][3])}</h4>
								 	<p>KSh. ${this.zip(arrvls[i][6].toString())}</p>
								</div>
								<div class="arrl-imgbx">
									<div class="img-ctn">
									<div class="spinner">
										<div>
											<span style="--sc:0;"></span>
											<span style="--sc:1;"></span>
											<span style="--sc:2;"></span>
											<span style="--sc:3;"></span>
											<span style="--sc:4;"></span>
											<span style="--sc:5;"></span>
											<span style="--sc:6;"></span>
											<span style="--sc:7;"></span>
										</div>
									</div>
									<a href="" class="fetch" data-trail="${arrvls[i][0]}" data-action ="FETCH" >
										<img onerror = "this.src='imgs/svg2.svg'" src="${this.imgUrl}=${arrvls[i][0]}" alt="&sigma;" >
									</a>
									</div>
								</div>
								<a href="" class="arvl-lnk link" data-tag="${arrvls[i][0]}" data-action ="BUY" >Buy Now</a>`
				ictn.appendChild(box)
			}ctn2.appendChild(ictn)
			this.removeHmStruct()
			this.loadImg(ctn2)
			this.ASoneR(".arvl-lnk", this.homePg)

			this.appendItems(1, ctn, "item-ctn", items, `collections/store/`, this.homePg)
			this.nxtPg("stpg", `collections/store/${this.homePg}`)
			this.prvPg("stpg", `collections/store/${this.homePg}`)
		}).catch(er => {
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${er.message}. Please Try Again!</p>
			<a href="${this.homePg}" class="tag link">Reload</a>
			</div>`
			ls.clear()
			ls.setItem("err", htm)
			location.href = this.errPg
		})
	}
	
	Client_UX.prototype.refresh = function(){
		this.checkCart()
		this.checkAuth()
		this.reloads()
		setTimeout(() =>{
			this.refresh()
		}, 30000)
	}
	Client_UX.prototype.reloads = function (){
		const data = new FormData()
		const obj = {
			store: ls.getItem("auth") || ls.getItem("user") || 0,
			tag: "client",
			action: "REFRESH",
			clicks:0,
			os: this.os
		}
		
		for(const k in obj){
			data.append(k, obj[k])
		}
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(e => {
			if(e.error){
				throw new Error(e.error)
				return
			}
			if(e.cookie){
				ls.setItem("user", JSON.stringify(e.cookie))
			}
			if(e.cart){
				ls.setItem("cart", e.cart)
			}else ls.removeItem("cart")
			
			let sigma = JSON.stringify(e)
			ls.setItem("sigma", sigma)
			}).catch(er => {
				return
			})	
	}
	Client_UX.prototype.appendItems = function (j, ctn, attr, items, dir, rdr="", err="") {
		let ctn2 = document.querySelector(".items-ctn")
		let len = items.length
		for(let i = 0; i < len; i++){
			let box = document.createElement("div")
			box.setAttribute("class", attr)
		
			box.innerHTML = `<div class="item-box">
								<div class="img-ctn"> 
									<div class="spinner">
										<div>
											<span style="--sc:0;"></span>
											<span style="--sc:1;"></span>
											<span style="--sc:2;"></span>
											<span style="--sc:3;"></span>
											<span style="--sc:4;"></span>
											<span style="--sc:5;"></span>
											<span style="--sc:6;"></span>
											<span style="--sc:7;"></span>
										</div>
									</div>
									<a href="" class="fetch" data-trail="${items[i][0]}" data-action ="FETCH" >
										<img onerror = "this.src='${err}imgs/svg2.svg'" src="${this.imgUrl}=${items[i][0]}" alt="&sigma;" >
									</a>
								</div>
								<div class="item-desc">	
									<h4>${this.zip(items[i][1])}</h4>
									<p>${this.zip(items[i][3]+ " "+ items[i][5]+ " "+items[i][4])}</hp>
									<h4>KSh. ${this.zip(items[i][6].toString())}</h4>
								</div>
							</div>`
			ctn.appendChild(box)
		}
		let pgctn = document.createElement("div")
		pgctn.setAttribute("class", "items-flip")
		pgctn.innerHTML = `<a href="" class="link" id = "prvPg">&lt; Prev</a> <span>Page ${j}</span> <a href="" class="link" id="nxtPg">Next &gt;</a>`
		ctn2.appendChild(pgctn)
		this.removeStruct()
		this.loadImg(ctn)
		this.fetsh(dir, rdr, err)
	}
	
	Client_UX.prototype.fetsh = function (url = `collections/store/`, rdr = this.homePg, erl = "") {
		let links = Array.from(document.querySelectorAll(".fetch")),
		sub = 0
		
		links.forEach(l => l.addEventListener("click", (e) => {
			e.preventDefault()
			const data = new FormData()
			const obj = {
			    user: ls.getItem("auth") || ls.getItem("user"),
				tag: "client",
				action: e.currentTarget.dataset.action || e.currentTarget.getAttribute("data-action"),
				clicks: ++sub,
				dataAttr:  e.currentTarget.dataset.trail || e.currentTarget.getAttribute("data-trail")
			}
			
			if(obj.clicks > 1) return
			this.beginFetch()
			for(const k in obj){
				data.append(k, obj[k])
			}
			
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				sub = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
			}).then(e => {
				if(e.error){
					throw new Error(e.error)
				}
			let also = JSON.parse(ls.getItem("sigma"))
			const item = e.item[0] || null,
			crude = also.prods || null
			let other
			if(crude){
				let ftrate = crude.filter(uc => uc[2].toString().match(item[2]) && uc[3].toString().toLowerCase().match(item[3].toString().toLowerCase()))
				let trate = this.page(4, 1, ftrate.filter(i => i[0] !== item[0]))
				other = trate.items
			}
			let payload = JSON.stringify({item, other})
			ls.setItem("payload", payload)
			location.href = `${url+this.shopPg}`
			}).then(() => this.endFetch())
			.catch(e => {
				let htm = `<div class="err-txt">
						   <h1>Oops!</h1>
						   <p>${e.message}. Please Try Again!</p>
						   <a href="${rdr}" class="tag link">Reload</a>
						</div>`
				ls.setItem("err", htm)
				location.href = `${erl+this.errPg}`
				this.endFetch()
			})
		}))
	}
	
	UX.prototype.objEmpty = function (obj){
		return !Object.keys(obj).length
	}
	
	UX.prototype.sieve = function (items, x) {
		const srchMatch = [],
		re = new RegExp(`^${this.escRx(x)}$`, "gi")
		
		srchMatch.push(items.filter(j => {
			return j[2].toString().match(re) || j[3].toString().match(re)
		}))
			
		return !!srchMatch.flat().toString() ? [...new Set(srchMatch.flat())] : false
	}
	
	UX.prototype.signIn = function(t, form) {
		if(this.subs > 0) return
		const msgCtn = document.querySelector("#err-ctn")
		
		const obj = {
			user: form.querySelector("#siu").value,
			pwrd: this.encp(form.querySelector("#sip").value),
			tag: t.dataset.tag || t.getAttribute("data-tag"),
			action: t.dataset.action || t.getAttribute("data-action"),
			os: this.os,
			clicks: ++this.subs
		}
	
		const data = new FormData()
		for(const k in obj){
			data.append(k, obj[k])
		}
		
		this.loadReq(t, "Signing In")
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(e => {
				if(e.error){
					throw new Error(e.error)
				}
				if(e.vcode){
					let payload = JSON.stringify(e.auth)
					ls.setItem("signed", payload)
					location.href = this.vericPg
					return
				}
				form.reset()
				this.scsMsg(t, "Sign Up <i class='fa fa-sign-in'></i>", "Signed in!")
				let payload = e.auth
				ls.setItem("auth", payload)
				if(e.uinfo){
					let payload = e.uinfo
					ls.setItem("uinfo", payload)
					location.href = this.checkoutsPg
					return
				}
				if(e.ordersList){
					document.body.classList.remove("check-sign")
					this.lorderList("#olp")
					return
				}
				location.href = this.homePg
			}).catch(e => {
				this.errMsg(t, "Sign Up <i class='fa fa-sign-in'></i>", "Try again!")
				msgCtn.innerHTML = `<div class="sign-err">
										<p>${this.zip(e.message)}</p>
									</div>`
			})
	}
	
	Client_UX.prototype.checkAuth = function() {
		if(ls.getItem("auth")) document.body.classList.add("auth")
	}
	
	Client_UX.prototype.checkCart = function() {
		let cart = JSON.parse(ls.getItem("cart"))
		if(cart && !this.objEmpty(cart)) document.body.classList.add("bag")
	}
	
	UX.prototype.signOut = function(url="") {
		document.querySelector("#sign-out").addEventListener("click", (e) => {
		e.preventDefault()
		if(this.subs > 0) return
		
		const obj = {
			user: ls.getItem("auth"),
			tag: e.target.dataset.tag || e.target.getAttribute("data-tag"),
			action: e.target.dataset.action || e.target.getAttribute("data-action"),
			clicks: ++this.subs
		}
	
		const data = new FormData()
		for(const k in obj){
			data.append(k, obj[k])
		}this.beginFetch()
		
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			this.endFetch()
			this.subs = 0
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(e => {
			if(e.error){
				throw new Error(e.error)
			}ls.removeItem("auth")
			location.href = `${url+this.homePg}`
		}).catch(e => {
			let htm = `<div class="err-txt">
					   <h1>Oops!</h1>
					   <p>${e.message}. Please Try Again!</p>
					   <a href="${this.homePg}" class="tag link">Reload</a>
					</div>`
			ls.setItem("err", htm)
			location.href = `${url+this.errPg}`
		})})
	}
	
	Client_UX.prototype.verify = function () {
		let form = document.querySelector("#verform"),
		inp = form.querySelector("#verf-inp"),
		btn = form.querySelector("#verf-btn")
		if(form){
			form.addEventListener("submit", (e) => {
				e.preventDefault()
				if(inp.value.length < 4) return
				this.subvCode(inp, btn, form)
			})
			inp.addEventListener("input", (e)=>{
			    let len = e.target.value.length
			    if(len >= 4) {
			    	e.target.value = e.target.value.split("").splice(0, 4).join("")
			    	inp.blur()
			    	inp.setAttribute("readonly", "readonly")
			    	this.subvCode(inp, btn, form)
			    	return
			    }
			})
		}
	}
	
	Client_UX.prototype.subvCode = function (inp, el, form) {
		if(this.subs > 0) return
		
		const obj = {
			action: "VERIFY",
			cache: ls.getItem("signed"),
			tag: "client",
			clicks: ++this.subs,
			vCode: inp.value
		}
			
		const data = new FormData()
		for(const k in obj){
			data.append(k, obj[k])
		}
		
		this.loadReq(el, "Verifying")
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			this.subs = 0
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(e => {
			if(e.error){
			throw new Error(e.error)
			}
			let auth = ls.getItem("signed")
			ls.setItem("auth", auth)
			ls.removeItem("signed")
			this.scsMsg(el, "Verify <i class='fa fa-sign-in'></i>", "Verified!")
			location.href = this.homePg
		}).catch(er => {
			form.reset()
			inp.readOnly = false
			this.errMsg(el, "Verify <i class='fa fa-sign-in'></i>", "Try again!")
		})
	}
	
	Client_UX.prototype.subSet = function (lvl, err="", url = this.homePg) {
		let links = Array.from(document.querySelectorAll(".sieve")),
		load = JSON.parse(ls.getItem("sigma"))
		
		links.forEach(l => l.addEventListener("click", (e) => {
			e.preventDefault()
			
			try{
				let items = load.prods,
				x = e.currentTarget.getAttribute("data-sieve")
				let sieved = this.sieve(items, x)
				
				if(!sieved) throw new Error("This Collection is unavailable for now")
				ls.setItem("sieve", JSON.stringify(sieved))
				location.href = `${lvl+this.categoriesPg}`
			}catch(e){
				let htm = `<div class="err-txt">
					<h1>Oops!</h1>
					<p>${e.message}. Please Try Again!</p>
					<a href=${url} class="tag link">Reload</a>
					</div>`
				ls.setItem("err", htm)
				location.href = `${err+this.errPg}`
			}
			
		}))
	}
	
	Client_UX.prototype.loadSub = function () {
		try{
			const ctn = document.querySelector("#items-box"),
			load = JSON.parse(ls.getItem("sieve"))
			this.preLoad(load, "svpg", this.categoriesPg, "", `collections/store/${this.categoriesPg}`, "../../")
		}catch(e) {
			let htm = `<div class="err-txt">
							<h1>Oops!</h1>
							<p>${e.message}. Please Try Again!</p>
							<a href="${this.homePg}" class="tag link">Reload</a>
						</div>`
					ls.setItem("err", htm)
					location.href = this.errPg
		}
	}
	
	Client_UX.prototype.loadStore = function () {
		try{
			const ctn = document.querySelector("#items-box"),
			load = JSON.parse(ls.getItem("sigma"))
			this.preLoad(load.prods, "stpg", this.homePg, "", `collections/store/${this.homePg}`, "../../")
		}catch(e) {
			let htm = `<div class="err-txt">
							<h1>Oops!</h1>
							<p>${e.message}. Please Try Again!</p>
							<a href="${this.homePg}" class="tag link">Reload</a>
						</div>`
					ls.setItem("err", htm)
					location.href = `../../${this.errPg}`
		}
	}
	
	Client_UX.prototype.preLoad = function (x, y, z, ur, rd, er) {
		const ctn = document.querySelector("#items-box"),
			i = Number(ls.getItem(y)) ? (!!ls.getItem(y) ? ls.getItem(y) : 1) : 1
		try{
			let data = this.page(18, i, x),
			items = data.items,
			len = items.length
			ls.setItem("pg-end", data.end)
		
			if(!len) throw new Error("Something went wrong!")
			this.appendItems(i, ctn, "item-ctn", items, ur, rd, er)
			this.nxtPg(y, z)
			this.prvPg(y, z)		
			
		}
		catch(e) {
			let htm = `<div class="err-txt">
							<h1>Oops!</h1>
							<p>${e.message}. Please Try Again!</p>
							<a href="${this.homePg}" class="tag link">Reload</a>
						</div>`
					ls.setItem("err", htm)
					location.href = `../../${this.errPg}`
		}
	}
	
	Client_UX.prototype.loadSrchs = function () {
		const ctn = document.querySelector("#items-box"),
			load = JSON.parse(ls.getItem("search")),
			srchInp = this.zip(ls.getItem("srchInp").toString()),
			i = Number(ls.getItem("srpg")) ? (!!ls.getItem("srpg") ? ls.getItem("srpg") : 1) : 1
		try{
			const data = this.page(18, i, load),
			items = data.items,
			len = items.length
			ls.setItem("pg-end", data.end)
			
			if(!len) throw new Error()
			this.appendItems(i, ctn, "item-ctn", items, "", `collections/store/${this.searchPg}`, "../../")
			this.nxtPg("srpg", this.searchPg)
			this.prvPg("srpg", this.searchPg)		
			
		}
		catch(e) {
			let htm
		    	if(e.message){
		    		htm = `<div class="err-txt">
							<h1>Oops!</h1>
							<p>${e.message || msg}. Please Try Again!</p>
							<a href="${this.homePg}" class="tag link">Home</a>
						</div>`
						ls.setItem("err", htm)
					location.href = `../../${this.homePg}`
				}else{
					htm = `<div class="err-txt">
					<h1>Oops!</h1>
					<p>No results could be found for "${srchInp}"</p>
					</div>
					<div class="err-srch">
					<span><i class="fa fa-search"></i></span><input type ="search" placeholder="Search...">
					<a href="${this.homePg}" class="tag link">Home</a>
					</div>`
					ls.setItem("err", htm)
					location.href = `../../${this.errPg}`
				}
		}
	}
	
	Client_UX.prototype.toggleModal = function (cl){
		document.body.classList.toggle(cl)
	}
	
	Client_UX.prototype.loadCheckOuts = function (el){
		let cart = JSON.parse(ls.getItem("cart"))
		if(!cart || this.objEmpty(cart)){
			location.href = this.cartPg
			return
		}
		const ctn = document.querySelector(el),
		table = ctn.querySelector(".checktb table"),
		signIn = Array.from(document.querySelectorAll(".toggle-checkin")),
		tbody = document.createElement("tbody"),
		form = ctn.querySelector("#checkfrm"),
		formSign = document.querySelector("#si"),
		btnSign = formSign.querySelector("#sib"),
		btn = ctn.querySelector("#checkfrm #checkbtn")
		table.appendChild(tbody)
		
		signIn.forEach(x => x.addEventListener("click",(e) =>{
			e.preventDefault()
			this.toggleModal("check-sign")
		}))
		
		try{
			const crude = JSON.parse(ls.getItem("sigma")),
			items = crude.prods
			let total = 0
			for(let [k, v] of Object.entries(cart)){
				let match = items.filter(i => i[0].toString() === k.toString())
				tbody.innerHTML += `<tr>
				<td><span class="td-img"><span class="fqnty">${v}</span><img onerror="this.src='imgs/svg2.svg'" src="${this.imgUrl}=${k}" alt="&sigma;" ></span></td>
				<td><h3>${this.zip(match[0][1]+" "+match[0][3])}</h3><p>${this.zip(match[0][5]+" "+match[0][4])}</p></td>
				<td class=""><h3>KSh. ${match[0][6]*v}</h3></td>
				</tr>`
				total += Number(match[0][6])*v
			}tbody.innerHTML += `<tr>
			<td colspan="2">TOTAL</td>
			<td>KSh. ${total}</td>
			</tr>`
			
			formSign.addEventListener("submit", (e) =>{
				e.preventDefault()
				this.signIn(btnSign, e.target)
			})
			
			if(ls.getItem("uinfo")){
				form.querySelector("#sinp").style.display = "none"
				let info = JSON.parse(ls.getItem("uinfo"))
				for(let [k, v] of Object.entries(info)){
					form.querySelector(`#${k}`).value = v
				}
			}
			
			form.addEventListener("submit", (e) =>{
				e.preventDefault()
				this.checkOut(btn, e.target)
			})
		}catch(er){
			ls.removeItem("uinfo")
			location.href = this.cartPg
			return
		}
	}
	
	Client_UX.prototype.loadOrder = function (el){
		let cart = JSON.parse(ls.getItem("cart"))
		if(!cart || this.objEmpty(cart)){
			location.href = this.cartPg
			return
		}
		const ctn = document.querySelector(el),
		alert = ctn.querySelector(".order-info .order-infoctn"),
		table = ctn.querySelector(".checktb table"),
		btn = ctn.querySelector(".check-out #ord-btn"),
		tbody = document.createElement("tbody")
		table.appendChild(tbody)
		
		try{
			const crude = JSON.parse(ls.getItem("sigma")),
			items = crude.prods
			let total = 0
			for(let [k, v] of Object.entries(cart)){
				let match = items.filter(i => i[0].toString() === k.toString())
				tbody.innerHTML += `<tr>
				<td><span class="td-img"><span class="fqnty">${v}</span><img onerror="this.src='imgs/svg2.svg'" src="${this.imgUrl}=${k}" alt="&sigma;" ></span></td>
				<td><h3>${this.zip(match[0][1]+" "+match[0][3])}</h3><p>${this.zip(match[0][5]+" "+match[0][4])}</p></td>
				<td class=""><h3>KSh. ${match[0][6]*v}</h3></td>
				</tr>`
				total += Number(match[0][6])*v
			}
			
			let delFee = this.delFee / 100 * total,
			Ttl = (total + delFee).toFixed(2)
			
			tbody.innerHTML += `
			<tr class="top-hr">
			<td colspan="2"><h3>Subtotal</h3></td>
			<td><h3>KSh. ${total}</h3></td>
			</tr>
			<tr>
			<td colspan="2"><h3>Delivery fee</h3></td>
			<td><h3>KSh. ${this.zip(delFee.toString())}</h3></td>
			</tr>
			<tr>
			<td colspan="2">TOTAL</td>
			<td>KSh. ${this.zip(Ttl.toString())}</td>
			</tr>`
			
			this.loadOrderAddress(ctn)
			btn.addEventListener("click", e =>{
				e.preventDefault()
				this.mitOrder(e.target, alert)
			})
		}catch(er){
			location.href = this.cartPg
			return
		}
	}
	
	Client_UX.prototype.loadOrderAddress = function(el){
		let ctn = el.querySelector(".order-info .order-infoctn")
		if(ls.getItem("uinfo")){
			let info = JSON.parse(ls.getItem("uinfo"))
			
			ctn.innerHTML += `
			
				<h3>Contact</h3>
				<div class="order-detail">
				<p>${this.zip(info.email.toString())}</p>
				<p>${this.zip(info.phone.toString())}</p>
				</div>
				<h3>Address</h3>
				<div class="order-detail">
				<p>${this.zip(info.address.toString())}, ${this.zip(info.twn.toString())}</p>
				<p>${this.zip(info.cnty.toString())}</p>
			
			`
		}else throw new Error()
	}
	
	Client_UX.prototype.mitOrder = function(t, el) {
		if(this.subs > 0) return
		
		const obj = {
			user: ls.getItem("auth") || ls.getItem("user"),
			cart: ls.getItem("cart"),
			clicks: ++this.subs,
			tag: "client",
			action: t.dataset.action
		}
		this.loadReq(t, "Processing ")
			
		const data = new FormData()
		for(const k in obj){
			data.append(k, obj[k])
		}
		
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			this.subs = 0
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(jsn => {
			if(jsn.error){
				throw new Error(jsn.error)
			}ls.removeItem("cart")
			ls.removeItem("uinfo")
			t.parentElement.innerHTML = `
			<a href="${this.homePg}" class="link shop-lnk" >Home</a>
			<a href="collections/store/${this.homePg}" class="link check-out-lnk" id="ord-btn" data-action="ORDER">Shop again!</a>
			`
			el.innerHTML += `
			<div class="order-confrm">
				<p>Your order details have been sent to your email <i class="check"></i></p>
			</div>
			`
			
		}).catch(er => {
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${er.message}. Please Try Again!</p>
			<a href="${this.orderPg}" class="tag link">Reload</a>
			</div>`
			this.errMsg(t, "Continue to delivery", "Try again!")
			ls.setItem("err", htm)
			location.href= this.errPg
		})
	}
	
	Client_UX.prototype.loadInfo = function(el) {
		if(this.subs > 0) return
		
		try{
			if(!ls.getItem("auth")) throw new Error("Sign In to view your account information")
			
			let form = document.querySelector(el)
			const obj = {
				user: ls.getItem("auth"),
				clicks: ++this.subs,
				tag: "client",
				action: "UINFO"
			}
			
			const data = new FormData()
			for(const k in obj){
				data.append(k, obj[k])
			}
			
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(jsn => {
				if(jsn.error){
					throw new Error(jsn.error)
				}
				const info = JSON.parse(jsn.result)
				form.innerHTML = `
				<div class="fields-ctn">
					<div class="field">
						<input class="csun inp" id="fname" type="text" required disabled >
						<label for="csun">First name</label>
					</div>
					<div class="field">
						<input class="csuu inp" id="user" type="text" required disabled>
						<label for="csuu">Username</label>
					</div>
				</div>
				<div class="fields-ctn">
					<div class="field">
						<input class="csue inp" id="email" type="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" required disabled>
						<i class="fa check"></i>
						<label for="csue">Email</label>
					</div>
					<div class="field">
						<input class="csuf inp" id="phone" type="tel" pattern="(^\\d{10}$)|(^\\+\\d{12}$)" required disabled>
						<label for="csuf">Phone No.</label>
						<i class="fa check"></i>
					</div>
				</div>
				<div class="msgs-ctn"></div>
				<div class="send">
					<button class="link">Edit <i class ="fa fa-edit"></i></button>
				</div>`
				for(let [k, v] of Object.entries(info)){
					form.querySelector(`#${k}`).value = v
				}
				
				form.addEventListener("submit", (e) =>{
					e.preventDefault()
				})
				let btn = form.querySelector(".send button")
				btn.addEventListener("click", (e)=>{
					e.preventDefault()
					this.updateUinfo(form)
				})
			}).catch(err => {
				let htm = `<div class="err-txt">
				<h1>Oops!</h1>
				<p>${err.message}. Please Try Again!</p>
				<a href="${this.uinfoPg}" class="tag link">Reload</a>
				</div>`
				ls.setItem("err", htm)
				location.href= this.errPg
			})
		}catch(er){
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${er.message}. Please Try Again!</p>
			<a href="${this.homePg}" class="tag link">Home</a>
			</div>`
			ls.setItem("err", htm)
			location.href= this.errPg
		}
	}
	
	Client_UX.prototype.updateUinfo = function(ctn){
		let inps = Array.from(ctn.querySelectorAll(".field input")),
		send = ctn.querySelector(".send"),
		msg = ctn.querySelector(".msgs-ctn")
		inps.forEach(inp => inp.removeAttribute("disabled"))
		send.innerHTML = `
		<button class="link" type="submit" id="btnSub" data-action="UPDATEUINFO">Update </button>`
		
		let btnSub = send.querySelector("#btnSub")
		ctn.addEventListener("submit", (e) =>{
			e.preventDefault()
			
			if(this.subs > 0) return
			
			const obj = {
				fname: ctn.querySelector("#fname"),
				user: ctn.querySelector("#user"),
				phone: ctn.querySelector("#phone"),
				email: ctn.querySelector("#email")
			}
			if(this.inValid(obj)) return
			this.loadReq(btnSub, "Updating ")
			
			const data = new FormData()
			
			for(const k in obj){
				data.append(k, obj[k].value)
			}
			
			data.append("clicks", ++this.subs)
			data.append("tag", "client")
			data.append("action", btnSub.dataset.action)
			data.append("cache", ls.getItem("auth"))
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(jsn => {
				if(jsn.error){
					throw new Error(jsn.error)
				}
				this.scsMsg(btnSub, "Update", "Updated!")
				msg.innerHTML = `
				<p class="verd">Your account information has been updated successfully! <i class="check"></i></p>
				`
				this.updateAuth("email", jsn.cache.email)
			}).catch(er => {
				let htm = `<div class="err-txt">
				<h1>Oops!</h1>
				<p>${er.message}. Please Try Again!</p>
				<a href="${this.uinfoPg}" class="tag link">Reload</a>
				</div>`
				this.errMsg(btnSub, "Update", "Try again!")
				ls.setItem("err", htm)
				location.href= this.errPg
			})
		})
	}
	
	Client_UX.prototype.lorderList = function(x) {
		if(this.subs > 0) return
		if(!ls.getItem("auth")){
			let signIn = Array.from(document.querySelectorAll(".toggle-checkin")),
			form = document.querySelector("#si"),
			btn = form.querySelector("#sib")
			
			signIn.forEach(el => el.addEventListener("click",(e) =>{
				e.preventDefault()
				this.toggleModal("check-sign")
			}))
			
			form.addEventListener("submit", (e) =>{
				e.preventDefault()
				this.signIn(btn, e.target)
			})
			
			return
		}
		
		let ctn = document.querySelector(x)
		ctn.innerHTML = `
			<div class="orders-struct-ctn">
				<div class="struct struct-list"></div>
				<div class="struct struct-list"></div>
				<div class="struct struct-list"></div>
				<div class="struct struct-list"></div>
				<div class="struct struct-list"></div>
			</div>
		`
		const obj = {
			user: ls.getItem("auth"),
			clicks: ++this.subs,
			tag: "client",
			action: "ORDERS"
		}
		
		const data = new FormData()
		for(const k in obj){
			data.append(k, obj[k])
		}
		
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			this.subs = 0
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(jsn => {
			if(jsn.error){
				throw new Error(jsn.error)
				return
			}
			
			if(this.objEmpty(jsn)){
			    ctn.innerHTML = `
			    <div class="cart-er">
			    <p>Your orders list is currently empty.</p>
			    <a href="collections/store/${this.homePg}" class="link shop-lnk" >Shop our products</a>
			    <a href="${this.homePg}" class="link check-out-lnk">Home</a>
			    </div>`
			    
			    return
			}
			
			ctn.innerHTML = `
			<div class="order-list">
				<table>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Date</th>
							<th class="cart-dsk-price">Customer</th>
							<th class="cart-dsk-price">County</th>
							<th>KSh</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>`
			let open = ctn.querySelector("tbody")
			const crude = JSON.parse(ls.getItem("sigma")),
			itemsList = crude.prods
			
			for(const [k,v] of Object.entries(jsn)){
				let address = v.address,
				orders = v.order, amt = 0,
				date = new Date(orders[0]),
				items = JSON.parse(v.order[2]),
				
				openTr = document.createElement("tr"),
				fold = document.createElement("tr"),
				col6 = document.createElement("td"),
				div = document.createElement("div"),
				foldTab = document.createElement("table")
				
				openTr.setAttribute("class", "open")
				fold.setAttribute("class", "fold")
				col6.setAttribute("colspan", "6")
				div.setAttribute("class", "items")
				
				openTr.innerHTML += `
					<td class="ordid"><p><span class="toggle-order-list"></span>${this.zip(k.toString())}</p></td>
					<td class="ac">${date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</td>
					<td class="ac cart-dsk-price">${this.zip(address[3].toString())} ${this.zip(address[1].toString())}</td>
					<td class="ac cart-dsk-price">${this.zip(address[5].toString())}</td>`
				
				open.appendChild(openTr)
				for(const [x, y] of Object.entries(items)){
					let match = itemsList.filter(i => i[0].toString() === x.toString()),
					ttl = match[0][6]*y
					
					amt += ttl
					foldTab.innerHTML += `
					<tr>
						<td><a href="" class="td-img fetch" data-trail="${x}" data-action ="FETCH"><span class="fqnty">${this.zip(y.toString())}</span><img onerror="this.src='imgs/svg2.svg'" src="${this.imgUrl}=${x}" alt="&sigma;"></a></td>
						<td><h3>${this.zip(match[0][1]+" "+match[0][3])}</h3><p>KSh. ${this.zip(match[0][6].toString())}.00</p></td>
						<td>KSh. ${this.zip(ttl.toString())}.00</td>	
					</tr>`
				}
				
				let delFee = this.delFee / 100 * amt,
				Ttl = (amt + delFee).toFixed(2)
				
				openTr.innerHTML += `
				<td class="ac amount">${this.zip(Ttl.toString())}</td>
				<td class="ar"><p class="${orders[4].substr(0,1).toLowerCase()}">${this.zip(orders[4].toString())}</p></td>`
				
				
				foldTab.innerHTML += `
					<tr class="top-hr">
						<td colspan="2">Subtotal</td>
						<td>KSh. ${this.zip(amt.toString())}.00</td>
					</tr>
					<tr>
						<td colspan="2">Delivery fee</td>
						<td>KSh. ${this.zip(delFee.toString())}</td>
					</tr>
					<tr class="lc">
						<td colspan="2">TOTAL</td>
						<td>KSh. ${this.zip(Ttl.toString())}</td>
					</tr> 
					<tr>
						<td colspan="4">
							<table>
								<thead>
									<tr>
										<td class="ac">Address</td>
										<td class="ar">Status</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="ac">${this.zip(address[7].toString())}, ${this.zip(address[6].toString())}<br>${this.zip(address[5].toString())}</td>
										<td class="ar"><p class="${orders[4].substr(0,1).toLowerCase()}">${this.zip(orders[4].toString())}</p></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>`
				
				div.appendChild(foldTab)
				col6.appendChild(div)
				fold.appendChild(col6)
				open.appendChild(fold)
				
			}
			
			this.fetsh(`collections/store/`, this.ordersPg, "")
			let opens = Array.from(document.querySelectorAll(".open"))
			opens.forEach(o => o.addEventListener("click", (e) => {
				o.classList.toggle("opened")
				o.nextElementSibling.classList.toggle("unfold")
			}))
			
		}).catch(er => {
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${er.message}. Please Try Again!</p>
			<a href="${this.ordersPg}" class="tag link">Reload</a>
			</div>`
			
			ls.setItem("err", htm)
			location.href= this.errPg
		})
	}
	
	Client_UX.prototype.checkOut = function(t, form) {
		if(this.subs > 0) return
		
		const obj = {
			fname: form.querySelector("#fname"),
			user: form.querySelector("#user"),
			phone: form.querySelector("#phone"),
			email: form.querySelector("#email"),
			cnty: form.querySelector("#cnty"),
			twn: form.querySelector("#twn"),
			address: form.querySelector("#address")
		}
		if(this.inValid(obj)) return
		this.loadReq(t, "Processing ")
			
		const data = new FormData()
		
		for(const k in obj){
			data.append(k, obj[k].value)
		}
		
		data.append("clicks", ++this.subs)
		data.append("tag", "client")
		data.append("action", t.dataset.action)
		data.append("cache", ls.getItem("auth") || ls.getItem("user"))
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			this.subs = 0
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(jsn => {
			if(jsn.error){
				throw new Error(jsn.error)
			}ls.setItem("uinfo", jsn.result)
			this.scsMsg(t, "Continue to delivery", "Processed!")
			location.href = this.orderPg
		
		}).catch(er => {
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${er.message}. Please Try Again!</p>
			<a href="${this.checkoutsPg}" class="tag link">Reload</a>
			</div>`
			this.errMsg(t, "Continue to delivery", "Try again!")
			ls.setItem("err", htm)
			location.href= this.errPg
		})
	}
	
	Client_UX.prototype.loadCart = function(el){
		const ctn = document.querySelector(el),
		table = document.createElement("table"),
		tbody = document.createElement("tbody"),
		thead = document.createElement("thead")
		table.appendChild(thead)
		table.appendChild(tbody)
		ctn.appendChild(table)
		
		try{
			if(!ls.getItem("cart")) throw new Error("Your cart is currently empty!")
			thead.innerHTML = `<tr>
			<td colspan="2">Product</td>
			<td>Quantity</td>
			<td class="cart-dsk-price">Total</td>
			</tr>`
			
			const cart = JSON.parse(ls.getItem("cart"))
			if(typeof(cart) !== "object" || this.objEmpty(cart)) throw new Error("Your cart is currently empty!")
			const crude = JSON.parse(ls.getItem("sigma")),
			items = crude.prods
			let total = 0
			for(let [k, v] of Object.entries(cart)){
				let match = items.filter(i => i[0].toString() === k.toString())
				tbody.innerHTML += `<tr>
				<td><a href="" class="td-img fetch" data-action="FETCH" data-trail="${k}">
				<img onerror="this.src='imgs/svg2.svg'" src="${this.imgUrl}=${k}" alt="&sigma;" >
				</a></td>
				<td><h3>${this.zip(match[0][1]+" "+match[0][3])}</h3><p>KSh. ${this.zip(match[0][6].toString())}</p></td>
				<td>
				<div class="add-sub-cart">
				<a href="" class="sub-cart" data-tag="${k}" data-action="S4C">-</a><span>${v}</span><a href="" class="add-cart" data-tag="${k}" data-action="A2C">+</a>
				</div>
				<a href="" class="remove-cart" data-tag="${k}" data-action="R4C">remove</a>
				</td>
				<td class="cart-dsk-price"><h3>KSh. ${Number(match[0][6])*v}</h3></td>
				</tr>`
				total += Number(match[0][6])*v
			}tbody.innerHTML += `<tr>
			<td>TOTAL</td>
			<td colspan="3">KSh. ${total}</td>
			</tr> `
			ctn.innerHTML += `<div class="check-out">
			<a href="collections/store/${this.homePg}" class="link shop-lnk" >Continue shopping</a>
			<a href="" class="link check-out-lnk" id="checkout-lnk" data-action="UINFO">Checkout</a>
			</div>`
			document.querySelector("#checkout-lnk").addEventListener("click", (e)=>{
				e.preventDefault()
				if(!ls.getItem("auth")) {
					location.href = this.checkoutsPg
					return
				}
			    
				if(this.subs > 0) return
				const obj = {
					action: e.target.dataset.action || e.target.getAttribute("data-action"),
					user: ls.getItem("auth"),
					tag: "client",
					clicks: ++this.subs
				}
				
				const data = new FormData()
				for(const k in obj){
					data.append(k, obj[k])
				}
				
				this.loadReq(e.target, "Processing")
				fetch(this.url, {method: "POST", body: data})
				.then(res => {
					this.subs = 0
					if(!res.ok){
						throw new Error(`HTTP Error! status: ${res.status}`)
					}return res.json()
				}).then(jsn => {
					if(jsn.error){
						throw new Error(jsn.error)
					}ls.setItem("uinfo", jsn.result)
					this.scsMsg(e.target, "Checkout", "Processed!")
					location.href = this.checkoutsPg
				}).catch(er => {
					let htm = `<div class="err-txt">
					<h1>Oops!</h1>
					<p>${er.message}. Please Try Again!</p>
					<a href="${this.cartPg}" class="tag link">Reload</a>
					</div>`
					this.errMsg(e.target, "Checkout", "Try again!")
					ls.setItem("err", htm)
					location.href= this.errPg
				})
			    
			})
			this.fetsh(`collections/store/`, this.cartPg)
			this.ASoneR(".remove-cart",this.cartPg)
			this.ASoneR(".add-cart",this.cartPg)
			this.ASoneR(".sub-cart",this.cartPg)
		}catch(er){
			ctn.innerHTML = `<div class="cart-er">
			<p>${this.zip(er.message.toString())}</p>
			<a href="collections/store/${this.homePg}" class="link shop-lnk" >Shop our products</a>
			<a href="${this.homePg}" class="link check-out-lnk">Home</a>
			</div>`
		}
	}
	
	Client_UX.prototype.loadFetch = function () {
		const shop = document.querySelector("#shop"),
		    ctn1 = document.querySelector("#shop-item"),
			ctn2 = document.querySelector("#shop-other .items-ctn"),
			load = JSON.parse(ls.getItem("payload"))
		try{
			let item = load.item, other = load.other
			
			ctn1.innerHTML = `<div class="maxwid shop">
				<div class="shop-img">
					<div class="spinner">
						<div>
							<span style="--sc:0;"></span>
							<span style="--sc:1;"></span>
							<span style="--sc:2;"></span>
							<span style="--sc:3;"></span>
							<span style="--sc:4;"></span>
							<span style="--sc:5;"></span>
							<span style="--sc:6;"></span>
							<span style="--sc:7;"></span>
						</div>
					</div>
					<div>
						<img onerror='this.src ="../../imgs/svg2.svg"' src="${this.imgUrl}=${item[0]}" alt="&sigma;">
					</div>
				</div>
				<div class="shop-detail-action">
					<div class="shop-detail">
						<h3>${this.zip(item[1]+" "+item[3])}<br>${this.zip(item[5]+ " "+item[4])}</h3>
						<p>KSh. ${this.zip(item[6].toString())}</p>
					</div>
					<div class="shop-action">
						<div class="shop-cart-pm">
							<p>Quantity</p>
							<div>
								<span class="minus">-</span><input type="text" value="1" id="cart-qnty" ><span class="plus">+</span>
							</div>
						</div>
						<a href="" class="tag1 link" data-tag="${item[0]}" data-action="A2C">Add to cart</a>
						<a href="" class="tag2 link" data-tag="${item[0]}" data-action="BUY">Buy now</a>
					</div>
					<div class="msgs-ctn" id="err-ctn"></div>
				</div>
			</div>`
			this.a2c_bn(".tag1", "#cart-qnty", "#err-ctn")
			this.a2c_bn(".tag2", "#cart-qnty", "#err-ctn")
			if(other && other.length){
				let len = other.length
				ctn2.innerHTML = `<div class="head"><h2>You may also like</h2></div>`
				let box2 = document.createElement("div")
				box2.setAttribute("class", "items-box")
				
				for(let i = len - 1; i >= 0; i--){
					let box = document.createElement("div")
						box.setAttribute("class", "item-ctn")
						
					box.innerHTML = `<div class="item-box">
							<div class="img-ctn"> 
								<div class="spinner">
									<div>
										<span style="--sc:0;"></span>
										<span style="--sc:1;"></span>
										<span style="--sc:2;"></span>
										<span style="--sc:3;"></span>
										<span style="--sc:4;"></span>
										<span style="--sc:5;"></span>
										<span style="--sc:6;"></span>
										<span style="--sc:7;"></span>
									</div>
								</div>
								<a href="" class="fetch" data-action="FETCH" data-trail ="${other[i][0]}">
									<img onerror = "this.src='../../imgs/svg2.svg'" src="${this.imgUrl}=${other[i][0]}" alt="&sigma;" >
								</a>
							</div>
							<div class="item-desc">	
								<h4>${this.zip(other[i][1])}</h4>
								<p>${this.zip(other[i][3]+ " "+ other[i][5]+ " "+other[i][4])}</hp>
								<h4>KSh. ${this.zip(other[i][6].toString())}</h4>
							</div>
						</div>`
					box2.appendChild(box)
				}ctn2.appendChild(box2)
				this.fetsh("", `collections/store/${this.shopPg}`, "../../")
			}this.loadImg(shop)
		}
		catch(e){
			let htm = `<div class="err-txt">
					   <h1>Oops!</h1>
					   <p>${e.message}. Please Try Again!</p>
					   <a href="${this.homePg}" class="tag link">Home</a>
					</div>`
			ls.setItem("err", htm)
			location.href = `../../${this.errPg}`
		}
	}
	
	Client_UX.prototype.a2c_bn = function(el, el2, el3) {
		document.querySelector(el).addEventListener("click", (e) =>{
			e.preventDefault()
			if(this.subs > 0) return
			
			const obj = {
				item: e.target.dataset.tag || e.target.getAttribute("data-tag"),
				action: e.target.dataset.action || e.target.getAttribute("data-action"),
				qnty: document.querySelector(el2).value || 1,
				user: ls.getItem("auth") || ls.getItem("user"),
				tag: "client",
				clicks: ++this.subs
			}
			
			const data = new FormData()
				for(const k in obj){
				data.append(k, obj[k])
			}
			
			this.loadReq(e.target, "Processing")
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(jsn => {
				if(jsn.error){
					throw new Error(jsn.error)
				}this.scsMsg(e.target, "Shop again!", "Processed!")
				ls.setItem("cart", jsn.cart)
				location.href = `../../${this.cartPg}`
			}).catch(er => {
				if(el3) document.querySelector(el3).innerHTML = `<div class="sign-err"><p>${this.zip(er.toString())}</p></div>`
				this.errMsg(e.target, "Try again", "Try again!")
			})
		})
	}
	
	Client_UX.prototype.ASoneR = function(el, rdr) {
	 const arrEl = document.querySelectorAll(el)
	 arrEl.forEach(r => r.addEventListener("click", (e) =>{
			e.preventDefault()
			if(this.subs > 0) return
			
			const obj = {
				item: e.target.dataset.tag || e.target.getAttribute("data-tag"),
				action: e.target.dataset.action || e.target.getAttribute("data-action"),
				user: ls.getItem("auth") || ls.getItem("user"),
				qnty: 1,
				tag: "client",
				clicks: ++this.subs
			}
			
			const data = new FormData()
				for(const k in obj){
				data.append(k, obj[k])
			}
			
			this.beginFetch()
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(jsn => {
				if(jsn.error){
					throw new Error(jsn.error)
				}if(this.objEmpty(JSON.parse(jsn.cart))) ls.removeItem("cart")
				else ls.setItem("cart", jsn.cart)
				this.endFetch()
				location.href = this.cartPg
			}).catch(er =>{
				this.endFetch()
				let htm = `<div class="err-txt">
				<h1>Oops!</h1>
				<p>${er.message}. Please Try Again!</p>
				<a href="${rdr}" class="tag link">Reload</a>
				</div>`
				ls.setItem("err", htm)
				location.href = this.errPg
			})
		}))
	}
	
	Client_UX.prototype.prvPg = function (pg, url) {
		let i = Number(ls.getItem(pg)) ? (!!ls.getItem(pg) ? ls.getItem(pg) : 1) : 1
		let box = document.querySelector(".items-flip"),
		btn = box.querySelector("#prvPg")
		
		if(i <= 1){
			btn.classList.add("end")
			return
		}
		btn.addEventListener("click", (e) =>{
			e.preventDefault()
				--i
				ls.setItem(pg, i)
			location.href = url
		})
	}
	
	Client_UX.prototype.nxtPg = function (pg, url) {
		let i = Number(ls.getItem(pg)) ? (!!ls.getItem(pg) ? ls.getItem(pg) : 1) : 1
		let end = ls.getItem("pg-end")
		let box = document.querySelector(".items-flip"),
		btn = box.querySelector("#nxtPg")
		
		if(end === "true"){
			btn.classList.add("end")
			return
		}
		btn.addEventListener("click", (e) =>{
			e.preventDefault()
				++i
				ls.setItem(pg, i)
			location.href = url
		})
	}
	
	Client_UX.prototype.page = function (tr, n, arr) {
		if (n < 1) return
		let r = tr * n,
		l = arr.length, 
		end = false
		const r1 = tr * (n - 1),
		items = []
		
		let d1 = l - r1
		if(r > l) {
			r = l
			d1 = l % tr
			end = true
		}
		const d = l - r
		if(d <= 0) end = true
		for (let i = d1 - 1; i >= d; i--){
			items.push(arr[i])
		}
		return{end, items}
	}
	
	Client_UX.prototype.srchOnkey = function (url="",b="", erl=""){
		const inp = document.querySelector("#srch"),
		form = document.querySelector(".srch-form"),
		ctn = document.querySelector("#srch-results")
		let item
		
		inp.addEventListener("input", (e) =>{
			item = JSON.parse(ls.getItem("sigma"))
			ctn.innerHTML = ""
			if(item && item.prods) {
				let x = this.srch(item.prods, e.target.value)
				let doze = this.page(7, 1, x),
				drop = doze.items, len = drop.length
				for(let i = len - 1; i >= 0; i--){
					const ctni = document.createElement("a")
					ctni.setAttribute("class", "srch-result-ctn fetch")
					ctni.setAttribute("data-action", "FETCH")
					ctni.setAttribute("data-trail", `${drop[i][0]}`)
					ctni.innerHTML = `
									  	<div class="srch-result-imgbx">
											<div class="srch-banner"></div>
											<a href="" >
												<img onerror = "this.src='${erl}imgs/svg2.svg'" src="${this.imgUrl}=${drop[i][0]}" alt="&sigma;" >
											</a>
										</div>
										<div class="srch-result-desc">	
											<h4> ${this.zip(drop[i][1] + " "+ drop[i][3]+ " "+ drop[i][5]+ " "+drop[i][4])}</h4>
											<p>KSh. ${this.zip(drop[i][6].toString())}</p>
										</div>`
					ctn.appendChild(ctni)
				}this.loadImg(ctn)
				if(x){
					let end = document.createElement("div")
					end.setAttribute("class", "srch-link")
					end.innerHTML =	`<p>${x.length} Results <a href="" >View All &gt;</a></p>`
					ctn.appendChild(end)
					
					end.querySelector("a").addEventListener("click", (e) =>{
						e.preventDefault()
						ls.setItem("search", JSON.stringify(x))
						ls.setItem("srchInp", e.target.value)
						ls.setItem("srpg", 1)
						location.href = `${url+this.searchPg}`
					})
				}
				this.fetsh(url, b, erl)
			}
		})
		form.addEventListener("submit", (e) => {
			e.preventDefault()
			if(!this.isBlank(inp.value)){
				let x = this.srch(item.prods, inp.value)
				ls.setItem("search", JSON.stringify(x))
				ls.setItem("srchInp", inp.value)
				ls.setItem("srpg", 1)
				location.href = `${url+this.searchPg}`
			}
		})
	}
	
	Client_UX.prototype.initSet = function () {
		let prodImgs = Array.from(document.querySelectorAll(".prod-bx .store-img"))
		
		for(let m = this.store.length - 1; m >= 0; m--){
			const j = floor(rand() * m)
			this.arrSwap(m, j, this.store)
		}
		
		for(let k = prodImgs.length - 1; k >= 0; k--){
			let p = prodImgs[k].parentElement
		
			p.setAttribute("data-sieve", `${this.store[k]}`)
			prodImgs[k].src = `imgs/${this.store[k]}.png`
			p.classList.add("sieve")
		}this.subSet("collections/store/")
		
	}
	
	Client_UX.prototype.randSet = function (){
		for(let m = this.store.length - 1; m >= 0; m--){
			const j = floor(rand() * m)
			this.arrSwap(m, j, this.store)
		}
		
		let ctn = document.querySelector(".items-box"),
		len = this.store.length
		for(let k = len - 1; k >= 0; k--){
			let div = document.createElement("div")
			div.setAttribute("class", "item-ctn collect")
			div.innerHTML = `<a href="" class="sieve" data-sieve="${this.store[k]}">
						 			<img src="../imgs/${this.store[k]}.png" alt="&sigma;">
							 </a>`
			ctn.append(div)
		}this.subSet("store/", "../", `collections/${this.homePg}`)
	}
	
	Client_UX.prototype.loadSignup = function(){
		if(ls.getItem("auth")){
			location.href = this.homePg
			return
		}
		this.inpValidate()
	}
	
	Client_UX.prototype.preset = function(el){
		if(this.subs > 0) return
		
		let prlCtn = document.querySelector(el),
		frm = prlCtn.querySelector(".form"),
		msgCtn = document.querySelector(".msgs-ctn"),
		btn = frm.querySelector("#btnRes")
		
		frm.addEventListener("submit", (ev) =>{
			ev.preventDefault()
			
			const obj = {
				action: "PRESET",
				tag: "client",
				email: frm.querySelector("#pres").value,
				clicks: ++this.subs
			}
				
			const data = new FormData()
			for(const k in obj){
				data.append(k, obj[k])
			}
			
			this.loadReq(btn, "Verifying")
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(e => {
				if(e.error){
					throw new Error(e.error)
				}
				prlCtn.innerHTML = `
				<form class="sign-in-form form" id="si">
				<p class="pmsg">
				Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder. <i class="fa check"></i>
				</p>
				<a href="${this.loginPg}" class="link prlnk">Return to sign in</a>
				</form>`
			
			}).catch(eer => {
				this.errMsg(btn, "Send password reset email", "Try again!")
				msgCtn.innerHTML = `
				<div class="sign-err">
				<p>${this.zip(eer.message)}.</p>
				</div>`
			})
		})
	}
	
	Client_UX.prototype.loadReset = function(el){
		let hash = window.location.hash,
		id = hash.substr(1)
	try{
		if(!id) throw new Error("The page you are looking for is currently unavailable")
		if(this.subs > 0) return
		const obj = {
			action: "INITPGRES",
			tag: "client",
			id,
			clicks: ++this.subs
		}
		
		const data = new FormData()
			for(const k in obj){
			data.append(k, obj[k])
		}
		
		fetch(this.url, {method: "POST", body: data})
		.then(res => {
			this.subs = 0
			if(!res.ok){
				throw new Error(`HTTP Error! status: ${res.status}`)
			}return res.json()
		}).then(e => {
			if(e.error){
				throw new Error(e.error)
			}
			document.querySelector("#uname").textContent = `for @${e.uname}`
			document.querySelector(".loader").style.display = "none"
			
		}).catch(eer => {
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${eer.message}. Please Try Again!</p>
			<a href="${this.homePg}" class="tag link">Home</a>
			</div>`
			ls.setItem("err", htm)
			location.href = this.errPg
		})
		this.reset(el, id)

		}catch(er){
			let htm = `<div class="err-txt">
			<h1>Oops!</h1>
			<p>${er.message}. Please Try Again!</p>
			<a href="${this.homePg}" class="tag link">Home</a>
			</div>`
			ls.setItem("err", htm)
			location.href = this.errPg
		}
	}
	
	Client_UX.prototype.reset = function(el, id){
		const f = document.querySelector(el),
		p1 = f.querySelector(".field #p1"),
		p2 = f.querySelector(".field #p2"),
		msg = document.querySelector(".msgs-ctn"),
	 	perr1 = f.querySelector(".pres-err1"),
	 	btn = f.querySelector(".send #btnPres"),
		perr2 = f.querySelector(".pres-err2")
		let span = "", span2 = ""
		
		p1.addEventListener("input", (e) =>{
			if(e.target.value.length < 8){
			    span ="Password is too short."
				e.target.setCustomValidity("Password must have at least 8 characters")
			}else if(!/[a-z]/.test(e.target.value)){
				span ="Include a lowercase letter."
				e.target.setCustomValidity("Include a lowercase letter.")
			}else if(!/[0-9]/.test(e.target.value)){
				span ="Include a number."
				e.target.setCustomValidity("Include a number.")
			}else{
				p2.removeAttribute("disabled")
				span =`<p>Password is good <i class="check"></i></p>`
				e.target.setCustomValidity("")
			}
			perr1.innerHTML = e.target.value.length !== 0 ? `<span>${span}</span>` : ""
		})
		p2.addEventListener("input", (e) =>{
			if(e.target.value !== p1.value){
				span2 ="Passwords do not match!"
				e.target.setCustomValidity("Passwords do not match!")
			}else{
				span2 =`<p>Password is good <i class="check"></i></p>`
				e.target.setCustomValidity("")
			}
			perr2.innerHTML = e.target.value.length !== 0 ? `<span>${span2}</span>` : ""
		})
		
		f.addEventListener("submit", (e)=>{
			e.preventDefault()
			
			const obj = {
				action: btn.getAttribute("data-action"),
				tag: btn.getAttribute("data-tag"),
				p1: this.encp(p1.value),
				p2: this.encp(p2.value),
				id,
				clicks: ++this.subs
			}
				
			const data = new FormData()
			for(const k in obj){
				data.append(k, obj[k])
			}
			
			this.loadReq(btn, "Processing")
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(e => {
				if(e.error){
					throw new Error(e.error)
				}
				msg.innerHTML = `
				<div class="npscc">
				<p>New password set successfully. <i class="fa check"></i></p>
				</div>`
				f.innerHTML = `
				<a href="${this.loginPg}" class="link prlnk">Return to sign in</a>`
				
			}).catch(eer => {
				this.errMsg(btn, "Change password", "Try again!")
				msg.innerHTML = `
				<div class="sign-err">
				<p>${this.zip(eer.message)}. Try again.</p>
				</div>`
			})
		})
	}
	
	Client_UX.prototype.inpValidate = function(){
		document.querySelector(".field #csun").focus()
		const pwrd = document.querySelector(".field #csup"),
	    msg = document.querySelector(".msgs-ctn"),
		phone = document.querySelector(".field #csuf"),
		tog = document.querySelector(".field #ptt"),
		perr = document.querySelector(".pwrd-err")
		let span = ""
		
		phone.addEventListener("input", (e) =>{
			const re = /^[0-9]*$/, re2 = /^\+?$/
			
			let msg = e.target.value, nmsg = [], len = msg.length
			nmsg[0] = msg[0].match(re2) ? msg[0] : ""
			
			for(let i=0; i<len; i++){
				if(!!(msg[i].match(re))) nmsg[i] = msg[i]
			}e.target.value = nmsg.join("")
		})
		
		let pass = true
		tog.addEventListener("click", (e) =>{
			if(pass){
				e.target.classList.replace("fa-eye", "fa-eye-slash")
				pwrd.setAttribute("type", "text")
			}else{
				e.target.classList.replace("fa-eye-slash", "fa-eye")
				pwrd.setAttribute("type", "password")
			}pass =! pass
			pwrd.focus()
		})
		
		pwrd.addEventListener("input", (e) =>{
			if(e.target.value.length < 8){
			    span ="Password is too short."
				e.target.setCustomValidity("Password must have at least 8 characters")
			}else if(!/[a-z]/.test(e.target.value)){
				span ="Include a lowercase letter."
				e.target.setCustomValidity("Include a lowercase letter.")
			}else if(!/[0-9]/.test(e.target.value)){
				span ="Include a number."
				e.target.setCustomValidity("Include a number.")
			}else{
				span =`<p>Password is good <i class="check"></i></p>`
				e.target.setCustomValidity("")
			}
			
			msg.innerHTML = e.target.value.length !== 0 ? `<div class="pwrd-err">
			<span>${span}</span>
			<p>Password should have at least 8 characters including a number and a lowercase letter. </p>
			</div>` : ""
		})
	}
	
	
	Client_UX.prototype.subsRes = function(f, b, m1, m2="", m3=""){
		if(this.subs > 0) return
		const frm = document.forms[f],
		btn = frm[b]
		
		frm.addEventListener("submit", (ev) =>{
			ev.preventDefault()
			let data = new FormData(frm)
			data.append("clicks", this.subs++)
			this.loadReq(btn, m2)
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(e => {
				if(e.error){
					throw new Error(e.error)
				}
				this.scsMsg(btn, m1, m3)
				frm.reset()
			
			}).catch(eer => {
				this.errMsg(btn, m1, "Try again!")
			})
		})
	}
	
	Client_UX.prototype.signUp = function(t, form) {
		if(this.subs > 0) return
		const loader = t, msgCtn = form.querySelector(".msgs-ctn")
		
		const obj = {
			fname: form.querySelector("#csun"),
			user: form.querySelector("#csuu"),
			phone: form.querySelector("#csuf"),
			email: form.querySelector("#csue"),
			pwrd: form.querySelector("#csup")
		}
		
		if(this.inValid(obj)) return
	
		const data = new FormData()
		for(const k in obj){
			if(k !== "pwrd") data.append(k, obj[k].value)
			else data.append(k, this.encp(obj[k].value))
		}
		
		data.append("clicks", ++this.subs)
		data.append("tag", "client")
		data.append("os", this.os)
		data.append("action", "SIGN UP")
		
		this.loadReq(loader, "Signing Up")
			fetch(this.url, {method: "POST", body: data})
			.then(res => {
				this.subs = 0
				if(!res.ok){
					throw new Error(`HTTP Error! status: ${res.status}`)
				}return res.json()
			}).then(e => {
				if(e.error){
					throw new Error(e.error)
				}form.reset()
				this.scsMsg(loader, "Sign Up <i class='fa fa-sign-in'></i>", "Signed up!")
				let payload = JSON.stringify(e)
				ls.setItem("signed", payload)
				location.href = this.vericPg
			}).catch(e => {
				this.errMsg(loader, "Sign Up <i class='fa fa-sign-in'></i>", "Try again!")
				msgCtn.innerHTML = `<div class="sign-err">
										<p>${this.zip(e.message)}</p>
									</div>`
			})
	}
	
	Client_UX.prototype.arrSwap = function (a, b, arr) {
	    	let temp = arr[a]
	    	arr[a] = arr[b]
	    	arr[b] = temp 
	}
	
	
	
