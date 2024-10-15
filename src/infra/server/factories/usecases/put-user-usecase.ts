import { PutUser } from "@/application/usecases";
import { Registry } from "@/infra/di/di";
import { makeUserRepository } from "@/infra/server/factories/repositories/user-repositories";

export const makePutUser = (): void => {
  makeUserRepository();
  Registry.getInstance().provide("putUser", new PutUser());
};
