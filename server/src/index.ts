import "dotenv/config";

import ExpressAdapter from './infra/http/ExpressAdapter';
import { ProductController } from './infra/controller/ProductController';
import { CartController } from './infra/controller/CartController';
import { GetCartUseCase } from './applications/use-cases/GetCartUseCase';
import { CartDaoDatabase } from './infra/database/dao/CartDaoDatabase';
import { PostgresAdapter } from './infra/database/adapter/PostgresAdapter';
import { AddToCartUseCase } from './applications/use-cases/AddToCartUseCase';
import { ProductDaoDatabase } from './infra/database/dao/ProductDaodatabase';
import { GetProductByIdUseCase } from './applications/use-cases/GetProductByIdUseCase';

const NODE_PORT = process.env.PORT ?? 8080;

// Adapters
const expressAdapter = new ExpressAdapter();
const connection = new PostgresAdapter();

// DAOs
const cartDAODatabase = new CartDaoDatabase(connection);
const productDAODatabase = new ProductDaoDatabase(connection);

// Use Cases
const getProductByIdUseCase = new GetProductByIdUseCase(productDAODatabase);
const getCartUseCase = new GetCartUseCase(cartDAODatabase);
const addToCartUseCase = new AddToCartUseCase(cartDAODatabase, productDAODatabase);

// Start server
const startServer = async () => {
  await connection.connect();

  try {
    new CartController(expressAdapter, addToCartUseCase, getCartUseCase);
    new ProductController(expressAdapter, getProductByIdUseCase);

    expressAdapter.listen(NODE_PORT);
  } catch (error) {
    await connection.close();
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();