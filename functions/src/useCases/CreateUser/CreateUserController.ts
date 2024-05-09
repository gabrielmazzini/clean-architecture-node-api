/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response, Request} from "express";
import {CreateUserUseCase} from "./CreateUserUseCase";

/**
 */
export class CreateUserController {
  /**
   * @param {CreateUserUseCase} createUserUseCase
   */
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}
  /**
   * @param {Request} req
   * @param {Response} res
   * @return {Response}
   */
  async handle(req: Request, res: Response): Promise<Response> {
    const {name, email, password} = req.body;

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });
      return res.status(201).json({
        message: "Sucess",
        status: true,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
