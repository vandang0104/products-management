// Button status 
const buttonStatus = document.querySelectorAll("[button-status]");

buttonStatus.forEach(button => {
  button.addEventListener('click', () => {
    let url = new URL(location.href);
    const status = button.getAttribute("button-status");

    if (status) {
      url.searchParams.set("status", status)
      url.searchParams.set("page", 1)
    } else {
      url.searchParams.delete("status");
    }

    location.href = url.href;
  })
})
// END Button status 

// Form search
const formSearch = document.querySelector("#form-search")

if (formSearch) {
  let url = new URL(location.href);
  formSearch.addEventListener("submit", e => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword)
    } else {
      url.searchParams.delete("keyword");
    }

    location.href = url.href;
  })
}
// END Form search

// Pagination
const buttonPagination = document.querySelectorAll(".page-link")

buttonPagination.forEach(button => {
  button.addEventListener('click', () => {
    let url = new URL(location.href);
    const page = button.getAttribute("button-pagination")

    if (page > 1) {
      url.searchParams.set("page", page)
    } else {
      url.searchParams.delete("page");
    }

    location.href = url.href;
  })
})
// END Pagination

// Checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
  inputCheckAll.addEventListener("click", () => {
    inputsId.forEach(input => {
      input.checked = inputCheckAll.checked;
    });
  });
  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length ;
      inputCheckAll.checked = countChecked == inputsId.length ? true : false ;
    })
  })
}
// END Checkbox

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]") ;
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", e =>{
    e.preventDefault() ;
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked") ; 
    const typeChange = e.target.elements.type.value ;
    if(typeChange == "delete-all"){
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này không?") ;
      if(!isConfirm){
        return ;
      }
    }
    if(inputsChecked.length>0){
      let ids = [] ;
      const inputIds = formChangeMulti.querySelector("input[name ='ids']")
      inputsChecked.forEach(input=> {
        const id = input.value;
        ids.push(id) ;
      })
      inputIds.value = `${ids.join(", ")}` 
      formChangeMulti.submit() ;
    } else {
      alert("VUI LÒNG CHỌN ÍT NHẤT 1 BẢN GHI") ;
    } 
  })
}
// END Form change multi