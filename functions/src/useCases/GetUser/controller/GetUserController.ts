/* eslint-disable @typescript-eslint/no-explicit-any */
import {ErrorUserNotFound} from "../errors/errors";
import {GetUserUseCase} from "../useCase/GetUserUseCase";
import {Request, Response} from "express";

/**
 */
export class GetUserController {
  /**
     * @param {GetUserUseCase} getUserUseCase
     */
  constructor(
    private getUserUseCase: GetUserUseCase
  ) {}
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      const user = await this.getUserUseCase.execute({id});
      return res.status(200).json(user);
    } catch (error: any) {
      if (error instanceof ErrorUserNotFound) {
        return res.status(404).json({
          message: error.message,
          status: false,
        });
      } else {
        return res.status(500).json({
          message: error.message,
          status: false,
        });
      }
    }
  }
}
