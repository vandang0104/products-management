module.exports.createPost = (req,res,next) => {
  if(!req.body.title){
    req.flash('error',"Vui lòng nhập tiêu đề!")
    const redirectUrl = req.get("referer"); 
    res.redirect(`${req.app.locals.prefixAdmin}/products/create`)
    return ;
  }
  next() ;
}