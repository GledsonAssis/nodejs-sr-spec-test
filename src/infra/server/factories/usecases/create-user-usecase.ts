import { CreateUser } from "@/application/usecases";
import { Registry } from "@/infra/di/di";
import { makeUserRepository } from "@/infra/server/factories/repositories/user-repositories";

export const makeCreateUser = (): void => {
  makeUserRepository();
  Registry.getInstance().provide("createUser", new CreateUser());
};
