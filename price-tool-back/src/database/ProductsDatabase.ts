import { ItemDTO, ItemType } from "../models/ProductDTO";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
  TABLE_NAME = "product";

  public async findItem(code: number) {
    return super.getItem(code);
  }

  public async updateItem(product: ItemType) {
    super.setNewValue(product.code, "sales_price", product.sales_price);
  }
}
