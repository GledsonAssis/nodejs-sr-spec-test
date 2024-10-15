import { UserRepositoryDatabase } from "@/infra/repository/user-repository";
import { Registry } from "@/infra/di/di";

export const makeUserRepository = (): void => {
  Registry.getInstance().provide(
    "userRepository",
    new UserRepositoryDatabase()
  );
};
