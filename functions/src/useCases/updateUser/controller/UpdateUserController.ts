/* eslint-disable @typescript-eslint/no-explicit-any */
import {UpdateUserUseCase} from "../useCase/UpdateUserUseCase";
import {Request, Response} from "express";
import {ErrorUserNotFound} from "../errors/errors";
/**
 */
export class UpdateUserController {
  /**
     * @param {updateUserUseCase} updateUserUseCase
     */
  constructor(
    private updateUserUseCase: UpdateUserUseCase
  ) {}
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "1 ou mais campos estão inválidos",
        status: false,
      });
    }
    const data = {id, name, email, password};
    try {
      await this.updateUserUseCase.execute(data);
      return res.status(200).json("Usuário atualizado com sucesso");
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
