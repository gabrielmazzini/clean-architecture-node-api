/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {IDeleteUserRepository} from "../../../repository/user-repository/IUserRepository";
import {IDeleteUserDTO} from "../DTO/deleteUserDTO";
import {ErrorUserNotFound} from "../errors/errors";

/**
 */
export class DeleteUserUseCase {
  /**
     * @param {IDeleteUserRepository} deleteUserRepository
     */
  constructor(
    private deleteUserRepository: IDeleteUserRepository
  ) {}
  /**
   * @param {IDeleteUserDTO} data
   */
  async execute(data: IDeleteUserDTO): Promise<void> {
    try {
      await this.deleteUserRepository.deleteUser(data.id);
    } catch (error: any) {
      throw new ErrorUserNotFound(error.message);
    }
  }
}
