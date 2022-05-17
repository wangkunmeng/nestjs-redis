import { DynamicModule, Inject, Module, OnModuleDestroy, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_MODULE_OPTIONS, REDIS_CLIENT } from './constants';
import { redisClientProvider } from './redis-client.providers';
import { RedisService } from './redis.service';
import { IRedisModuleOptions } from './redis-module-options.interface';

/**
 * Redis模块，管理Nest进程中的IORedis连接
 */
@Module({})
export class RedisModule implements OnModuleDestroy {
    constructor(@Inject(REDIS_CLIENT) private readonly redisClients: Map<string, Redis>) {}

    /**
     * 初始化创建redis连接
     *
     * eg:
     *  RedisModule.register({ url: 'redis://127.0.0.1:6379/3' });
     *  RedisModule.register([{ name: 'db3', url: 'redis://127.0.0.1:6379/3' }, { name: 'db4', url: 'redis://127.0.0.1:6379/3' }]);
     *  RedisModule.register({ host: '127.0.0.1', port: 6379, db: 3 });
     *
     *  通过配置信息中的onClientReady，可以监听redis相关的事件
     *
     * @param options redis配置信息，支持数组格式。如果需要同时连接多个redis db可通过名称进行区分配置
     * @returns
     */
    static register(options: IRedisModuleOptions | IRedisModuleOptions[]): DynamicModule {
        return {
            global: true,
            providers: [
                {
                    provide: REDIS_MODULE_OPTIONS,
                    useValue: options
                },
                redisClientProvider,
                RedisService
            ],
            exports: [RedisService],
            module: RedisModule
        };
    }

    /**
     * 应用程序关闭时，释放Redis连接，防止Redis服务器堆积无效的长连接
     */
    onModuleDestroy() {
        // 遍历列表Redis连接字典，释放连接
        for (const [key, redisClient] of this.redisClients) {
            redisClient.disconnect();

            Logger.debug(`name:${key} is `, RedisModule.name);
        }
    }
}
