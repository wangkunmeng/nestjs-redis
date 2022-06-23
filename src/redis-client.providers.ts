import { FactoryProvider } from '@nestjs/common';
import IORedis from 'ioredis';
import { DEFAULT_REDIS_CLIENT, REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './constants';
import { IRedisModuleOptions } from './redis-module-options.interface';

/**
 * 通过工厂模式创建redis操作实例
 */
export const redisClientProvider: FactoryProvider<Map<string, IORedis.Redis>> = {
    useFactory: (redisModuleOptions: IRedisModuleOptions | IRedisModuleOptions[]) => {
        const redisClientMap = new Map<string, IORedis.Redis>();

        // 如果传递的配置信息为数组格式则遍历数组创建Redis客户端操作实例
        if (Array.isArray(redisModuleOptions)) {
            redisModuleOptions.forEach(option => {
                const key = option.name || DEFAULT_REDIS_CLIENT;

                // 不允许设置名称相同的Redis客户端实例
                if (redisClientMap.has(key)) {
                    throw new Error(`[RedisClientProvider] ${key} client is exists`);
                }

                redisClientMap.set(key, createRedisClient(option));
            });
        } else {
            const key = redisModuleOptions.name || DEFAULT_REDIS_CLIENT;

            redisClientMap.set(key, createRedisClient(redisModuleOptions));
        }

        return redisClientMap;
    },
    // 需要注入Redis连接的配置信息
    inject: [REDIS_MODULE_OPTIONS],
    // Nest进程中配置的提供者的名称
    provide: REDIS_CLIENT
};

/**
 * 创建Redis连接实例
 *
 * @param redisModuleOptions 连接配置信息
 * @returns Redis连接实例
 */
function createRedisClient(redisModuleOptions: IRedisModuleOptions): IORedis.Redis {
    const { onClientReady, url, ...redisOptions } = redisModuleOptions;
    // 优先使用url创建Redis连接
    const client = url ? new IORedis(url) : new IORedis(redisOptions);

    // 注册Redis连接事件的监听函数
    if (onClientReady) {
        onClientReady(client);
    }

    return client;
}
