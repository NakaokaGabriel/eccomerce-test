import { Client } from "pg";

import DatabaseConnection from "../../../contract/database/Connection";

export class PostgresAdapter implements DatabaseConnection {
  private client: Client;

  constructor() {
    this.client = new Client({
      connectionString: "postgresql://ecommerce_user:ecommerce_password@localhost:5432/ecommerce_db"
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async query<R>(statement: string, params?: any[]): Promise<R> {
    const result = await this.client.query(statement, params);
    return result.rows as R;
  }

  async close(): Promise<void> {
    await this.client.end();
  }
}