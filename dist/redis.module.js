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
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const redis_client_providers_1 = require("./redis-client.providers");
const redis_service_1 = require("./redis.service");
let RedisModule = RedisModule_1 = class RedisModule {
    constructor(redisClients) {
        this.redisClients = redisClients;
    }
    static register(options) {
        return {
            global: true,
            providers: [
                {
                    provide: constants_1.REDIS_MODULE_OPTIONS,
                    useValue: options
                },
                redis_client_providers_1.redisClientProvider,
                redis_service_1.RedisService
            ],
            exports: [redis_service_1.RedisService],
            module: RedisModule_1
        };
    }
    onModuleDestroy() {
        for (const [key, redisClient] of this.redisClients) {
            redisClient.disconnect();
            common_1.Logger.debug(`name:${key} is `, RedisModule_1.name);
        }
    }
};
RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Module)({}),
    __param(0, (0, common_1.Inject)(constants_1.REDIS_CLIENT)),
    __metadata("design:paramtypes", [Map])
], RedisModule);
exports.RedisModule = RedisModule;
//# sourceMappingURL=redis.module.js.map