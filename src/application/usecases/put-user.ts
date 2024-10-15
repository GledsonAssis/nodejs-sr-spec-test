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
  payload: {
    name: string;
    email: string;
  };
};
type Output = {
  error?: Error;
  value?: any;
};

export class PutUser {
  @inject("userRepository")
  userRepository?: UserRepository;
  async execute(input: Input): Promise<Output> {
    const user = new User(input.payload);
    const response = await this.userRepository?.updateUser(input.id, user);
    if (!response)
      throw new CustomError({
        code: ErrorCodes.UNPROCESSABLE_ENTITY,
        title: "Error updating user",
      });
    const userResponse = new User(response);
    return { value: userResponse.responseUser() };
  }
}
