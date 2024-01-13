"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_controller_1 = require("./auth.controller");
var auth_services_1 = require("./auth.services");
var mongoose_1 = require("@nestjs/mongoose");
var jwt_1 = require("@nestjs/jwt");
var user_schema_1 = require("./schemas/user.schema");
var core_1 = require("@nestjs/core");
var auth_guard_1 = require("./guards/auth.guard");
var game_schema_1 = require("./schemas/game.schema");
var game_controller_1 = require("./game.controller");
var game_service_1 = require("./game.service");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                jwt_1.JwtModule.register({
                    global: true,
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: process.env.JWT_EXPIRES
                    }
                }),
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: "User",
                        schema: user_schema_1.UserSchema
                    },
                ]),
                mongoose_1.MongooseModule.forFeature([
                    { name: "Game", schema: game_schema_1.GameSchema }
                ]),
            ],
            controllers: [auth_controller_1.AuthController, game_controller_1.GameController],
            providers: [
                auth_services_1.AuthService, game_service_1.GameService,
                { provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
