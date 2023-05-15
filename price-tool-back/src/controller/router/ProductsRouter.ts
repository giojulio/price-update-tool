import express from "express";
import { ProductController } from "../ProductsController";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/:code", productController.findItem);
productRouter.put("/", productController.updateItem);
