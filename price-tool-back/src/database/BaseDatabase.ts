import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export abstract class BaseDatabase {
  abstract TABLE_NAME: string;

  protected static connection = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      multipleStatements: true,
    },
  });

  protected async getItem(value: number) {
    const result = await BaseDatabase.connection(this.TABLE_NAME)
      .select()
      .where({ code: value })
      .orWhere({ pack_id: value });

    return result;
  }

  protected async setNewValue(code: number, column: string, value: any) {
    await BaseDatabase.connection(this.TABLE_NAME)
      .update(`${column}`, `${value}`)
      .where({ code });
  }
}
