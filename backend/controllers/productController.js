const Product = require("../models/product");

// Create new product   =>   /api/v1/admin/product/new

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: `success`, product });
};

exports.getProducts = (req, res) => {
  res.status(200).json({ message: `success` });
};
