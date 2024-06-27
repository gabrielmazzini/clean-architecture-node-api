/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {User} from "../../../domain/entity/user-entity";
import {MailGateway} from "../../../domain/gateway/mail.gateway";
import {IUserGateway} from "../../../domain/gateway/user-gateway";
import {CreateUserInputDto, CreateUserOutputDto} from "./CreateUserDTO";
import {ErrorUserAlreadyExists} from "./errors";
import {Usecase} from "../../usecase";

/**
 */
export class CreateUserUseCase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  /**
     * @param {IMailProvider} mailRepository
     * @param {IUserGateway} userGateway
     */
  private constructor(
        private userGateway: IUserGateway,
        private mailRepository: MailGateway,
  ) {}
  /**
   * @param {IUserGateway} userGateway
   * @param {IMailProvider} mailRepository
   * @return {void}
   */
  public static create(userGateway: IUserGateway, mailRepository: MailGateway) {
    return new CreateUserUseCase(userGateway, mailRepository);
  }
  /**
   * @param {ICreateUserRequestDTO} data
   */
  public async execute({name, email, password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const userAlreadyExists = await this.userGateway.fyndByEmail(email);
    if (userAlreadyExists != null) {
      throw new ErrorUserAlreadyExists("User already exists");
    }
    const user = User.create(name, email, password);
    await this.userGateway.save(user);
    this.mailRepository.sendEmail({
      to: {
        name: name,
        email: email,
      },
      from: {
        name: "Equipe do meu app",
        email: "equipe@equipe.com",
      },
      subject: "Seja Bem Vindo a plataforma",
      body: "<p>Bem vindo!!!!</p>",
    });
    const output = this.presentOutput(user);
    return output;
  }
  /**
   * @param {User} user
   * @return {CreateUserOutputDto}
   */
  private presentOutput(user: User): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      id: user.id,
    };
    return output;
  }
}
