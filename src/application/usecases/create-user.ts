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
  name: string;
  email: string;
};
type Output = {
  error?: Error;
  value?: any;
};

export class CreateUser {
  @inject("userRepository")
  userRepository?: UserRepository;
  async execute(input: Input): Promise<Output> {
    const user = new User(input);
    const response = await this.userRepository?.saveUser(user);
    if (!response)
      throw new CustomError({
        code: ErrorCodes.UNPROCESSABLE_ENTITY,
        title: "Error inserinting user",
      });
    const userResponse = new User(response);
    return { value: userResponse.responseUser() };
  }
}
