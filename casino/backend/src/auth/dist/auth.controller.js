"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("./decorators/public.decorator");
var nest_access_control_1 = require("nest-access-control");
var auth_guard_1 = require("./guards/auth.guard");
var bcrypt = require("bcryptjs");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    // login endpoint
    AuthController.prototype.logIn = function (loginDto) {
        return this.authService.logIn(loginDto);
    };
    //   signup endpoint
    AuthController.prototype.signup = function (signupDto) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(signupDto);
                        return [4 /*yield*/, this.authService.singUp(signupDto)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //   get user endpoint
    AuthController.prototype.getProfile = function (req) {
        console.log(req.cookies);
        return req["user"];
    };
    // block user endpoint
    AuthController.prototype.blockUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getUserByUsername(username)];
                    case 1:
                        user = _a.sent();
                        console.log(user, 'this is the user in block user');
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.authService.blockUserByUsername(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                message: "User blocked successfully"
                            }];
                    case 3: return [2 /*return*/, { message: "User not found" }];
                }
            });
        });
    };
    //unblock user endpoint
    AuthController.prototype.unblockUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getUserByUsername(username)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.authService.unblockByUsername(username)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                message: "User unblocked successfully"
                            }];
                    case 3: return [2 /*return*/, { message: "User not found" }];
                }
            });
        });
    };
    // delete user endpoint
    AuthController.prototype.deleteAccount = function (req) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req["user"];
                        console.log(user);
                        console.log(user, "this is the usr in delete");
                        if ('username' in user)
                            console.log(user.username, "this is the user in delete");
                        if (!user) {
                            throw new common_1.UnauthorizedException();
                        }
                        if (!("username" in user)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.authService.deleteAccount(user.username)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new common_1.UnauthorizedException("User not found");
                    case 3: 
                    // await this.authService.deleteAccount(user.username);
                    return [2 /*return*/, {
                            message: "Account deleted successfully"
                        }];
                }
            });
        });
    };
    AuthController.prototype.updatePassword = function (req) {
        return __awaiter(this, void 0, Promise, function () {
            var user, newPassword, userName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req["user"];
                        if (!user || !("username" in user)) {
                            throw new common_1.UnauthorizedException();
                        }
                        newPassword = req.body.newPassword;
                        if (!('username' in user)) return [3 /*break*/, 2];
                        userName = user.username;
                        return [4 /*yield*/, this.authService.updatePassword(user.username, newPassword)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, {
                            message: "Password updated successfully"
                        }];
                }
            });
        });
    };
    AuthController.prototype.updateUsername = function (req) {
        return __awaiter(this, void 0, Promise, function () {
            var user, newUsername, confirmPassword, userName, hashedPassword, unHasehdPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req["user"];
                        if (!user || !("username" in user)) {
                            throw new common_1.UnauthorizedException();
                        }
                        newUsername = req.body.newUsername;
                        confirmPassword = req.body.confirmPassword;
                        console.log(user, "this is the user in update username");
                        if (!('username' in user)) return [3 /*break*/, 4];
                        userName = user.username;
                        if (!(typeof userName === 'string')) return [3 /*break*/, 2];
                        console.log(userName, "this is the username");
                        return [4 /*yield*/, this.authService.getUserByUsername(userName)];
                    case 1:
                        hashedPassword = (_a.sent()).password;
                        unHasehdPassword = bcrypt.compare(confirmPassword, hashedPassword);
                        if (!unHasehdPassword) {
                            throw new common_1.UnauthorizedException();
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.authService.updateUsername(userName, newUsername)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            message: "Username updated successfully"
                        }];
                }
            });
        });
    };
    AuthController.prototype.getUserAmount = function (username) {
        return __awaiter(this, void 0, Promise, function () {
            var curerntUsername, userAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(username, "this is the username");
                        curerntUsername = username;
                        return [4 /*yield*/, this.authService.getUserAmount(curerntUsername)];
                    case 1:
                        userAmount = _a.sent();
                        return [2 /*return*/, {
                                amount: userAmount
                            }];
                }
            });
        });
    };
    AuthController.prototype.getUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.getUserByUsername(username)];
                    case 1:
                        user = _a.sent();
                        if (user)
                            return [2 /*return*/, user];
                        else {
                            return [2 /*return*/, { 'message': 'user not found' }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        public_decorator_1.Public(),
        common_1.HttpCode(common_1.HttpStatus.OK),
        common_1.Post("/login"),
        __param(0, common_1.Body())
    ], AuthController.prototype, "logIn");
    __decorate([
        public_decorator_1.Public(),
        common_1.HttpCode(common_1.HttpStatus.OK),
        common_1.Post("/signup"),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], AuthController.prototype, "signup");
    __decorate([
        common_1.Get("profile"),
        __param(0, common_1.Req())
    ], AuthController.prototype, "getProfile");
    __decorate([
        common_1.Post("block"),
        common_1.UseGuards(nest_access_control_1.ACGuard),
        nest_access_control_1.UseRoles({
            possession: "any",
            action: "update",
            resource: "profile"
        }),
        __param(0, common_1.Param("username"))
    ], AuthController.prototype, "blockUser");
    __decorate([
        common_1.Post("unblock/:username"),
        __param(0, common_1.Param("username"))
    ], AuthController.prototype, "unblockUser");
    __decorate([
        common_1.Delete("delete-account"),
        common_1.UseGuards(auth_guard_1.AuthGuard),
        __param(0, common_1.Req())
    ], AuthController.prototype, "deleteAccount");
    __decorate([
        common_1.Post("update-password"),
        common_1.UseGuards(auth_guard_1.AuthGuard),
        __param(0, common_1.Req())
    ], AuthController.prototype, "updatePassword");
    __decorate([
        common_1.Patch("update-username"),
        common_1.UseGuards(auth_guard_1.AuthGuard),
        __param(0, common_1.Req())
    ], AuthController.prototype, "updateUsername");
    __decorate([
        common_1.Get('user-amount'),
        common_1.UseGuards(auth_guard_1.AuthGuard),
        __param(0, common_1.Query('username'))
    ], AuthController.prototype, "getUserAmount");
    __decorate([
        common_1.Get('user'),
        __param(0, common_1.Query('username'))
    ], AuthController.prototype, "getUser");
    AuthController = __decorate([
        common_1.Controller("auth")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
