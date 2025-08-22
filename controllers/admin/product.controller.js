const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const pagination = require("../../helpers/pagination");
const { response } = require("express");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  try {
    const filterStatus = filterStatusHelper(req.query);

    let find = {
      deleted: false
    }

    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
      find.title = objectSearch.regex;
    }

    if (req.query.status) {
      find.status = req.query.status;
    }

    const objectPagination = await paginationHelper(req.query, Product, find);

    const products = await Product.find(find)
      .sort({ position: "desc" })
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);

    res.render("admin/pages/product/index", {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination
    });
  } catch (error) {
    req.flash('error', 'Lỗi khi lấy danh sách sản phẩm');
    res.redirect(`${req.app.locals.prefixAdmin}/dashboard`);
  }
}

// [PATCH] /admin/products/change-status/:active/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash('success', 'Cập nhật trạng thái thành công!');
    const redirectUrl = req.get("referer");
    res.redirect(redirectUrl || `${req.app.locals.prefixAdmin}/products`);
  } catch (error) {
    req.flash('error', 'Lỗi khi cập nhật trạng thái sản phẩm');
    const redirectUrl = req.get("referer");
    res.redirect(redirectUrl || `${req.app.locals.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const status = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (status) {
      case "active":
        await Product.updateMany(
          { _id: { $in: ids } },
          { status: status }
        );
        req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm!`);
        break;
      case "inactive":
        await Product.updateMany(
          { _id: { $in: ids } },
          { status: status }
        );
        req.flash('success', `Cập nhật trạng thái thành công cho ${ids.length} sản phẩm!`);
        break;
      case "delete-all":
        await Product.updateMany(
          { _id: { $in: ids } },
          {
            deleted: true,
            deletedAt: new Date()
          }
        );
        req.flash('success', `Đã xóa thành công ${ids.length} sản phẩm!`);
        break;
      case "change-position":
        for (const item of ids) {
          const arr = item.split("-");
          await Product.updateOne({ _id: arr[0] }, { position: parseInt(arr[1]) });
        }
        req.flash('success', `Đã đổi vị trí thành công cho ${ids.length} sản phẩm!`);
        break;
      default:
        break;
    }

    const redirectUrl = req.get("referer");
    res.redirect(redirectUrl || `${req.app.locals.prefixAdmin}/products`);
  } catch (error) {
    req.flash('error', 'Lỗi khi thực hiện thao tác trên nhiều sản phẩm');
    const redirectUrl = req.get("referer");
    res.redirect(redirectUrl || `${req.app.locals.prefixAdmin}/products`);
  }
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
      deleted: true,
      deletedAt: new Date()
    });

    req.flash('success', `Cập nhật trạng thái thành công sản phẩm!`);
    const redirectUrl = req.get("Referer") || `${req.app.locals.prefixAdmin}/products`;
    res.redirect(redirectUrl);
  } catch (error) {
    req.flash('error', 'Lỗi khi xóa sản phẩm');
    const redirectUrl = req.get("Referer") || `${req.app.locals.prefixAdmin}/products`;
    res.redirect(redirectUrl);
  }
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  try {
    res.render("admin/pages/product/create", {
      pageTitle: "Thêm mới sản phẩm",
    });
  } catch (error) {
    req.flash('error', 'Lỗi khi hiển thị trang tạo sản phẩm');
    res.redirect(`${req.app.locals.prefixAdmin}/products`);
  }
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    if (req.body.position === "") {
      req.body.position = await Product.estimatedDocumentCount() + 1;
    }

    if (req.file) {
      req.body.thumbnail = `/upload/${req.file.filename}`;
    }

    await Product.create(req.body);
    req.flash('success', 'Thêm sản phẩm thành công!');
    res.redirect(`${req.app.locals.prefixAdmin}/products/create`);
  } catch (error) {
    req.flash('error', 'Lỗi khi tạo sản phẩm mới');
    res.redirect(`${req.app.locals.prefixAdmin}/products/create`);
  }
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/pages/product/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product
    });
  } catch (error) {
    req.flash('error', 'Id không tồn tại hoặc lỗi khi lấy thông tin sản phẩm');
    res.redirect(`${req.app.locals.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    if (req.body.position === "") {
      req.body.position = await Product.estimatedDocumentCount() + 1;
    }

    if (req.file) {
      req.body.thumbnail = `/upload/${req.file.filename}`;
    }

    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      req.flash('success', 'Cập nhật thành công!');
    } catch (updateError) {
      console.error('Lỗi khi cập nhật sản phẩm:', updateError);
      req.flash('error', 'Có lỗi xảy ra khi cập nhật sản phẩm!');
    }
    res.redirect(`${req.app.locals.prefixAdmin}/products`);
  } catch (error) {
    console.error('Lỗi trong quá trình xử lý:', error);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xử lý!');
    res.redirect(`${req.app.locals.prefixAdmin}/products`);
  }
}