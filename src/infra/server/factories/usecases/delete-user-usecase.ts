import { DeleteUser } from "@/application/usecases";
import { Registry } from "@/infra/di/di";
import { makeUserRepository } from "@/infra/server/factories/repositories/user-repositories";

export const makeDeleteUser = (): void => {
  makeUserRepository();
  Registry.getInstance().provide("deleteUser", new DeleteUser());
};
