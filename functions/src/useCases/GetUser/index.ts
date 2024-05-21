/* eslint-disable max-len */
import {GetUserDataBaseUserRepository} from "../../dataSource/repositories/databaseUserRepository/DataBaseUserRepository";
import {AdminFirebase} from "../../dataSource/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../dataSource/firebase/service/firebase-service";
import {GetUserController} from "./controller/GetUserController";
import {GetUserUseCase} from "./useCase/GetUserUseCase";


const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);
const getUserDataBaseUserRepository = new GetUserDataBaseUserRepository(firebaseInstance);
const getUserUseCase = new GetUserUseCase(getUserDataBaseUserRepository);
const getUserController = new GetUserController(getUserUseCase);

export {firebaseInstance, getUserUseCase, getUserController};

