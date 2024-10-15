import mongoose, { Schema } from "mongoose";
import { inject } from "@/infra/di/di";
import { ILogger } from "@/infra/logger";
import DatabaseConnection from "@/infra/database/database-connection";

type MongooseModelMethods =
  | "find"
  | "create"
  | "deleteOne"
  | "updateOne"
  | "findById";

type IStatement = `${string}.${MongooseModelMethods}`;
type ModelMethodArray = [modelName: string, method: MongooseModelMethods];

export class MongooseAdapter implements DatabaseConnection {
  connection: typeof mongoose | null = null;
  @inject("logger")
  Logger!: ILogger;

  constructor(connectionString: string) {
    this.connect(connectionString);
  }

  private async connect(connectionString: string) {
    try {
      await mongoose.connect(connectionString);
      this.connection = mongoose;
      this.Logger.INFO("✅ [Successfully] - Database Connection");
    } catch (error) {
      this.Logger.INFO("❌ [Unsuccessfully] - Database Connection:");
      this.Logger.ERROR("Error", error);
    }
  }

  registerSchema(obj: Object) {
    return new Schema(obj);
  }

  async query(statement: IStatement, params: any): Promise<any> {
    try {
      const [modelName, method] = statement.split(".") as ModelMethodArray;

      if (!mongoose.models[modelName]) {
        throw new Error(`Model ${modelName} not found`);
      }

      const model = mongoose.model(modelName);

      switch (method) {
        case "find":
          return model[method](params);
        case "create":
          return model[method](params);
        case "findById":
          return model[method](params);
        case "updateOne":
          return model[method](...params);
        case "deleteOne":
          return model[method](...params);

        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    } catch (error) {
      this.Logger.ERROR("Error executing query:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.connection) {
      try {
        this.Logger.INFO("Closing connection MongoDB");
        await this.connection.connection.close();
      } catch (error) {
        this.Logger.ERROR("Error closing the connection:", error);
      }
    }
  }
}
