window.onload = () =>{
    const Ui = new UI(".loader"),
   	Ux = new Client_UX()
   	let f = document.querySelector("#si"),
   	t = f.querySelector("#sib")
   	if(ls.getItem("auth")){
   		location.href = Ux.homePg
 	  	return
   	}
 
   	f.addEventListener("submit", (e) =>{
   		e.preventDefault()
   		Ux.signIn(t, e.target)
   	})
   	
	Ui.endLoad()
}