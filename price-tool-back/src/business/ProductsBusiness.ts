import { ProductDatabase } from "../database/ProductsDatabase";
import { ItemDTO, ItemType } from "../models/ProductDTO";

const productDatabase = new ProductDatabase();

export class ProductBusiness {
  findItem = async (code: number) => {
    try {
      const item = await productDatabase.findItem(code);

      if (!item.length) {
        // throw error
      }

      return item;
    } catch (error: any) {
      //throw error
    }
  };

  updateItem = async (product: ItemType) => {
    try {
      const data = await productDatabase.updateItem(product);
      //is pack
      return data;
    } catch (error: any) {
      //throw error
    }
  };
}
