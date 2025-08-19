// [GET] /admin/products

const Product = require("../../models/product.model") ;
const filterStatusHelper = require("../../helpers/filterStatus") ;
const searchHelper = require("../../helpers/search") ;
const paginationHelper = require("../../helpers/pagination") ;
const pagination = require("../../helpers/pagination");
const { response } = require("express");

module.exports.index = async (req,res)=>{
  const filterStatus = filterStatusHelper(req.query) ; 

  let find = {
    deleted: false 
  }

  const objectSearch = searchHelper(req.query) ;

  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }

  if(req.query.status){
    find.status = req.query.status ;
  }

  const objectPagination = await paginationHelper(req.query,Product,find)

  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip) ;
  
  res.render("admin/pages/product/index",{
    pageTitle: "Danh sách sản phẩm" ,
    products: products,
    filterStatus:filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  }) ;
}

// [PATCH] /admin/products/change-status/:active/:id
module.exports.changeStatus = async (req,res) => {
  const status = req.params.status ;
  const id = req.params.id ;
  await Product.updateOne({_id: id } , {status:status})

  const redirectUrl = req.get("referer"); 
  res.redirect(redirectUrl || "/admin/products"); 
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
  const status = req.body.type ;
  const ids = req.body.ids.split(", ") ;

  switch (status) {
    case "active":
      await Product.updateMany(
        { _id: { $in: ids } }, 
        { status: status }     
      )
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } }, 
        { status: status }     
      )
      break;
    default:
      break;
  }
  const redirectUrl = req.get("referer"); 
  res.redirect(redirectUrl || "/admin/products"); 
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {
  const id = req.params.id ;
  await Product.deleteOne({_id:id}) ;
  const redirectUrl = req.get("Referer") || "/admin/products";
  res.redirect(redirectUrl);
}