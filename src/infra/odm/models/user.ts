import mongoose, { Schema } from "mongoose";
import { IUser } from "@/domain/entity/user";
import { Model } from "@/infra/odm/models/model";

export interface UserDocument extends IUser, Document {}

export class UserModel implements Model {
  collection: string;
  schema: mongoose.Schema;
  constructor() {
    this.collection = "Users";
    this.schema = this.generateSchema();
  }

  private generateSchema() {
    return new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
    });
  }
}
