import CustomError, { ErrorCodes } from "@/domain/entity/error";
import User from "@/domain/entity/user";
import { inject } from "@/infra/di/di";
import UserRepository from "@/infra/repository/user-repository";

type Error = {
  code: string;
  detail: string;
  status: number;
  title: string;
};
type Input = {
  id: string;
};
type Output = {
  error?: Error;
  value?: any;
};

export class GetUser {
  @inject("userRepository")
  userRepository?: UserRepository;
  async execute(input: Input): Promise<Output> {
    const response = await this.userRepository?.getUser(input.id);
    if (!response)
      throw new CustomError({
        code: ErrorCodes.USER_NOT_FOUND,
        title: "User not found",
      });
    const user = new User(response);
    return { value: user.responseUser() };
  }
}
