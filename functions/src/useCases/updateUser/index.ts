/* eslint-disable max-len */
import {UpdateUserDatasource} from "./datasource/updateUserDatasource";
import {AdminFirebase} from "../../dataSource/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../dataSource/firebase/service/firebase-service";
import {UpdateUserController} from "./controller/UpdateUserController";
import {UpdateUserUseCase} from "./useCase/UpdateUserUseCase";

const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);
const updateUserDatasource = new UpdateUserDatasource(firebaseInstance);
const updateUserUseCase = new UpdateUserUseCase(updateUserDatasource);
const updateUserController = new UpdateUserController(updateUserUseCase);

export {firebaseInstance, updateUserUseCase, updateUserController};
