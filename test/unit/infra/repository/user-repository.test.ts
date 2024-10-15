import User from "@/domain/entity/user";
import { ILogger } from "@/infra/logger";
import ODM from "@/infra/odm/odm";
import { UserDocument, UserModel } from "@/infra/odm/models/user";
import { UserRepositoryDatabase } from "@/infra/repository/user-repository";
import { MongooseAdapter } from "@/infra/database/mongoose-adapter";

// Mock das dependências
jest.mock("@/infra/odm/odm");
jest.mock("@/infra/logger");
jest.mock("@/infra/odm/models/user");

describe("UserRepositoryDatabase", () => {
  let userRepository: UserRepositoryDatabase;
  let mockOdm: ODM;
  let mockLogger: ILogger;
  let mockUserModel: UserModel;
  let mockUser: User;
  let mockConnection: jest.Mocked<MongooseAdapter>;
  let mockModel: jest.Mocked<any>;

  beforeEach(() => {
    mockModel = jest.fn();
    mockModel.prototype.save = jest.fn();
    mockModel.prototype.toJSON = jest.fn();
    mockConnection = {
      connection: {
        model: jest.fn().mockReturnValue(mockModel),
      },
    } as unknown as jest.Mocked<MongooseAdapter>;

    mockOdm = new ODM(mockConnection);
    mockLogger = {
      DEBUG: jest.fn(),
      INFO: jest.fn(),
      ERROR: jest.fn(),
    } as unknown as ILogger;
    mockUserModel = new UserModel();
    mockUser = { getName: jest.fn(), getEmail: jest.fn() } as unknown as User;

    userRepository = new UserRepositoryDatabase();
    userRepository.odm = mockOdm;
    userRepository.Logger = mockLogger;
    userRepository.model = mockUserModel;
  });

  it("should call odm.save and logger.DEBUG when saving a user", async () => {
    const mockSavedUser = {
      _id: "123",
      name: "Test User",
      email: "test@example.com",
    } as UserDocument;
    mockOdm.save = jest.fn().mockResolvedValue(mockSavedUser);

    (mockUser.getName as jest.Mock).mockReturnValue("Test User");
    (mockUser.getEmail as jest.Mock).mockReturnValue("test@example.com");

    const result = await userRepository.saveUser(mockUser);

    expect(mockLogger.DEBUG).toHaveBeenCalledWith("saveUser", mockUser);

    // Verifica se o método odm.save foi chamado com os parâmetros corretos
    expect(mockOdm.save).toHaveBeenCalledWith(mockUserModel, {
      name: "Test User",
      email: "test@example.com",
    });

    // Verifica o retorno
    expect(result).toEqual(mockSavedUser);
  });

  it("should throw an error if odm.save fails", async () => {
    // Mock da função save para lançar um erro
    const mockError = new Error("Failed to save user");
    mockOdm.save = jest.fn().mockRejectedValue(mockError);

    // Mock do comportamento de User
    (mockUser.getName as jest.Mock).mockReturnValue("Test User");
    (mockUser.getEmail as jest.Mock).mockReturnValue("test@example.com");

    // Verifica se a função saveUser lança um erro
    await expect(userRepository.saveUser(mockUser)).rejects.toThrow(
      "Failed to save user"
    );

    // Verifica se o logger foi chamado com o erro
    expect(mockLogger.DEBUG).toHaveBeenCalledWith("saveUser", mockUser);
    expect(mockOdm.save).toHaveBeenCalledWith(mockUserModel, {
      name: "Test User",
      email: "test@example.com",
    });
  });
});
