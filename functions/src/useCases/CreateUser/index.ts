/* eslint-disable max-len */
import {MailTrapMailerProvider} from "../../providers/mail-service/MailTrapMailerProvider";
import {DataBaseUserRepository} from "../../providers/repositories/firebase/DataBaseUserRepository";
import {AdminFirebase} from "../../providers/repositories/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../providers/repositories/firebase/service/firebase-service";
import {CreateUserController} from "./CreateUserController";
import {CreateUserUseCase} from "./CreateUserUseCase";

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
