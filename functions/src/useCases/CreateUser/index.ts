/* eslint-disable max-len */
import {MailTrapMailerProvider} from "../../providers/implementations/MailTrapMailerProvider";
import {DataBaseUserRepository} from "../../repository/implementations/DataBaseUserRepository";
import {CreateUserController} from "./CreateUserController";
import {CreateUserUseCase} from "./CreateUserUseCase";


const postgressUsersRepository = new DataBaseUserRepository();
const mailTrapMailProvider = new MailTrapMailerProvider();

const createUserUseCase = new CreateUserUseCase(
  postgressUsersRepository,
  mailTrapMailProvider,
);

const createUserController = new CreateUserController(
  createUserUseCase,
);

export {createUserUseCase, createUserController};
