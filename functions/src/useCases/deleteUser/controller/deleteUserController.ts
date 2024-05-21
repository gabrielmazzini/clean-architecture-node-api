/* eslint-disable @typescript-eslint/no-explicit-any */
import {ErrorUserNotFound} from "../errors/errors";
import {DeleteUserUseCase} from "../useCase/deleteUserUseCase";
import {Request, Response} from "express";
/**
 */
export class DeleteUserController {
  /**
     * @param {DeleteUserUseCase} deleteUserUseCase
     */
  constructor(
    private deleteUserUseCase: DeleteUserUseCase
  ) {}
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    try {
      await this.deleteUserUseCase.execute({id});
      return res.status(200).json({
        message: "Successfully deleted",
        status: true,
      });
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
