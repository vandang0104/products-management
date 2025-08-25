const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller")
const multer = require("multer")
const upload = multer();
const productValidate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  productValidate.createPost,
  controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
  '/edit/:id',
  upload.single("thumbnail"),
  productValidate.editPatch,
  controller.editPatch
);

router.get('/detail/:id', controller.detail);

module.exports = router;