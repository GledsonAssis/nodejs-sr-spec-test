import { GetUser } from "@/application/usecases";
import { Registry } from "@/infra/di/di";
import { makeUserRepository } from "@/infra/server/factories/repositories/user-repositories";

export const makeGetUser = (): void => {
  makeUserRepository();
  Registry.getInstance().provide("getUser", new GetUser());
};
