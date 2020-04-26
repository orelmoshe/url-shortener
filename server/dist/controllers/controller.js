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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var dns_1 = __importDefault(require("dns"));
var NodeCache = require('node-cache');
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.myCache = new NodeCache();
        this.checkIfShortIdExists = function (shortId) {
            for (var _i = 0, _a = _this.myCache.keys(); _i < _a.length; _i++) {
                var key = _a[_i];
                if (_this.myCache.get(key) === shortId)
                    return key;
            }
            return null;
        };
        if (Controller.instance) {
            return Controller.instance;
        }
        Controller.instance = this;
    }
    Controller.prototype.addNewUrl = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var originalUrl, shortId;
            return __generator(this, function (_a) {
                try {
                    originalUrl = void 0;
                    try {
                        originalUrl = new URL(req.body.url);
                    }
                    catch (ex) {
                        throw 'invalid URL';
                    }
                    dns_1.default.lookup(originalUrl.hostname, function (err) {
                        if (err) {
                            throw 'Address not found';
                        }
                    });
                    shortId = void 0;
                    if (this.myCache.has(originalUrl.href)) {
                        shortId = this.myCache.get(originalUrl.href);
                        res.status(200).json(shortId);
                        return [2 /*return*/];
                    }
                    shortId = uuid_1.v4();
                    this.myCache.set(originalUrl.href, shortId);
                    res.status(200).json(shortId);
                }
                catch (ex) {
                    console.error(ex);
                    res.status(500).json({ massage: ex });
                }
                return [2 /*return*/];
            });
        });
    };
    Controller.prototype.getLinkUrl = function (req, res) {
        try {
            var shortId = req.params.short_id;
            var originalUrl = this.checkIfShortIdExists(shortId);
            if (!originalUrl) {
                throw 'Uh oh. We could not find a link at that URL';
            }
            res.redirect(originalUrl);
        }
        catch (ex) {
            console.error(ex);
            res.status(500).json({ massage: ex });
        }
    };
    Controller.prototype.getOriginalUrl = function (req, res) {
        try {
            var shortId = req.body.short_id;
            var originalUrl = this.checkIfShortIdExists(shortId);
            if (!originalUrl) {
                throw 'Uh oh. We could not find a link at that URL';
            }
            res.status(200).json(originalUrl);
        }
        catch (ex) {
            console.error(ex);
            res.status(500).json({ massage: ex });
        }
    };
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map