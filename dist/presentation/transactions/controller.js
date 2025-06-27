"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const handleError_1 = require("../common/handleError");
class TransactionController {
    constructor(finderTransactionService, finderTransactionsService, creatorTransactionService, approveTransactionService, rejectTransactionService) {
        this.finderTransactionService = finderTransactionService;
        this.finderTransactionsService = finderTransactionsService;
        this.creatorTransactionService = creatorTransactionService;
        this.approveTransactionService = approveTransactionService;
        this.rejectTransactionService = rejectTransactionService;
        this.createTransaction = (req, res) => {
            const data = req.body;
            this.creatorTransactionService
                .execute(data, req.body.sessionUser)
                .then((result) => res.status(201).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findAllTransactions = (req, res) => {
            this.finderTransactionsService
                .executeByFindAll()
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findTransactionById = (req, res) => {
            const { id } = req.params;
            this.finderTransactionService
                .executeByFindOne(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.approve = (req, res) => {
            const { id } = req.params;
            this.approveTransactionService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.reject = (req, res) => {
            const { id } = req.params;
            this.rejectTransactionService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
    }
}
exports.TransactionController = TransactionController;
