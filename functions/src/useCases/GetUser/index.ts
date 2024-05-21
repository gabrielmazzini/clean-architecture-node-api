/* eslint-disable max-len */
import {GetUserDatasource} from "./datasource/getUserDatasource";
import {AdminFirebase} from "../../dataSource/firebase/repository/Admin-firebase";
import {FirebaseService} from "../../dataSource/firebase/service/firebase-service";
import {GetUserController} from "./controller/GetUserController";
import {GetUserUseCase} from "./useCase/GetUserUseCase";


const firebaseService = new FirebaseService();
const firebaseInstance = new AdminFirebase(firebaseService);
const getUserDatasource = new GetUserDatasource(firebaseInstance);
const getUserUseCase = new GetUserUseCase(getUserDatasource);
const getUserController = new GetUserController(getUserUseCase);

export {firebaseInstance, getUserUseCase, getUserController};

