"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
const typeorm_1 = require("typeorm");
let Registration = class Registration {
};
exports.Registration = Registration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Registration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Registration.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Registration.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Registration.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Registration.prototype, "subgroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Registration.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Registration.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "member" }),
    __metadata("design:type", String)
], Registration.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "birthday" }),
    __metadata("design:type", String)
], Registration.prototype, "registrationType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Registration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Registration.prototype, "updatedAt", void 0);
exports.Registration = Registration = __decorate([
    (0, typeorm_1.Entity)()
], Registration);
