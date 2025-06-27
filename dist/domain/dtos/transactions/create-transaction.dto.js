"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionDto = exports.CreateTransactionSechema = void 0;
const valibot_1 = require("valibot");
exports.CreateTransactionSechema = (0, valibot_1.object)({
    sender_id: (0, valibot_1.pipe)((0, valibot_1.string)('sender_id is required')),
    receiver_id: (0, valibot_1.pipe)((0, valibot_1.string)('receiver_id is required')),
    userId: (0, valibot_1.pipe)((0, valibot_1.string)('userId is required')),
});
class CreateTransactionDto {
    constructor(sender_id, receiver_id, userId) {
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.userId = userId;
    }
    static execute(input) {
        var _a, _b;
        const result = (0, valibot_1.safeParse)(exports.CreateTransactionSechema, input);
        if (!result.success) {
            const error = (_b = (_a = result.issues[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { sender_id, receiver_id, userId } = result.output;
        return [
            undefined,
            new CreateTransactionDto(sender_id, receiver_id, userId),
        ];
    }
}
exports.CreateTransactionDto = CreateTransactionDto;
