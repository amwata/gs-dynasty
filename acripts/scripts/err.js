
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader")
    const GsUX = new Client_UX(),
    msgBox = document.querySelector("#err-ctn")
    GsUX.showMsg(msgBox)
    GsUX.srchOnkey("collections/store/", GsUX.homePg, "")
    GsUX.signOut()
    GsUX.subsRes("frmSubs", "submit", `Subscribe`)
    GsUX.subSet("collections/store/", "", GsUX.homePg)
    GsUX.refresh()
	
	const slideV = function () {
	    GsUI.slidView()
	    raf(slideV)
	}
	slideV(false)
	GsUI.appendCopy()
	GsUI.endLoad()
	GsUI.events()
}