/* eslint-disable max-len */
import {UpdateUserDataBaseUserRepository} from "../../dataSource/repositories/databaseUserRepository/DataBaseUserRepository";
import {AdminFirebase} from "../../dataSource/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../dataSource/firebase/service/firebase-service";
import {UpdateUserController} from "./controller/UpdateUserController";
import {UpdateUserUseCase} from "./useCase/UpdateUserUseCase";

const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);
const updateUserDataBaseUserRepository = new UpdateUserDataBaseUserRepository(firebaseInstance);
const updateUserUseCase = new UpdateUserUseCase(updateUserDataBaseUserRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

export {firebaseInstance, updateUserUseCase, updateUserController};
