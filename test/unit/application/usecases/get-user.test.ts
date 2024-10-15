import { GetUser } from "@/application/usecases";
import CustomError, { ErrorCodes } from "@/domain/entity/error";

describe("GetUser", () => {
  it("should return user data when a valid ID is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe", email: "teste@teste.com" }),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    const result = await getUser.execute(input);
    expect(result.value).toEqual({ id: "123", name: "John Doe", email: "teste@teste.com"  });
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("123");
  });

  it("should throw USER_NOT_FOUND error when user ID does not exist", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue(null),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "nonexistent" };
    await expect(getUser.execute(input)).rejects.toThrow(
      new CustomError({
        code: ErrorCodes.USER_NOT_FOUND,
        title: "User not found",
      })
    );
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("nonexistent");
  });

  it("should return user data when user is found", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe", email: "teste@teste.com" }),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    const result = await getUser.execute(input);
    expect(result.value).toEqual({ id: "123", name: "John Doe", email: "teste@teste.com" });
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("123");
  });

  it("should inject UserRepository dependency correctly", () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe" }),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    expect(getUser.userRepository).toEqual(mockUserRepository);
  });

  it("should throw CustomError with USER_NOT_FOUND code and message when response is null", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue(null),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    await expect(getUser.execute(input)).rejects.toMatchObject({
      code: 'USER_NOT_FOUND',
      title: "User not found",
    });
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("123");
  });

  it("should throw custom error when user is not found", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue(null),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    await expect(getUser.execute(input)).rejects.toThrow();
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("123");
  });

  it("should instantiate User object correctly from the response", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe", email: "teste@teste.com" }),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    const result = await getUser.execute(input);
    expect(result.value).toEqual({ id: "123", name: "John Doe", email: "teste@teste.com" });
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("123");
  });

  it("should handle asynchronous operation correctly", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ _id: "456", name: "Jane Smith", email: "teste@teste.com" }),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "456" };
    const result = await getUser.execute(input);
    expect(result.value).toEqual({ id: "456", name: "Jane Smith", email: "teste@teste.com" });
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("456");
  });

  it("should throw error with correct code when user is not found", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue(null),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    await expect(getUser.execute(input)).rejects.toMatchObject({
      code: 'USER_NOT_FOUND',
      title: "User not found",
    });
    expect(mockUserRepository.getUser).toHaveBeenCalledWith("123");
  });

  it("should call responseUser method of User when user is found", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe" }),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const getUser = new GetUser();
    getUser.userRepository = mockUserRepository;
    const input = { id: "123" };
    expect(getUser.execute(input)).rejects.toThrow("Invalid email");
  });
});
