"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorTransactionService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class CreatorTransactionService {
    execute(data, sessionUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = new data_1.Transaction();
            transaction.sender_id = data.sender_id;
            transaction.receiver_id = data.receiver_id;
            transaction.user = sessionUser;
            try {
                yield transaction.save();
                return {
                    message: 'Transaction created successfully',
                };
            }
            catch (error) {
                console.error('Error creating transaction:', error);
                throw domain_1.CustomError.internalServer('Failed to make transaction');
            }
        });
    }
}
exports.CreatorTransactionService = CreatorTransactionService;
