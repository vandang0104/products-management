module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash('error', "Vui lòng nhập tiêu đề!")
    res.redirect(`${req.app.locals.prefixAdmin}/products/create`)
    return;
  }
  next();
}

module.exports.editPatch = (req, res, next) => {
  if (!req.body.title) {
    req.flash('error', "Vui lòng nhập tiêu đề!")
    res.redirect(`${req.app.locals.prefixAdmin}/products/edit/${req.params.id}`)
    return;
  }
  next();
}