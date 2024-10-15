import User from "@/domain/entity/user";

describe('User', () => {

    // Creating a User with valid name and email initializes correctly
    it('should initialize correctly when given valid name and email', () => {
      const user = new User({ name: 'John Doe', email: 'john.doe@example.com' });
      expect(user.getName()).toBe('John Doe');
      expect(user.getEmail()).toBe('john.doe@example.com');
    });

    // Constructor throws error if name does not contain first and last name
    it('should throw error when name does not contain first and last name', () => {
      expect(() => new User({ name: 'John', email: 'john.doe@example.com' })).toThrow('Invalid name: The name must contain first and last name');
    });

    // getName returns the correct name value
    it('should return correct name value when getName is called', () => {
      const user = new User({ name: 'John Doe', email: 'john.doe@example.com' });
      expect(user.getName()).toBe('John Doe');
    });

    // getEmail returns the correct email value
    it('should return correct email value when initialized with valid email', () => {
      const user = new User({ name: 'John Doe', email: 'john.doe@example.com' });
      expect(user.getEmail()).toBe('john.doe@example.com');
    });

    // User object can be instantiated with optional _id field
    it('should instantiate with optional _id field when provided', () => {
        const user = new User({ _id: '123', name: 'John Doe', email: 'john.doe@example.com' });
        expect(user.getName()).toBe('John Doe');
        expect(user.getEmail()).toBe('john.doe@example.com');
    });

    // Constructor throws error if email does not match the required pattern
    it('should throw error when email is invalid', () => {
      expect(() => new User({ name: 'John Doe', email: 'invalid-email' })).toThrow("Invalid email");
    });

    // Handling of empty string for name or email
    it('should throw an error when name or email is an empty string', () => {
        expect(() => new User({ name: '', email: 'john.doe@example.com' })).toThrow();
        expect(() => new User({ name: 'John Doe', email: '' })).toThrow();
    });

    // Handling of null or undefined values for name or email
    it('should handle null name and email with error', async () => {
      expect(() => new User({ name: null as any, email: null as any })).toThrow('Invalid name: The name must contain first and last name');
    });

    // Test with emails containing subdomains or uncommon TLDs
    it('should handle email with subdomains or uncommon TLDs', () => {
      const user = new User({ name: 'Alice Smith', email: 'alice.smith@example.co.uk' });
      expect(user.getName()).toBe('Alice Smith');
      expect(user.getEmail()).toBe('alice.smith@example.co.uk');
    });

    // Test with names containing special characters or accents
    it('should handle special characters in name when creating a new User', () => {
      const user = new User({ name: 'José Álvarez', email: 'jose.alvarez@example.com' });
      expect(user.getName()).toBe('José Álvarez');
      expect(user.getEmail()).toBe('jose.alvarez@example.com');
    });

    // Verify behavior when IUser object has additional unexpected properties
    it('should throw an error when additional unexpected properties are present in IUser object', () => {
        const user = new User({ name: 'Alice Smith', email: 'alice.smith@example.com', age: 30 } as any);
        expect(user.getName()).toBe('Alice Smith');
        expect(user.getEmail()).toBe('alice.smith@example.com');
    });

    // Validate performance with large number of User instances
    it('should return correct name and email for large number of instances', () => {
        const users = [];
        for (let i = 0; i < 1000; i++) {
            const user = new User({ name: 'User ' + i, email: 'user' + i + '@example.com' });
            users.push(user);
        }
        for (let i = 0; i < 1000; i++) {
            expect(users[i].getName()).toBe('User ' + i);
            expect(users[i].getEmail()).toBe('user' + i + '@example.com');
        }
    });

    it('should return an object with name and email properties when both are defined', () => {
      const user = new User({ name: 'Alice Smith', email: 'alice.smith@example.com'});
      const response = user.responseUser();
      expect(response).toHaveProperty('name', 'Alice Smith');
      expect(response).toHaveProperty('email', 'alice.smith@example.com');
    });
});
