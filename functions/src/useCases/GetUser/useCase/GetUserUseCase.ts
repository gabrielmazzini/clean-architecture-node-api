/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {User} from "../../../entities/user-entities/User";
import {IgetUserRepository} from "../../../repository/user-repository/IUserRepository";
import {GetUserDTO} from "../DTO/GetUserDTO";
import {ErrorUserNotFound} from "../errors/errors";

/**
 */
export class GetUserUseCase {
  /**
     * @param {IgetUserRepository} getUserRepository
     */
  constructor(
        private getUserRepository: IgetUserRepository
  ) {}
  /**
   * @param {GetUserDTO} data
   */
  async execute(data: GetUserDTO): Promise<User | null> {
    try {
      const user = await this.getUserRepository.getInfoUser(data.id);
      return user as User;
    } catch (error: any) {
      throw new ErrorUserNotFound(error.message);
    }
  }
}
