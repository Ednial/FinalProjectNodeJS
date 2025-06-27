"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const creator_transaction_service_1 = require("./services/creator-transaction.service");
const finder_transaction_service_1 = require("./services/finder-transaction.service");
const finder_transactions_service_1 = require("./services/finder-transactions.service");
const approve_transaction_service_1 = require("./services/approve-transaction.service");
const reject_transaction_service_1 = require("./services/reject-transaction.service");
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
const data_1 = require("../../data");
class TransactionRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatorTransactionService = new creator_transaction_service_1.CreatorTransactionService();
        const finderTransactionService = new finder_transaction_service_1.FinderTransactionService();
        const finderTransactionsService = new finder_transactions_service_1.FinderTransactionsService();
        const approveTransactionService = new approve_transaction_service_1.ApproveTransactionService(finderTransactionService);
        const rejectTransactionService = new reject_transaction_service_1.RejectTransactionService(finderTransactionService);
        const transactionController = new controller_1.TransactionController(finderTransactionService, finderTransactionsService, creatorTransactionService, approveTransactionService, rejectTransactionService);
        router.use(auth_middleware_1.AuthMiddleware.protect);
        router.get('/', transactionController.findAllTransactions);
        router.get('/:id', transactionController.findTransactionById);
        router.post('/', auth_middleware_1.AuthMiddleware.restrictTo(data_1.Role.SENDER), transactionController.createTransaction);
        return router;
    }
}
exports.TransactionRoutes = TransactionRoutes;
