"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
// productRoutes
router.post("/products", controller_1.Controllers.createProduct);
router.get("/products", controller_1.Controllers.getAllProducts);
router.get("/products/:productId", controller_1.Controllers.getSingleProduct);
router.put("/products/:productId", controller_1.Controllers.updateProduct);
router.delete("/products/:productId", controller_1.Controllers.deleteProduct);
// orderRoutes
router.post("/orders", controller_1.Controllers.createOrder);
router.get("/orders", controller_1.Controllers.getAllOrders);
exports.default = router;
