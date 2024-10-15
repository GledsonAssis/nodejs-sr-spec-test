import { DeleteUser } from "@/application/usecases";
import CustomError, { ErrorCodes } from "@/domain/entity/error";

describe("DeleteUser", () => {
  // Successfully delete a user when a valid ID is provided
  it("should return user data when a valid ID is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe", email: "teste@teste.com" }),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "123" };
    const result = await deleteUser.execute(input);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("123");
    expect(result.value).toEqual({ id: "123", name: "John Doe", email: "teste@teste.com" });
  });

  // Attempt to delete a user with a non-existent ID
  it("should throw USER_NOT_FOUND error when ID does not exist", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue(null),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "non-existent-id" };

    await expect(deleteUser.execute(input)).rejects.toThrow(CustomError);
    await expect(deleteUser.execute(input)).rejects.toMatchObject({
      code: 'USER_NOT_FOUND',
      title: "User not found",
    });
  });

  // Return the user data after successful deletion
  it("should return user data after successful deletion", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe", email: "teste@teste.com" }),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "123" };
    const result = await deleteUser.execute(input);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("123");
    expect(result.value).toEqual({ id: "123", name: "John Doe", email: "teste@teste.com" });
  });

  // Handle user deletion using dependency injection for the repository
  it("should throw error when user is not found", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue(null),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "123" };

    await expect(deleteUser.execute(input)).rejects.toThrow();
  });

  // Handle null or undefined input gracefully
  it("should throw an error when input is null", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue(null),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: null };

    await expect(deleteUser.execute(input as any)).rejects.toThrow();
  });

  // Handle repository returning null or undefined response
  it("should throw error when repository returns null or undefined", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue(null),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "123" };

    await expect(deleteUser.execute(input)).rejects.toMatchObject({
      code: "USER_NOT_FOUND",
      title: "User not found",
    });
  });

  // Handle invalid ID format in input
  it("should throw error when invalid ID format is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "invalid_id_format" };

    await expect(deleteUser.execute(input)).rejects.toThrow();
  });

  // Ensure the correct error code is thrown for a non-existent user
  it("should throw correct error code for non-existent user", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue(null),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "123" };

    await expect(deleteUser.execute(input)).rejects.toThrowError(
      new CustomError({
        code: ErrorCodes.USER_NOT_FOUND,
        title: "User not found",
      })
    );
  });

  // Verify that the User entity is correctly instantiated with the response
  it("should instantiate User entity with response data", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest
        .fn()
        .mockResolvedValue({ _id: "456", name: "Jane Smith", email: "teste@teste.com" }),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "456" };
    const result = await deleteUser.execute(input);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("456");
    expect(result.value).toEqual({ id: "456", name: "Jane Smith", email: "teste@teste.com" });
  });

  // Ensure the method handles asynchronous operations correctly
  it("should handle asynchronous operation correctly", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue({ _id: "456", name: "Jane Doe", email: "teste@teste.com" }),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "456" };
    const result = await deleteUser.execute(input);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("456");
    expect(result.value).toEqual({ id: "456", name: "Jane Doe", email: "teste@teste.com" });
  });

  // Validate that the repository's deleteUser method is called with the correct ID
  it("should call deleteUser method with correct ID", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest
        .fn()
        .mockResolvedValue({ _id: "testID", name: "Test User", email: "teste@teste.com" }),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "testID" };
    await deleteUser.execute(input);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith("testID");
  });

  // Confirm that the output structure matches the expected Output type
  it("should return user data when a valid ID is provided", async () => {
    const mockUserRepository = {
      saveUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn().mockResolvedValue({ _id: "123", name: "John Doe" }),
    };
    const deleteUser = new DeleteUser();
    deleteUser.userRepository = mockUserRepository;

    const input = { id: "123" };
    expect(deleteUser.execute(input)).rejects.toThrow("Invalid email");
  });
});
