import { DeleteUserController, Controller } from "@/interfaces/controllers";
import { makeDeleteUser } from "@/infra/server/factories/usecases";

export const makeDeleteUserController = (): Controller => {
  makeDeleteUser();
  return new DeleteUserController();
};
