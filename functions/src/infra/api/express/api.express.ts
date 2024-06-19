/* eslint-disable @typescript-eslint/no-explicit-any */
import {Api} from "../api";
import express, {Express} from "express";
import {Route} from "./routes/routes";

/**
 */
export class ApiExpress implements Api {
  private app: Express;
  /**
   * @param {Route} routes
   */
  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }
  /**
   * @param {Route} routes
   * @return {ApiExpress}
   */
  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }
  /**
   * @param {Route} routes
   */
  private addRoutes(routes: Route[]) {
    routes.forEach((routes) => {
      const path = routes.getPath();
      const method = routes.getMethod();
      const handler = routes.getHandler();

      this.app[method](path, handler);
    });
  }
  /**
   * @return {Express}
     */
  public start() {
    this.listRoutes();
    const app = this.app;
    return app;
  }
  /**
   */
  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((router: any) => {
        return {
          path: router.route.path,
          method: router.route.method,
        };
      });
    console.log(routes);
  }
}
