import { GetUser } from "@/application/usecases";
import { HttpRequest, HttpResponse } from "@/interfaces/presentations";
import { Logger } from "@/infra/logger";
import { AJVCompile as InputValidator } from "@/infra/input-validator";
import { GetUserController } from "@/interfaces/controllers";

jest.mock("@/application/usecases", () => {
  return {
    GetUser: jest.fn().mockImplementation(() => ({
      execute: jest.fn(),
    })),
  };
});

jest.mock("@/infra/logger");
jest.mock("@/infra/input-validator");

describe("GetUserController", () => {
  let createUserController: GetUserController;
  let mockUsecase: jest.Mocked<GetUser>;
  let mockInputValidator: jest.Mocked<InputValidator>;

  beforeEach(() => {
    mockUsecase = new (require("@/application/usecases").GetUser)();

    createUserController = new GetUserController();
    createUserController.usecase = mockUsecase;

    mockInputValidator = new InputValidator() as jest.Mocked<InputValidator>;
    (InputValidator as jest.Mock).mockImplementation(() => mockInputValidator);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and the created user when input is valid", async () => {
    const httpRequest: HttpRequest = {
      body: { username: "testuser", password: "testpass" },
    };

    const mockValidatedResult = { isValid: true, message: "" };
    mockInputValidator.compile.mockResolvedValue(mockValidatedResult);

    const mockUserResponse = { id: "1", username: "testuser" };
    mockUsecase.execute.mockResolvedValue({ value: mockUserResponse });

    const httpResponse: HttpResponse = await createUserController.handle(
      httpRequest
    );

    expect(httpResponse.status).toBe(200);
    expect(httpResponse.value).toEqual(mockUserResponse);
  });

  it("should return 400 when input validation fails", async () => {
    const httpRequest: HttpRequest = {
      body: { username: "testuser" },
    };

    const mockValidatedResult = {
      isValid: false,
      message: "Password is required",
    };
    mockInputValidator.compile.mockResolvedValue(mockValidatedResult);

    const httpResponse: HttpResponse = await createUserController.handle(
      httpRequest
    );

    expect(Logger.ERROR).toHaveBeenCalledWith(
      `Input Schema Error: ${mockValidatedResult.message}`
    );
    expect(httpResponse.status).toBe(400);
    expect(httpResponse.error).toEqual(mockValidatedResult.message);
  });

  it("should return 400 when business rule error occurs", async () => {
    const httpRequest: HttpRequest = {
      body: { username: "testuser", password: "testpass" },
    };

    const mockValidatedResult = { isValid: true, message: "" };
    mockInputValidator.compile.mockResolvedValue(mockValidatedResult);

    const mockBusinessError = { message: "User already exists", status: 400 };
    mockUsecase.execute.mockResolvedValue({
      error: mockBusinessError as any,
      value: null,
    });

    const httpResponse: HttpResponse = await createUserController.handle(
      httpRequest
    );

    expect(Logger.ERROR).toHaveBeenCalledWith(
      `Business Rule Error: ${JSON.stringify(mockBusinessError)}`
    );
    expect(httpResponse.status).toBe(400);
    expect(httpResponse.error).toEqual(mockBusinessError);
  });

  it("should return 422 when a server error occurs", async () => {
    const httpRequest: HttpRequest = {
      body: { username: "testuser", password: "testpass" },
    };

    const mockValidatedResult = { isValid: true, message: "" };
    mockInputValidator.compile.mockResolvedValue(mockValidatedResult);

    const mockServerError = new Error("Database connection error");
    mockUsecase.execute.mockRejectedValue(mockServerError);

    const httpResponse: HttpResponse = await createUserController.handle(
      httpRequest
    );

    expect(Logger.ERROR).toHaveBeenCalledWith(
      `Server Error: "${mockServerError.message}"`
    );
    expect(httpResponse.status).toBe(422);
    expect(httpResponse.error).toEqual({
      code: "UNPROCESSABLE_ENTITY",
      title: "Unprocessable Entity",
      status: 422,
      detail: JSON.stringify(mockServerError.message),
    });
  });
});
