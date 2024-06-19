/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api.express";
import functions = require("firebase-functions");
import {CreateUserRoute} from "./infra/api/express/routes/user/create.user.express.router";
import {MailRepository} from "./infra/repositories/mail-provider/mail.repository";
import {CreateUserRepositoryFirebase} from "./infra/repositories/user/user.repository.firebase";
import {FirestoreFirebase} from "./package/firebase/firebase";
import {CreateUserUseCase} from "./usecases/user/create-user/CreateUserUsecase";


const createUserRepositoryFirebase = CreateUserRepositoryFirebase.create(FirestoreFirebase);
const mailRepository = new MailRepository();
const createUserUseCase = CreateUserUseCase.create(createUserRepositoryFirebase, mailRepository);
const createRoute = CreateUserRoute.create(createUserUseCase);
const api = ApiExpress.create([createRoute]);
const app = api.start();
export const apiTeste = functions.https.onRequest(app);

