import { GetUserController, Controller } from "@/interfaces/controllers";
import { makeGetUser } from "@/infra/server/factories/usecases";

export const makeGetUserController = (): Controller => {
  makeGetUser();
  return new GetUserController();
};
