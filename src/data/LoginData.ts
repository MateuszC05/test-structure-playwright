export class LoginData {
    public static readonly VALID_USERNAME = process.env.TEST_USERNAME || 'defaultUser';
    public static readonly VALID_PASSWORD = process.env.TEST_PASSWORD || 'defaultPass';

    // Example of separating data
    public static readonly INVALID_USERNAME = 'invalidUser';
    public static readonly INVALID_PASSWORD = 'invalidPass';
}
