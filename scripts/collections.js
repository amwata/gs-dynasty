
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader"),
    Client = new Client_UX()
	Client.srchOnkey("store/", `collections/${Client.homePg}`, "../")
	
	Client.signOut("../")
	Client.subsRes("frmSubs", "submit", `Subscribe`)
	Client.refresh()
	
	const slideV = function () {
	    GsUI.slidView()
	    raf(slideV)
	}
	
	Client.randSet()
	slideV(false)
	GsUI.appendCopy()
	GsUI.events()
	GsUI.endLoad()
}