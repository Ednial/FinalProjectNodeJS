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
exports.RejectTransactionService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class RejectTransactionService {
    constructor(finderTransactionService) {
        this.finderTransactionService = finderTransactionService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.finderTransactionService.executeByFindOne(id);
            if (transaction.status === 'approved') {
                throw domain_1.CustomError.badRequest('Transaction already approved');
            }
            if (transaction.status === 'rejected') {
                throw domain_1.CustomError.badRequest('Transaction already rejected');
            }
            transaction.status = data_1.TransactionStatus.REJECTED;
            try {
                yield transaction.save();
                return {
                    message: 'Transaction rejected successfully',
                };
            }
            catch (error) {
                console.error('Error rejecting transaction:', error);
                throw domain_1.CustomError.internalServer('Failed to reject transaction');
            }
        });
    }
}
exports.RejectTransactionService = RejectTransactionService;
