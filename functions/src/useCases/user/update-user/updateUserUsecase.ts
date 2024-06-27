/* eslint-disable max-len */
import {IUserGateway} from "../../../domain/gateway/user-gateway";
import {Usecase} from "../../usecase";
import {UpdateUserInputDto, UpdateUserOutputDto} from "./updateUserDto";
/**
 */
export class UpdateUserUsecase implements Usecase<UpdateUserInputDto, UpdateUserOutputDto> {
  /**
     * @param {IUserGateway} userGateway
     */
  private constructor(private userGateway: IUserGateway) {}
  /**
   * @param {IUserGateway} userGateway
   * @return {UpdateUserUsecase}
   */
  public static create(userGateway: IUserGateway) {
    return new UpdateUserUsecase(userGateway);
  }
  /**
   * @param {UpdateUserInputDto} input
   */
  public async execute(input: UpdateUserInputDto): Promise<UpdateUserOutputDto> {
    const responseUpdate = this.userGateway.updateUser(input.id, input);
    if (responseUpdate === null) {
      throw new Error("error updating user");
    }
    const message: UpdateUserOutputDto = {
      message: "Successfully updated",
    };
    return message;
  }
}
