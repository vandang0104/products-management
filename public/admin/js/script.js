// Button status 
const buttonStatus = document.querySelectorAll("[button-status]") ;

buttonStatus.forEach(button => {
  button.addEventListener('click',()=>{
    let url = new URL(location.href) ;
    const status = button.getAttribute("button-status") ;
    
    if(status){
      url.searchParams.set("status",status)
      url.searchParams.set("page",1)
    }else{
      url.searchParams.delete("status") ;
    }

    location.href = url.href ;
  })
})
// END Button status 

// Form search
const formSearch = document.querySelector("#form-search")

if(formSearch){
  let url = new URL(location.href) ;
  formSearch.addEventListener("submit",e =>{
    e.preventDefault() ;
    const keyword = e.target.elements.keyword.value ;

    if(keyword){
      url.searchParams.set("keyword",keyword)
    } else {
      url.searchParams.delete("keyword") ;
    }

    location.href = url.href ;
  })
}
// END Form search

// Pagination
const buttonPagination = document.querySelectorAll(".page-link")

buttonPagination.forEach(button =>{
  button.addEventListener('click',()=>{
    let url = new URL(location.href) ;
    const page = button.getAttribute("button-pagination")

    if(page>1){
      url.searchParams.set("page",page)
    }else{
      url.searchParams.delete("page") ;
    }

    location.href = url.href ;
  })
})
// END Pagination