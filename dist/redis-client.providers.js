"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClientProvider = void 0;
const ioredis_1 = require("ioredis");
const constants_1 = require("./constants");
exports.redisClientProvider = {
    useFactory: async (redisModuleOptions) => {
        const redisClientMap = new Map();
        if (Array.isArray(redisModuleOptions)) {
            await Promise.allSettled(redisModuleOptions.map(async (option) => {
                const key = option.name || constants_1.DEFAULT_REDIS_CLIENT;
                if (redisClientMap.has(key)) {
                    throw new Error(`[RedisService] ${option.name || 'default'} client is exists`);
                }
                redisClientMap.set(key, await createRedisClient(option));
            }));
        }
        else {
            const key = redisModuleOptions.name || constants_1.DEFAULT_REDIS_CLIENT;
            redisClientMap.set(key, await createRedisClient(redisModuleOptions));
        }
        return redisClientMap;
    },
    inject: [constants_1.REDIS_MODULE_OPTIONS],
    provide: constants_1.REDIS_CLIENT
};
async function createRedisClient(redisModuleOptions) {
    const { onClientReady, url } = redisModuleOptions, redisOptions = __rest(redisModuleOptions, ["onClientReady", "url"]);
    const client = url ? new ioredis_1.default(url) : new ioredis_1.default(redisOptions);
    if (onClientReady) {
        onClientReady(client);
    }
    return client;
}
//# sourceMappingURL=redis-client.providers.js.map