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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var user_schema_1 = require("./schemas/user.schema");
var bcrypt = require("bcryptjs");
var AuthService = /** @class */ (function () {
    function AuthService(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    // login service
    AuthService.prototype.logIn = function (loginDto) {
        return __awaiter(this, void 0, Promise, function () {
            var user, isPasswordValid, payload, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel
                            .findOne({ username: loginDto.username })
                            .lean()
                            .exec()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, bcrypt.compare(loginDto.password, user.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) {
                            throw new common_1.HttpException("Invalid password", common_1.HttpStatus.UNAUTHORIZED);
                        }
                        payload = {
                            sub: user.email,
                            username: user.username,
                            roles: user.roles,
                            currentBalance: user.currentBalance
                        };
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: process.env.JWT_SECRET,
                                expiresIn: process.env.JWT_EXPIRES
                            })];
                    case 3:
                        accessToken = _a.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken
                            }];
                }
            });
        });
    };
    //   signup service
    AuthService.prototype.singUp = function (signupDto) {
        return __awaiter(this, void 0, Promise, function () {
            var emailExits, usernameExits, unhashed, salt, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(signupDto);
                        return [4 /*yield*/, this.userModel.findOne({
                                email: signupDto.email
                            })];
                    case 1:
                        emailExits = _b.sent();
                        return [4 /*yield*/, this.userModel.findOne({
                                username: signupDto.username
                            })];
                    case 2:
                        usernameExits = _b.sent();
                        if (emailExits) {
                            return [2 /*return*/, { error: "email already exist" }];
                        }
                        else if (usernameExits) {
                            return [2 /*return*/, { error: "username already taken" }];
                        }
                        unhashed = signupDto.password;
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 3:
                        salt = _b.sent();
                        _a = signupDto;
                        return [4 /*yield*/, bcrypt.hash(signupDto.password, salt)];
                    case 4:
                        _a.password = _b.sent();
                        user = new this.userModel(signupDto);
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        // this.logIn(signupDto.username, unhashed);
                        return [2 /*return*/, { msg: "registration successful" }];
                }
            });
        });
    };
    AuthService.prototype.unblockByUsername = function (username) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOneAndUpdate({ username: username }, { isBlocked: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel
                        .findOne({ email: email })
                        .exec()];
            });
        });
    };
    AuthService.prototype.deleteUser = function (userId) { };
    AuthService.prototype.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.userModel
                    .findOne({ username: username })
                    .exec();
                return [2 /*return*/, user];
            });
        });
    };
    AuthService.prototype.blockUserByUsername = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOneAndUpdate({ username: user.username }, { isBlocked: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.deleteAccount = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel
                            .findOneAndDelete({ username: username })
                            .exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.updatePassword = function (username, newPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var user, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ username: username }).exec()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.updateUsername = function (currentUsername, newUsername) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ username: currentUsername }).exec()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        user.username = newUsername;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getUserAmount = function (userName) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.userModel.findOne({ username: userName }).exec();
                        console.log('this method is being called ');
                        console.log(user);
                        return [4 /*yield*/, user];
                    case 1: return [2 /*return*/, (_a.sent()).currentBalance];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(user_schema_1.User.name))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
