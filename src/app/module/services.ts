import { Product, IProduct } from "../module/Models-Interface/productModel";
import { Order, IOrder } from "../module/Models-Interface/orderModel";

//product
const createProduct = async (productData: IProduct) => {
  const product = new Product(productData);
  return await product.save();
};

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const updateProduct = async (id: string, productData: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

const searchProducts = async (name: string) => {
  return await Product.find({ name });
  // return await Product.find({ name: new RegExp(name, "i") });
};

//order
const createOrder = async (orderData: IOrder) => {
  const order = new Order(orderData);
  return await order.save();
};

const getAllOrders = async () => {
  return await Order.find();
};

const getOrdersByEmail = async (email: string) => {
  return await Order.find({ email });
};

export default {
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
