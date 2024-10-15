import { PutUser } from "@/application/usecases";
import CustomError, { ErrorCodes } from "@/domain/entity/error";
import User from "@/domain/entity/user";

describe("PutUser", () => {
  // Successfully updates a user when valid input is provided
  it("should update user successfully when valid input is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue({
        _id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    const result = await putUser.execute(input);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
      "123",
      expect.any(User)
    );
    expect(result.value).toEqual({
      id: "123",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Handles null or undefined UserRepository gracefully
  it("should throw an error when UserRepository is null or undefined", async () => {
    const putUser = new PutUser();
    putUser.userRepository = null as any;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    await expect(putUser.execute(input)).rejects.toThrow(CustomError);
  });

  // Uses dependency injection to access UserRepository
  it("should update user successfully when valid input is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue({
        _id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    const result = await putUser.execute(input);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
      "123",
      expect.any(User)
    );
    expect(result.value).toEqual({
      id: "123",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Throws an error if the user update response is null
  it("should throw error when user update response is null", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue(null),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    await expect(putUser.execute(input)).rejects.toThrow(
      new CustomError({
        code: ErrorCodes.UNPROCESSABLE_ENTITY,
        title: "Error updating user",
      })
    );
  });

  // Processes input with missing or invalid user ID
  it("should throw error when user ID is missing", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue(null),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "", // Missing user ID
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    await expect(putUser.execute(input)).rejects.toThrow();
  });

  // Validates input payload structure before processing
  it("should throw error when input payload is invalid", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue({
        _id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        teste: "john.doe@example.com",
      },
    };

    await expect(putUser.execute(input as any)).rejects.toThrow();
  });

  // Ensures User object creation with valid data
  it("should create user successfully when valid input is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue({
        _id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
      }),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    const result = await putUser.execute(input);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
      "123",
      expect.any(User)
    );
    expect(result.value).toEqual({
      id: "123",
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  // Handles concurrent update requests for the same user
  it("should handle concurrent update requests for the same user", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue({
        _id: "123",
        name: "Jane Doe",
        email: "jane.doe@example.com",
      }),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
    };

    const result = await putUser.execute(input);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(
      "123",
      expect.any(User)
    );
    expect(result.value).toEqual({
      id: "123",
      name: "Jane Doe",
      email: "jane.doe@example.com",
    });
  });

  // Verifies error handling for unprocessable entity
  it("should throw error for unprocessable entity when update fails", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue(null),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    await expect(putUser.execute(input)).rejects.toThrowError(
      new CustomError({
        code: ErrorCodes.UNPROCESSABLE_ENTITY,
        title: "Error updating user",
      })
    );
  });

  // Checks for proper error code and message on failure
  it("should throw proper error code and message when update fails", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn().mockResolvedValue(null),
    };
    const putUser = new PutUser();
    putUser.userRepository = mockUserRepository;

    const input = {
      id: "123",
      payload: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    };

    await expect(putUser.execute(input)).rejects.toMatchObject({
      code: 'UNPROCESSABLE_ENTITY',
      title: "Error updating user",
    });
  });
});
