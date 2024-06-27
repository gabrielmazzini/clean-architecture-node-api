/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api.express";
import functions = require("firebase-functions");
import {CreateUserRoute} from "./presenter/routes/user/create.user.express.router";
import {MailRepository} from "./infra/repositories/mail-provider/mail.repository";
import {UserRepositoryFirebase} from "./infra/repositories/user/user.repository.firebase";
import {FirestoreFirebase} from "./package/firebase/firebase";
import {CreateUserUseCase} from "./usecases/user/create-user/CreateUserUsecase";
import {GetUserUsecase} from "./usecases/user/get-user/getUserUsecase";
import {GetUserRoute} from "./presenter/routes/user/get.user.express.router";
import {UpdateUserUsecase} from "./usecases/user/update-user/updateUserUsecase";
import {UpdateUserRoute} from "./presenter/routes/user/update.user.express.router";

// create user
const userRepositoryFirebase = UserRepositoryFirebase.create(FirestoreFirebase);
const mailRepository = new MailRepository();
const createUserUseCase = CreateUserUseCase.create(userRepositoryFirebase, mailRepository);
const createRoute = CreateUserRoute.create(createUserUseCase);

// get user
const getUserUsecase = GetUserUsecase.create(userRepositoryFirebase);
const getUseRoute = GetUserRoute.create(getUserUsecase);

// update user
const updateUserUseCase = UpdateUserUsecase.create(userRepositoryFirebase);
const updateRoute = UpdateUserRoute.create(updateUserUseCase);

// start aplication
const api = ApiExpress.create([createRoute, getUseRoute, updateRoute]);
const app = api.start();
export const apiTeste = functions.https.onRequest(app);

