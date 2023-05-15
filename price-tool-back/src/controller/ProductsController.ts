import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductsBusiness";
import { ItemType } from "../models/Product";

export class ProductController {
  findItem = async (req: Request, res: Response) => {
    try {
      const { code } = req.params;

      const item = await new ProductBusiness().findItem(Number(code));

      res.status(200).send({ item });
    } catch (error: any) {
      res.status(400).send(error.message || error.sqlMessage);
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const { product_code, product_name, current_price, new_price } = req.body;

      const newData: ItemType = {
        code: product_code,
        name: product_name,
        cost_price: current_price,
        sales_price: new_price,
      };

      await new ProductBusiness().updateItem(newData);

      res.status(200).send("Changes made.");
    } catch (error: any) {
      res.status(400).send(error.message || error.sqlMessage);
    }
  };
}
