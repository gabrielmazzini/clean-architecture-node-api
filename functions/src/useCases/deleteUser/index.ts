/* eslint-disable max-len */
import {AdminFirebase} from "../../dataSource/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../dataSource/firebase/service/firebase-service";
import {DeleteUserController} from "./controller/deleteUserController";
import {DeleteUserDatasource} from "./datasource/deleteUserDatasource";
import {DeleteUserUseCase} from "./useCase/deleteUserUseCase";

const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);
const deleteUserDatasource = new DeleteUserDatasource(firebaseInstance);
const deleteUserUseCase = new DeleteUserUseCase(deleteUserDatasource);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export {firebaseInstance, deleteUserUseCase, deleteUserController};
