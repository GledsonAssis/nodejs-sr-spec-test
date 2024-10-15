import ODM from "@/infra/odm/odm";
import { MongooseAdapter } from "@/infra/database/mongoose-adapter";
import { Model as OdmModel } from "@/infra/odm/models/model";
import { Model, Document } from "mongoose";

const mockConnection = {
  connection: {
    model: jest.fn(),
  },
} as unknown as MongooseAdapter;

const mockModel = {
  create: jest.fn(),
  findById: jest.fn(),
} as unknown as Model<Document>;

const odm = new ODM(mockConnection);

const mockOdmModel: OdmModel = {
  collection: "TestCollection",
  schema: {} as any,
};

describe("ODM Class", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("save()", () => {
    it("should save an object and return the created document", async () => {
      (mockConnection.connection?.model as jest.Mock).mockReturnValue(
        mockModel
      );
      const savedDocument = { _id: "123", name: "Test" };
      (mockModel.create as jest.Mock).mockResolvedValue(savedDocument);

      const result = await odm.save(mockOdmModel, { name: "Test" });

      // Verificações
      expect(mockConnection.connection?.model).toHaveBeenCalledWith(
        mockOdmModel.collection,
        mockOdmModel.schema
      );
      expect(mockModel.create).toHaveBeenCalledWith({ name: "Test" });
      expect(result).toEqual(savedDocument);
    });

    it("should throw an error if the model is not found", async () => {
      (mockConnection.connection?.model as jest.Mock).mockReturnValue(null);

      await expect(odm.save(mockOdmModel, { name: "Test" })).rejects.toThrow(
        "ModelClass error: TestCollection"
      );
    });
  });

  describe("findOne()", () => {
    it("should find a document by id and return it", async () => {
      // Mock do comportamento de retorno
      (mockConnection.connection?.model as jest.Mock).mockReturnValue(
        mockModel
      );
      const foundDocument = { _id: "123", name: "Test" };
      (mockModel.findById as jest.Mock).mockResolvedValue(foundDocument);

      const result = await odm.findOne(mockOdmModel, "123");

      // Verificações
      expect(mockConnection.connection?.model).toHaveBeenCalledWith(
        mockOdmModel.collection,
        mockOdmModel.schema
      );
      expect(mockModel.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(foundDocument);
    });

    it("should throw an error if the model is not found", async () => {
      (mockConnection.connection?.model as jest.Mock).mockReturnValue(null);

      await expect(odm.findOne(mockOdmModel, "123")).rejects.toThrow(
        "ModelClass error: TestCollection"
      );
    });
  });
});
