module.exports = async (query,Product,find) =>{
  let objectPagination = {
    currentPage: 1,
    limitItems: 4,
  }

  if(query.page){
    objectPagination.currentPage = parseInt(query.page) ;
  }

  objectPagination.skip = (objectPagination.currentPage-1) * objectPagination.limitItems ; 
  const countProducts = await Product.countDocuments(find) ;
  objectPagination.totalPages = Math.ceil(countProducts/objectPagination.limitItems)

  return objectPagination ;
}