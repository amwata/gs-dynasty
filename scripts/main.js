"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader")
	const UX = new Client_UX()
	UX.srchOnkey("collections/store/", UX.homePg, "")
	UX.signOut()
	UX.subsRes("ctc-form", "submit", `<i class ="fa fa-envelope"></i> Send Message`, "Sending", "Sent!")
	UX.subsRes("frmSubs", "submit", `Subscribe`)
	
	const slider = function () {
	    if(GsUI.isInView(GsUI.slidesCtn, 30, false)){
	    	cancelRaf(slider)
	    	GsUI.slide()
	    	setTimeout(slider, 3000)
	    }else raf(slider)
	}
	
	const slideV = function () {
	    GsUI.slidView()
	    GsUI.slidHom()
	    raf(slideV)
	}
	
	slider()
	slideV()
	GsUI.appendCopy()
	GsUI.endLoad()
	GsUI.events()
	UX.__init__(".items-box")
}