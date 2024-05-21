/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-len */
import {IUpdateUserRepository} from "../../../repository/user-repository/IUserRepository";
import {IUpdateUserDTO} from "../DTO/UpdateUserDTO";
import {ErrorUserNotFound} from "../errors/errors";
/**
 */
export class UpdateUserUseCase {
  /**
     * @param {IUpdateUserRepository} updateUserRepository
     */
  constructor(
    private updateUserRepository: IUpdateUserRepository,
  ) {}
  /**
   * @param {IUpdateUserDTO} data
   */
  async execute(data: IUpdateUserDTO): Promise<void> {
    try {
      await this.updateUserRepository.updateUser(data.id, data.name, data.email, data.password);
    } catch (error: any) {
      throw new ErrorUserNotFound(error.message);
    }
  }
}
