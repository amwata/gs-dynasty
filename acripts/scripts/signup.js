window.onload = () =>{
    const GsUI = new UI(".loader"),
   	GsUX = new Client_UX()
   
   	GsUX.subSet(`collections/store/`, "", GsUX.homePg)
   	GsUX.srchOnkey(`collections/store/`, GsUX.homePg, "")
   	GsUX.signOut()
   	GsUX.subsRes("frmSubs", "submit", `Subscribe`)
   	GsUX.refresh()
   	
   	let f = document.querySelector("#csu"),
   	t = f.querySelector("#csub")
   	GsUX.loadSignup()
   	f.addEventListener("submit", (e) =>{
   		e.preventDefault()
   		GsUX.signUp(t, e.target)
   		e.target.blur()
   	})
   	
   	const slideV = function () {
   		GsUI.slidView()
   		raf(slideV)
   	}
   
	slideV(false)
	GsUI.appendCopy()
	GsUI.events()
	GsUI.endLoad()
}