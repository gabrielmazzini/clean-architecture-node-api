/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {User} from "../../../entities/user-entities/User";
import {IMailProvider} from "../../../dataSource/mail-service/IMailProvider";
import {IUserRepository} from "../../../repository/user-repository/IUserRepository";
import {ICreateUserRequestDTO} from "../DTO/CreateUserDTO";
import {ErrorUserAlreadyExists} from "../errors/errors";

/**
 */
export class CreateUserUseCase {
  /**
     * @param {IUserRepository} usersRepository
     * @param {IMailProvider} mailRepository
     */
  constructor(
        private usersRepository: IUserRepository,
        private mailRepository: IMailProvider,
  ) {}
  /**
   * @param {ICreateUserRequestDTO} data
   */
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.fyndByEmail(data.email);
    if (userAlreadyExists) {
      throw new ErrorUserAlreadyExists("User already exists");
    }
    try {
      const user = new User(data);
      await this.usersRepository.save(user);
      this.mailRepository.sendEmail({
        to: {
          name: data.name,
          email: data.email,
        },
        from: {
          name: "Equipe do meu app",
          email: "equipe@equipe.com",
        },
        subject: "Seja Bem Vindo a plataforma",
        body: "<p>Bem vindo!!!!</p>",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
