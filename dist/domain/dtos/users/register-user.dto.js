"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = exports.RegisterUserSchema = void 0;
const valibot_1 = require("valibot");
exports.RegisterUserSchema = (0, valibot_1.object)({
    username: (0, valibot_1.pipe)((0, valibot_1.string)('username is required'), (0, valibot_1.minLength)(3, 'username must be a least 3 characters long'), (0, valibot_1.maxLength)(70, 'username must be a most 30 characters long')),
    password: (0, valibot_1.pipe)((0, valibot_1.string)(), (0, valibot_1.nonEmpty)('Please enter your password.'), (0, valibot_1.minLength)(8, 'Your password must have 8 characters or more.')),
    email: (0, valibot_1.pipe)((0, valibot_1.string)(), (0, valibot_1.nonEmpty)('Please enter your email.'), (0, valibot_1.email)('The email address is badly formatted.')),
});
class RegisterUserDto {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
    static execute(input) {
        var _a, _b;
        const result = (0, valibot_1.safeParse)(exports.RegisterUserSchema, input);
        if (!result.success) {
            const error = (_b = (_a = result.issues[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { username, password, email } = result.output;
        return [undefined, new RegisterUserDto(username, password, email)];
    }
}
exports.RegisterUserDto = RegisterUserDto;
