/* eslint-disable new-cap */
import {Router} from "express";
import {createUserController} from "./useCases/CreateUser";
import {getUserController} from "./useCases/GetUser";

const router = Router();

router.post("/new-registration", (request, response) => {
  return createUserController.handle(request, response);
});
router.get("/user/:id", (request, response) => {
  return getUserController.handle(request, response);
});

export {router};
