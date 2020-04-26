"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controllers/controller");
exports.router = express_1.default.Router({ strict: true });
var controller = new controller_1.Controller();
exports.router.post('/new', function (req, res) {
    controller.addNewUrl(req, res);
});
exports.router.get('/:short_id', function (req, res) {
    controller.getLinkUrl(req, res);
});
exports.router.post('/short_id', function (req, res) {
    controller.getOriginalUrl(req, res);
});
//# sourceMappingURL=routes.js.map