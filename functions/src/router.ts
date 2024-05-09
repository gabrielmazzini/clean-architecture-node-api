/* eslint-disable new-cap */
import {Router} from "express";
import {createUserController} from "./useCases/CreateUser";

const router = Router();

router.post("/new-registration", (request, response) => {
  return createUserController.handle(request, response);
});

export {router};
