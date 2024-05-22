"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../module/Models-Interface/productModel");
const orderModel_1 = require("../module/Models-Interface/orderModel");
//product
const createProduct = async (productData) => {
    const product = new productModel_1.Product(productData);
    return await product.save();
};
const getAllProducts = async () => {
    return await productModel_1.Product.find();
};
const getProductById = async (id) => {
    return await productModel_1.Product.findById(id);
};
const updateProduct = async (id, productData) => {
    return await productModel_1.Product.findByIdAndUpdate(id, productData, { new: true });
};
const deleteProduct = async (id) => {
    return await productModel_1.Product.findByIdAndDelete(id);
};
const searchProducts = async (name) => {
    return await productModel_1.Product.find({ name });
    // return await Product.find({ name: new RegExp(name, "i") });
};
//order
const createOrder = async (orderData) => {
    const order = new orderModel_1.Order(orderData);
    return await order.save();
};
const getAllOrders = async () => {
    return await orderModel_1.Order.find();
};
const getOrdersByEmail = async (email) => {
    return await orderModel_1.Order.find({ email });
};
exports.default = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
