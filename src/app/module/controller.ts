import { Request, Response } from "express";
import { productValidationSchema } from "./Validation/productValidation";
import { orderValidationSchema } from "./Validation/orderValidation";
import service from "./services";
import { IProduct } from "./Models-Interface/productModel";
import { IOrder } from "./Models-Interface/orderModel";

//product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = productValidationSchema.parse(req.body);
    const productDataT: IProduct = productData as IProduct;

    const product = await service.createProduct(productDataT);

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    if (name) {
      const products = await service.searchProducts(name);

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
    } else {
      const products = await service.getAllProducts();
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "There is something wrong, please check",
      error: err.message,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await service.getProductById(req.params.productId);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "There is something wrong, please check",
      error: err.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const validation = productValidationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: validation.error.errors,
      });
    }

    const productData = validation.data;

    const product = await service.updateProduct(
      req.params.productId,
      productData
    );

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "There is something wrong, please check",
      error: err.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await service.deleteProduct(req.params.productId);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "There is something wrong, please check",
      error: err.message,
    });
  }
};

//order controller
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = orderValidationSchema.parse(req.body);

    // @ts-ignore
    const orderDataT: IOrder = orderData as IOrder;

    //----------------------------------\\

    // @ts-ignore
    const product = await service.getProductById(orderDataT.productId);
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
    await service.updateProduct(product._id, product);

    //----------------------------------\\

    const order = await service.createOrder(orderDataT);

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "There is something wrong, please check",
      error: err.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (email) {
      const orders = await service.getOrdersByEmail(email);

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
    } else {
      const orders = await service.getAllOrders();
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "There is something wrong, please check",
      error: err.message,
    });
  }
};

export const Controllers = {
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
