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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
let RedisService = class RedisService {
    constructor(redisClients) {
        this.redisClients = redisClients;
    }
    /**
     * 获取redis操作客户端
     *
     * @param name
     * @returns
     */
    getClient(name = constants_1.DEFAULT_REDIS_CLIENT) {
        // 先判断需要获取的Redis连接实例是否存在
        if (!this.redisClients.has(name)) {
            throw new Error(`name [${name}] is not existed`);
        }
        return this.redisClients.get(name);
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.REDIS_CLIENT)),
    __metadata("design:paramtypes", [Map])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map