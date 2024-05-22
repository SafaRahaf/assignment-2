import express from "express";

import { Controllers } from "./controller";

const router = express.Router();

// productRoutes
router.post("/products", Controllers.createProduct);
router.get("/products", Controllers.getAllProducts);
router.get("/products/:productId", Controllers.getSingleProduct);
router.put("/products/:productId", Controllers.updateProduct);
router.delete("/products/:productId", Controllers.deleteProduct);

// orderRoutes
router.post("/orders", Controllers.createOrder);
router.get("/orders", Controllers.getAllOrders);

export default router;
