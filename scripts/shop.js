
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader"),
    Client = new Client_UX()
	Client.subSet("", "../../", `collections/store/${Client.shopPg}`)
	Client.srchOnkey("", `collections/store/${Client.shopPg}`, "../../")
	
	Client.signOut("../../")
	Client.subsRes("frmSubs", "submit", `Subscribe`)
	Client.refresh()
	
	const slideV = function () {
	    GsUI.slidView()
	    raf(slideV)
	}
	Client.loadFetch()
	
	const qnty = document.querySelector("#cart-qnty"),
		plus = document.querySelector(".plus"),
		minus = document.querySelector(".minus")
	qnty.addEventListener("input", (e) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, "")
		e.target.value = Number(qnty.value) < 1 ? 1 : e.target.value
	})
	let inpv = Number(qnty.value)
	plus.addEventListener("click", (e) => {
		let add = Number(qnty.value) < 100 ? Number(qnty.value) + 1 : 100
		qnty.value = add
	})
	minus.addEventListener("click", (e) => {
		let add = Number(qnty.value) > 1 ? Number(qnty.value) - 1 : 1
		qnty.value = add
	})
	
	slideV(false)
	GsUI.appendCopy()
	GsUI.endLoad()
	GsUI.events()
}