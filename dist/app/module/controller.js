"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const productValidation_1 = require("./Validation/productValidation");
const orderValidation_1 = require("./Validation/orderValidation");
const services_1 = __importDefault(require("./services"));
//product controller
const createProduct = async (req, res) => {
    try {
        const productData = productValidation_1.productValidationSchema.parse(req.body);
        const productDataT = productData;
        const product = await services_1.default.createProduct(productDataT);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const name = req.query.name;
        if (name) {
            const products = await services_1.default.searchProducts(name);
            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found for the provided name.",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: products,
            });
        }
        else {
            const products = await services_1.default.getAllProducts();
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: products,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There is something wrong, please check",
            error: err.message,
        });
    }
};
const getSingleProduct = async (req, res) => {
    try {
        const product = await services_1.default.getProductById(req.params.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There is something wrong, please check",
            error: err.message,
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const validation = productValidation_1.productValidationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: validation.error.errors,
            });
        }
        const productData = validation.data;
        const product = await services_1.default.updateProduct(req.params.productId, productData);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There is something wrong, please check",
            error: err.message,
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const product = await services_1.default.deleteProduct(req.params.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There is something wrong, please check",
            error: err.message,
        });
    }
};
//order controller
const createOrder = async (req, res) => {
    try {
        const orderData = orderValidation_1.orderValidationSchema.parse(req.body);
        // @ts-ignore
        const orderDataT = orderData;
        //----------------------------------\\
        // @ts-ignore
        const product = await services_1.default.getProductById(orderDataT.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        if (product.inventory.quantity < orderDataT.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient inventory!",
            });
        }
        product.inventory.quantity -= orderDataT.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        // @ts-ignore
        await services_1.default.updateProduct(product._id, product);
        //----------------------------------\\
        const order = await services_1.default.createOrder(orderDataT);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There is something wrong, please check",
            error: err.message,
        });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const email = req.query.email;
        if (email) {
            const orders = await services_1.default.getOrdersByEmail(email);
            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found for the provided email.",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
        else {
            const orders = await services_1.default.getAllOrders();
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "There is something wrong, please check",
            error: err.message,
        });
    }
};
exports.Controllers = {
    //product
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    //order
    createOrder,
    getAllOrders,
};
