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
exports.ApproveTransactionService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class ApproveTransactionService {
    constructor(finderTransactionService) {
        this.finderTransactionService = finderTransactionService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.finderTransactionService.executeByFindOne(id);
            if (transaction.status === 'approved') {
                throw new Error('Transaction already approved');
            }
            transaction.status = data_1.TransactionStatus.APPROVED;
            try {
                yield transaction.save();
                return {
                    message: 'Transaction approved successfully',
                };
            }
            catch (error) {
                domain_1.CustomError.internalServer('Error approving transaction');
            }
        });
    }
}
exports.ApproveTransactionService = ApproveTransactionService;
