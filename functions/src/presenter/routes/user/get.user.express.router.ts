/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from "express";
import {GetUserUsecase} from "../../../usecases/user/get-user/getUserUsecase";
import {HttpMethod, Route} from "../routes";
import {GetUserInputDto} from "../../../usecases/user/get-user/getUserDto";
import {ErrorUserAlreadyExists} from "../../../usecases/user/create-user/errors";


export type GetUserResponseDto = {
    id: string;
    name: string;
    email: string;
}
/**
 */
export class GetUserRoute implements Route {
  /**
     * @param {string} path
     * @param {HttpMethod} method
     * @param {GetUserUsecase} getUserService
     */
  private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getUserService: GetUserUsecase,
  ) {}
  /**
   * @param {GetUserUsecase} getUserService
   * @return {GetUserRoute}
   */
  public static create(getUserService: GetUserUsecase) {
    return new GetUserRoute(
      "/user/:id",
      HttpMethod.GET,
      getUserService,
    );
  }
  /**
     * @param {Request} req
     * @param {Response} res
     * @return {Promise}
     */
  getHandler(): (req: Request, res: Response) => Promise<void> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      const id = req.params.id;
      const input: GetUserInputDto = {
        id: id,
      };
      try {
        const output: GetUserResponseDto = await this.getUserService.execute(input);
        const responseBody = this.presenter(output);
        res.status(200).json(responseBody);
      } catch (error) {
        if (error instanceof ErrorUserAlreadyExists) {
          res.status(404).json(error.message).send();
        }
      }
    };
  }
  /**
   * @param {GetUserResponseDto} input
   * @return {GetUserResponseDto}
   */
  private presenter(input: GetUserResponseDto): GetUserResponseDto {
    const response = {
      id: input.id,
      name: input.name,
      email: input.email,
    };
    return response;
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
    return this.method;
  }
}
