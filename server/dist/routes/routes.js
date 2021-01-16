"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controllers/controller");
exports.router = express_1.default.Router({ strict: true });
var controller = new controller_1.Controller();
exports.router.post('/new', controller.addNewUrl);
exports.router.get('/:short_id', controller.getLinkUrl);
exports.router.post('/short_id', controller.getOriginalUrl);
//# sourceMappingURL=routes.js.map