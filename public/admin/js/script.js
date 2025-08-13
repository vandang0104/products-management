// Button status 
const buttonStatus = document.querySelectorAll("[button-status]") ;

buttonStatus.forEach(button => {
  button.addEventListener('click',()=>{
    let url = new URL(location.href) ;
    const status = button.getAttribute("button-status") ;

    if(status){
      url.searchParams.set("status",status)
    }else{
      url.searchParams.delete("status") ;
    }

    location.href = url.href ;
  })
})
// END Button status 