import express, { Express, Router, Request, Response } from "express";

import { HttpMethods, HttpServer } from "../../contract/http/HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: Express;
  router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.app.use(express.json());
  }

  listen(port: string | number): void {
    this.app.listen(port, () => {
      console.log(`Express is listen by port: ${port}`);
    });
  }

  register(
    method: HttpMethods,
    path: string,
    callback: Function,
  ): void {
    const routeCallback = async (req: Request, res: Response) => {
      const params = req.params;
      const body = req.body;
      const headers = req.headers;

      try {
        const output = await callback(params, body, headers);

        res.status(200).json(output);
      } catch (error) {
        const responseError = error as Error;

        res.status(422).json({
          message: responseError.message,
        });
      }
    };

    this.app[method](`/api${path}`, routeCallback);
  }
}