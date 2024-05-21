/* eslint-disable new-cap */
import {Router} from "express";
import {createUserController} from "./useCases/createUser";
import {getUserController} from "./useCases/getUser";
import {updateUserController} from "./useCases/updateUser";
import {deleteUserController} from "./useCases/deleteUser";

const router = Router();

router.post("/new-registration", (request, response) => {
  return createUserController.handle(request, response);
});
router.get("/user/:id", (request, response) => {
  return getUserController.handle(request, response);
});
router.put("/user/:id", (request, response) => {
  return updateUserController.handle(request, response);
});

router.delete("/user/:id", (request, response) => {
  return deleteUserController.handle(request, response);
});

export {router};
