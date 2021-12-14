
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader"),
    UX = new Client_UX()
    UX.srchOnkey("collections/store/", UX.homePg, "")
	UX.subSet("collections/store/", "", UX.cartPg)
	UX.lorderList("#olp")
	UX.signOut()
	UX.subsRes("frmSubs", "submit", `Subscribe`)
	UX.subSet("collections/store/", "", UX.ordersPg)
	UX.refresh()
	
	const slideV = function () {
	    GsUI.slidView()
	    raf(slideV)
	}
	
	slideV(false)
	GsUI.appendCopy()
	GsUI.endLoad()
	GsUI.events()
}