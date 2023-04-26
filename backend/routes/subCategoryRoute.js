var express = require("express");
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../controllers/subCategoryController");

var router = express.Router();

router.route("/create-subcategory").post(createSubCategory);
router.route("/subcategories").get(getAllSubCategories);
router.route("/category/subcategories").get(getSubCategoriesByCategory);
router.route('/subcategories/:id/update').put(updateSubCategory)
router.route('/subcategories/:id/delete').delete(deleteSubCategory)
module.exports = router;
