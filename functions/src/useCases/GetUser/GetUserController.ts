import {GetUserUseCase} from "./GetUserUseCase";
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
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    const user = await this.getUserUseCase.execute({id});
    return res.status(200).json(user);
  }
}
