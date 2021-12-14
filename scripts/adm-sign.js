window.onload = () =>{
    const GsUI = new UI(".loader"),
   	GsUX = new ADM_UX(),
   	asif = document.querySelector("#asi")
   
   	GsUX.auth(asif)
	GsUI.endLoad()
}