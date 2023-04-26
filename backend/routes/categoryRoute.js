var express = require('express');
const { createCategory, getAllCategories, deleteCategory, updateCategory } = require('../controllers/categoryController');


var router = express.Router();

router.route('/create-category').post(createCategory)
router.route('/categories').get(getAllCategories)
router.route('/categories/:id/update').put(updateCategory)

router.route('/categories/:id/delete').delete(deleteCategory)
module.exports = router;