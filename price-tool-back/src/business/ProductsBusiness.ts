import { ProductDatabase } from "../database/ProductsDatabase";
import { MissingData } from "../error/MissingData";
import { ItemType } from "../models/Product";
import { catchError } from "./services/CatchError";

const productDatabase = new ProductDatabase();

export class ProductBusiness {
  findItem = async (code: number) => {
    try {
      const item = await productDatabase.findItem(code);

      if (!item.length) {
        throw new MissingData();
      }

      return item;
    } catch (error: any) {
      catchError(error);
    }
  };

  updateItem = async (product: ItemType) => {
    try {
      if (
        !product ||
        product.code ||
        product.cost_price ||
        product.name ||
        product.sales_price
      ) {
        throw new MissingData();
      }
      const data = await productDatabase.updateItem(product);
    } catch (error: any) {
      catchError(error);
    }
  };
}
