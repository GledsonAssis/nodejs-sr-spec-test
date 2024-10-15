import { MongooseAdapter } from "@/infra/database/mongoose-adapter";
import mongoose from "mongoose";

const mockLogger = {
  INFO: jest.fn(),
  ERROR: jest.fn(),
};

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  model: jest.fn(),
  models: {},
  connection: {
    close: jest.fn(),
  },
  Schema: jest.fn(),
}));

describe("MongooseAdapter", () => {
  let adapter: MongooseAdapter;

  beforeEach(() => {
    adapter = new MongooseAdapter("mongodb://localhost:27017/test");
    (adapter as any).Logger = mockLogger;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("close", () => {
    it("deve fechar a conexão com sucesso", async () => {
      await adapter.close();
      expect(mongoose.connection.close).toHaveBeenCalled();
    });

    it("deve logar erro ao falhar ao fechar a conexão", async () => {
      (mongoose.connection.close as jest.Mock).mockRejectedValue(
        new Error("Erro ao fechar conexão")
      );
      await adapter.close();
      expect(mockLogger.ERROR).toHaveBeenCalledWith(
        "Error closing the connection:",
        expect.any(Error)
      );
    });
  });

  describe("connect", () => {
    it("deve logar sucesso ao conectar ao banco de dados", async () => {
      await adapter["connect"]("mongodb://localhost:27017/test");
      expect(mockLogger.INFO).toHaveBeenCalledWith(
        "✅ [Successfully] - Database Connection"
      );
    });

    it("deve logar erro ao falhar na conexão", async () => {
      (mongoose.connect as jest.Mock).mockRejectedValue(
        new Error("Falha na conexão")
      );
      await adapter["connect"]("mongodb://localhost:27017/test");
      expect(mockLogger.INFO).toHaveBeenCalledWith(
        "❌ [Unsuccessfully] - Database Connection:"
      );
      expect(mockLogger.ERROR).toHaveBeenCalledWith("Error", expect.any(Error));
    });
  });

  describe("query", () => {
    let mockModel: any;

    beforeEach(() => {
      // Mockando um model do Mongoose
      mockModel = {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
      };
      (mongoose.model as jest.Mock).mockReturnValue(mockModel);
      (mongoose.models as any).User = mockModel;
    });

    it("deve realizar uma query find", async () => {
      const mockParams = { name: "John" };
      await adapter.query("User.find", mockParams);
      expect(mongoose.models.User.find).toHaveBeenCalledWith(mockParams);
    });

    it("deve realizar uma query create", async () => {
      const mockParams = { name: "John" };
      await adapter.query("User.create", mockParams);
      expect(mongoose.models.User.create).toHaveBeenCalledWith(mockParams);
    });

    it("deve realizar uma query findById", async () => {
      const mockParams = "123";
      await adapter.query("User.findById", mockParams);
      expect(mongoose.models.User.findById).toHaveBeenCalledWith(mockParams);
    });

    it("deve realizar uma query updateOne", async () => {
      const mockParams = [{ _id: "123" }, { name: "John Updated" }];
      await adapter.query("User.updateOne", mockParams);
      expect(mongoose.models.User.updateOne).toHaveBeenCalledWith(
        ...mockParams
      );
    });

    it("deve realizar uma query deleteOne", async () => {
      const mockParams = [{ _id: "123" }];
      await adapter.query("User.deleteOne", mockParams);
      expect(mongoose.models.User.deleteOne).toHaveBeenCalledWith(
        ...mockParams
      );
    });

    it("deve lançar erro se o model não for encontrado", async () => {
      (mongoose.model as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Model User not found");
      });
      await expect(adapter.query("User.find", {})).rejects.toThrow(
        "Model User not found"
      );
      expect(mockLogger.ERROR).toHaveBeenCalledWith(
        "Error executing query:",
        expect.any(Error)
      );
    });

    it("deve lançar erro se o model não for encontrado 2", async () => {
      await expect(adapter.query("Users.find", {})).rejects.toThrow(
        "Model Users not found"
      );
      expect(mockLogger.ERROR).toHaveBeenCalledWith(
        "Error executing query:",
        expect.any(Error)
      );
    });

    it("deve lançar erro se o método não for suportado", async () => {
      await expect(
        adapter.query("User.unsupportedMethod" as any, {})
      ).rejects.toThrow("Unsupported method: unsupportedMethod");
      expect(mockLogger.ERROR).toHaveBeenCalledWith(
        "Error executing query:",
        expect.any(Error)
      );
    });
  });

  describe("registerSchema", () => {
    it("deve registrar um schema", () => {
      const schemaObj = { name: String };
      adapter.registerSchema(schemaObj);
      expect(mongoose.Schema).toHaveBeenCalledWith(schemaObj);
    });
  });
});
