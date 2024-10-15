import { inject } from "@/infra/di/di";
import User from "@/domain/entity/user";
import { ILogger } from "@/infra/logger";
import ODM from "@/infra/odm/odm";
import { UserDocument, UserModel } from "@/infra/odm/models/user";

export default interface UserRepository {
  saveUser(user: User): Promise<UserDocument>;
  getUser(id: string): Promise<UserDocument | null>;
  deleteUser(id: string): Promise<UserDocument | null>;
  updateUser(id: string, user: User): Promise<UserDocument | null>;
}

export class UserRepositoryDatabase implements UserRepository {
  @inject("odm")
  odm!: ODM;
  @inject("logger")
  Logger!: ILogger;
  model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  async saveUser(user: User): Promise<UserDocument> {
    this.Logger.DEBUG("saveUser", user);
    return this.odm?.save(this.model, {
      name: user.getName(),
      email: user.getEmail(),
    });
  }

  async getUser(id: string): Promise<UserDocument | null> {
    this.Logger.DEBUG("getUser", id);
    return this.odm?.findOne(this.model, id);
  }

  async deleteUser(id: string): Promise<UserDocument | null> {
    this.Logger.DEBUG("deleteUser", id);
    return this.odm?.deleteOne(this.model, id);
  }
  
  async updateUser(id: string, user: User): Promise<UserDocument | null> {
    this.Logger.DEBUG("updateUser", id, user);
    return this.odm?.updateOne(this.model, id, {
      name: user.getName(),
      email: user.getEmail(),
    });
  }
}
