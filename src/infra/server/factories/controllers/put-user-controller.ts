import { PutUserController, Controller } from "@/interfaces/controllers";
import { makePutUser } from "@/infra/server/factories/usecases";

export const makePutUserController = (): Controller => {
  makePutUser();
  return new PutUserController();
};
