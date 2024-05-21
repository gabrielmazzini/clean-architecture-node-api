/* eslint-disable max-len */
import {MailTrapMailerProvider} from "../../dataSource/mail-service/MailTrapMailerProvider";
import {DataBaseUserRepository} from "../../dataSource/repositories/databaseUserRepository/DataBaseUserRepository";
import {AdminFirebase} from "../../dataSource/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../dataSource/firebase/service/firebase-service";
import {CreateUserController} from "./controller/CreateUserController";
import {CreateUserUseCase} from "./useCase/CreateUserUseCase";

const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);

const postgressUsersRepository = new DataBaseUserRepository(firebaseInstance);
const mailTrapMailProvider = new MailTrapMailerProvider();

const createUserUseCase = new CreateUserUseCase(
  postgressUsersRepository,
  mailTrapMailProvider,
);

const createUserController = new CreateUserController(
  createUserUseCase,
);

export {createUserUseCase, createUserController, firebaseInstance};
