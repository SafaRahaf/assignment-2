"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../module/Models-Interface/productModel");
const orderModel_1 = require("../module/Models-Interface/orderModel");
//product
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.Product(productData);
    return yield product.save();
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.Product.find();
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.Product.findById(id);
});
const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.Product.findByIdAndUpdate(id, productData, { new: true });
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.Product.findByIdAndDelete(id);
});
const searchProducts = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.Product.find({ name });
    // return await Product.find({ name: new RegExp(name, "i") });
});
//order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new orderModel_1.Order(orderData);
    return yield order.save();
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield orderModel_1.Order.find();
});
const getOrdersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orderModel_1.Order.find({ email });
});
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
