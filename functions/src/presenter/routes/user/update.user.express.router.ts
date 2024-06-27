/* eslint-disable max-len */
import {Request, Response} from "express";
import {UpdateUserUsecase} from "../../../usecases/user/update-user/updateUserUsecase";
import {HttpMethod, Route} from "../routes";
import {UpdateUserInputDto} from "../../../usecases/user/update-user/updateUserDto";
import {User} from "../../../domain/entity/user-entity";

export type UpdateUserRespnseDto = {
    message: string;
}
/**
 */
export class UpdateUserRoute implements Route {
  /**
     * @param {string} path
     * @param {HttpMethod} httpMethod
     * @param {UpdateUserUsecase} updateUserService
     */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly updateUserService: UpdateUserUsecase,
  ) {}
  /**
   * @param {UpdateUserUsecase} updateUserService
   * @return {UpdateUserRote}
   */
  public static create(updateUserService: UpdateUserUsecase) {
    return new UpdateUserRoute(
      "/user/:id",
      HttpMethod.PUT,
      updateUserService,
    );
  }
  /**
   * @param {Request} req
   * @param {Response} res
   * @return {Promise}
   */
  getHandler(): (req: Request, res: Response ) => Promise<void> {
    /**
       * @param {Request} req
       * @param {Response} res
       */
    return async (req: Request, res: Response) => {
      const id = req.params.id;
      const {name, email}: Omit<User, "password" | "id"> = req.body;
      if (!name || !email) {
        throw new Error("Campos invalidos");
      }
      const input: UpdateUserInputDto = {
        id: id,
        name: name,
        email: email,
      };
      try {
        const output: UpdateUserRespnseDto = await this.updateUserService.execute(input);
        const response = output;
        res.status(200).json(response).send();
      } catch (error) {
        res.status(500).json(error).send();
      }
    };
  }
  /**
   * @return {string}
   */
  getPath(): string {
    return this.path;
  }
  /**
   * @return {HttpMethod}
   */
  getMethod(): HttpMethod {
    return this.httpMethod;
  }
}
