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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
class EmailService {
    constructor(mailerService, mailEmail, senderEmailPassword, postToProvider) {
        this.postToProvider = postToProvider;
        this.transporter = nodemailer_1.default.createTransport({
            service: mailerService,
            auth: {
                user: mailEmail,
                pass: senderEmailPassword,
            },
        });
    }
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to, subject, htmlBody, attachments = [] } = options;
            try {
                yield this.transporter.sendMail({
                    to: to,
                    subject: subject,
                    html: htmlBody,
                    //attachments: attachments
                });
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    sendConfirmationEmail(to, name, confirmationUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlBody = pug_1.default.renderFile('src/presentation/common/templates/confirmation.pug', { name, confirmationUrl });
            return this.sendEmail({
                to,
                subject: 'Confirm your email',
                htmlBody,
            });
        });
    }
}
exports.EmailService = EmailService;
