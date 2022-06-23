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
/**
 * 通过工厂模式创建redis操作实例
 */
exports.redisClientProvider = {
    useFactory: (redisModuleOptions) => {
        const redisClientMap = new Map();
        // 如果传递的配置信息为数组格式则遍历数组创建Redis客户端操作实例
        if (Array.isArray(redisModuleOptions)) {
            redisModuleOptions.forEach(option => {
                const key = option.name || constants_1.DEFAULT_REDIS_CLIENT;
                // 不允许设置名称相同的Redis客户端实例
                if (redisClientMap.has(key)) {
                    throw new Error(`[RedisClientProvider] ${key} client is exists`);
                }
                redisClientMap.set(key, createRedisClient(option));
            });
        }
        else {
            const key = redisModuleOptions.name || constants_1.DEFAULT_REDIS_CLIENT;
            redisClientMap.set(key, createRedisClient(redisModuleOptions));
        }
        return redisClientMap;
    },
    // 需要注入Redis连接的配置信息
    inject: [constants_1.REDIS_MODULE_OPTIONS],
    // Nest进程中配置的提供者的名称
    provide: constants_1.REDIS_CLIENT
};
/**
 * 创建Redis连接实例
 *
 * @param redisModuleOptions 连接配置信息
 * @returns Redis连接实例
 */
function createRedisClient(redisModuleOptions) {
    const { onClientReady, url } = redisModuleOptions, redisOptions = __rest(redisModuleOptions, ["onClientReady", "url"]);
    // 优先使用url创建Redis连接
    const client = url ? new ioredis_1.default(url) : new ioredis_1.default(redisOptions);
    // 注册Redis连接事件的监听函数
    if (onClientReady) {
        onClientReady(client);
    }
    return client;
}
//# sourceMappingURL=redis-client.providers.js.map