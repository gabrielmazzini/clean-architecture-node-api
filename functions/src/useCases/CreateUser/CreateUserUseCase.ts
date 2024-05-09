/* eslint-disable max-len */
import {User} from "../../entities/User";
import {IMailProvider} from "../../providers/IMailProvider";
import {IUserRepository} from "../../repository/IUserRepository";
import {ICreateUserRequestDTO} from "./CreateUserDTO";

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
      throw new Error("User already exists");
    }

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
  }
}
