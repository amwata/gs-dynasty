
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader"),
    UX = new Client_UX()
	UX.srchOnkey("", `collections/store/${UX.categoriesPg}`, "../../")
	UX.subSet("", "../../", `collections/store/${UX.categoriesPg}`)
	UX.loadSub()
	
	UX.signOut("../../")
	UX.subsRes("frmSubs", "submit", `Subscribe`)
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