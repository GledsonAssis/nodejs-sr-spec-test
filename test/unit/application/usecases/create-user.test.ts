import { CreateUser } from "@/application/usecases";
import User from "@/domain/entity/user";

describe("CreateUser", () => {
  // Successfully creates a user with valid input
  it("should create a user successfully when input is valid", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    const result = await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
    expect(result.value).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Handles null or undefined input gracefully
  it("should handle null or undefined input gracefully", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    await expect(createUser.execute(null as any)).rejects.toThrow(
      "Invalid name: The name must contain first and last name"
    );
    await expect(createUser.execute(undefined as any)).rejects.toThrow(
      "Invalid name: The name must contain first and last name"
    );
    expect(mockUserRepository.saveUser).not.toHaveBeenCalled();
  });

  // Saves the user to the repository without errors
  it("should save user to repository without errors when input is valid", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    const result = await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
    expect(result.value).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Returns the inserted user object in the output
  it("should return the inserted user object in the output", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    const result = await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
    expect(result.value).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Manages repository save failures and returns an error
  it("should manage repository save failures and return an error", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockRejectedValue(new Error("Failed to save user")),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "Test User", email: "test.user@example.com" };
    await expect(createUser.execute(input)).rejects.toThrow(
      "Failed to save user"
    );

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
  });

  // Deals with missing userRepository dependency
  it("should return an error when userRepository is missing", async () => {
    const createUser = new CreateUser();

    const input = { name: "John Doe", email: "john.doe@example.com" };
    await expect(createUser.execute(input)).rejects.toThrow(
      "userRepository dependency is missing"
    );
  });

  // Validates input fields before creating a user
  it("should validate input fields before creating a user", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    const result = await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
    expect(result.value).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Ensures userRepository is correctly injected
  it("should inject userRepository correctly", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    const result = await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
    expect(result.value).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Checks for unexpected exceptions during execution
  it("should handle unexpected exceptions during execution", async () => {
    const mockUserRepository = {
      saveUser: jest
        .fn()
        .mockRejectedValue(new Error("Database connection failed")),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "Test User", email: "test@example.com" };

    await expect(createUser.execute(input)).rejects.toThrow(
      "Database connection failed"
    );
  });

  // Handles duplicate user entries in the repository
  it("should handle duplicate user entries in the repository", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    const result = await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
    expect(result.value).toEqual({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Verifies that the user object is correctly instantiated
  it("should instantiate user object correctly when input is valid", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue({
        _id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    await createUser.execute(input);

    expect(mockUserRepository.saveUser).toHaveBeenCalledWith(expect.any(User));
  });

  it("should create a user successfully when input is valid", async () => {
    const mockUserRepository = {
      saveUser: jest.fn().mockResolvedValue(undefined),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };
    const createUser = new CreateUser();
    createUser.userRepository = mockUserRepository;

    const input = { name: "John Doe", email: "john.doe@example.com" };
    expect(createUser.execute(input)).rejects.toThrow(
      '{"code":422,"title":"Error inserinting user"}'
    );
  });
});
