/* eslint-disable max-len */
import {User} from "../../../domain/entity/user-entity";
import {IUserGateway} from "../../../domain/gateway/user-gateway";
import {Usecase} from "../../usecase";
import {GetUserInputDto, GetUserOutputDto} from "./getUserDto";


/**
 */
export class GetUserUsecase implements Usecase<GetUserInputDto, GetUserOutputDto> {
  /**
     * @param {IUserGateway} userGateway
     */
  constructor(
        private userGateway: IUserGateway
  ) {}
  /**
   * @param {IUserGateway} userGateway
   * @return {void}
   */
  public static create(userGateway: IUserGateway) {
    return new GetUserUsecase(userGateway);
  }
  /**
   * @param {GetUserInputDto} input
   */
  async execute(input: GetUserInputDto): Promise<GetUserOutputDto> {
    const user = await this.userGateway.getInfoUser(input.id);
    if (user === null) {
      throw new Error("User not found");
    }
    const output = this.presenter(user);
    return output;
  }
  /**
   * @param {User} user
   * @return {GetUserOutputDto}
   */
  private presenter(user: Omit<User, "password">): GetUserOutputDto {
    const output: GetUserOutputDto = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return output;
  }
}
