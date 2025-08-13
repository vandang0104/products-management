// [GET] /admin/products

const Product = require("../../models/product.model") ;
const filterStatusHelper = require("../../helpers/filterStatus") ;

module.exports.index = async (req,res)=>{
  const filterStatus = filterStatusHelper(req.query) ; 

  let find = {
    deleted: false 
  }

  let keyword = ""

  if(req.query.keyword){
    keyword = req.query.keyword.trim() ;
    const regex = new RegExp(keyword,"i")
    find.title = regex;
  }

  if(req.query.status){
    find.status = req.query.status ;
  }

  const products = await Product.find(find) ;

  // console.log(products) ;
  
  res.render("admin/pages/product/index",{
    pageTitle: "Danh sách sản phẩm" ,
    products: products,
    filterStatus:filterStatus,
    keyword: keyword 
  }) ;
}