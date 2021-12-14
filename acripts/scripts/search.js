
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader"),
    UX = new Client_UX()
    UX.subSet("", "../../", `collections/store/${UX.searchPg}`)
	UX.srchOnkey("", `collections/store/${UX.searchPg}`, "../../")
	UX.loadSrchs()
	
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