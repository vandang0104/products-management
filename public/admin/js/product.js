// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus.length>0){
  const formChangeStatus = document.querySelector("#form-change-status")
  const path = formChangeStatus.getAttribute("data-path")
  buttonChangeStatus.forEach(button=>{
    button.addEventListener("click",()=>{
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id")

      const statusChange = statusCurrent =="active" ? "inactive" : "active" ;

      const action = path + `/${statusChange}/${id}?_method=PATCH` ;
      formChangeStatus.action = action ;

      formChangeStatus.submit();
    })
  })
}

//END Change status

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete){
  const formChangeItem = document.querySelector("#form-change-item") ;
  buttonDelete.forEach(button => {
    button.addEventListener("click",()=>{
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này không?") ;
      if(isConfirm){
        const id = button.getAttribute("data-id") ;
        const path = formChangeItem.getAttribute("data-path")
        formChangeItem.action = path + `/${id}?_method=DELETE` ;
        formChangeItem.submit() ;
      }
    })
  })
}
// END Delete item