import { CreateUserController, Controller } from "@/interfaces/controllers";
import { makeCreateUser } from "@/infra/server/factories/usecases";

export const makeCreateUserController = (): Controller => {
  makeCreateUser();
  return new CreateUserController();
};
