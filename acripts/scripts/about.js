"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader")
    document.querySelector(".hianb p").classList.add("s")
	
	const UX = new Client_UX()
	UX.srchOnkey("collections/store/", UX.aboutPg, "")
	UX.signOut()
	UX.subsRes("ctc-form", "submit", `<i class ="fa fa-envelope"></i> Send Message`, "Sending", "Sent!")
	UX.subsRes("frmSubs", "submit", `Subscribe`)
	UX.subSet("collections/store/", "", UX.aboutPg)
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