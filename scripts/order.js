
"use strict"

window.onload = () =>{
    const GsUI = new UI(".loader"),
    UX = new Client_UX()
    UX.loadOrder(".checkout-pg")
	
	GsUI.endLoad()
}