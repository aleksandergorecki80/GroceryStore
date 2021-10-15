// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = (req, res, next) => {
  res.status(200).json({
    data: {
      message: 'Show all products',
    },
    success: true,
  });
};

// @desc    Get all products
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = (req, res, next) => {
  res.status(200).json({
    data: {
      message: `Show product ${req.params.id}`,
      reqMsq: req.hello
    },
    success: true,
  });
};

// @desc    Crate new product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = (req, res, next) => {
  res.status(200).json({
    data: {
      message: 'Crate new product',
    },
    success: true,
  });
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = (req, res, next) => {
  res.status(200).json({
    data: {
      message: `Update product ${req.params.id}`,
    },
    success: true,
  });
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = (req, res, next) => {
  res.status(200).json({
    data: {
      message: `Delete products ${req.params.id}`,
    },
    success: true,
  });
};
