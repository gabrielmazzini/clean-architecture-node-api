/* eslint-disable max-len */
import {GetUserDataBaseUserRepository} from "../../providers/repositories/firebase/DataBaseUserRepository";
import {AdminFirebase} from "../../providers/repositories/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../providers/repositories/firebase/service/firebase-service";
import {GetUserController} from "./GetUserController";
import {GetUserUseCase} from "./GetUserUseCase";


const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);
const getUserDataBaseUserRepository = new GetUserDataBaseUserRepository(firebaseInstance);
const getUserUseCase = new GetUserUseCase(getUserDataBaseUserRepository);
const getUserController = new GetUserController(getUserUseCase);

export {firebaseInstance, getUserUseCase, getUserController};

