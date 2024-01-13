"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminSchema = exports.Admin = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var user_roles_1 = require("../roles/user.roles");
var Admin = /** @class */ (function () {
    function Admin() {
    }
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Admin.prototype, "username");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Admin.prototype, "email");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Admin.prototype, "password");
    __decorate([
        mongoose_1.Prop({ type: String, "default": user_roles_1.Role.Admin })
    ], Admin.prototype, "roles");
    __decorate([
        mongoose_1.Prop({ "default": false })
    ], Admin.prototype, "isBlocked");
    __decorate([
        mongoose_1.Prop({ "default": 0 })
    ], Admin.prototype, "currentBalance");
    Admin = __decorate([
        mongoose_1.Schema({
            timestamps: true
        })
    ], Admin);
    return Admin;
}());
exports.Admin = Admin;
exports.AdminSchema = mongoose_1.SchemaFactory.createForClass(Admin);
