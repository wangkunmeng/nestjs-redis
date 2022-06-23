import { DynamicModule, Inject, Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT, REDIS_MODULE_OPTIONS } from './constants';
import { redisClientProvider } from './redis-client.providers';
import { IRedisModuleOptions } from './redis-module-options.interface';
import { RedisService } from './redis.service';

/**
 * Redis模块，管理Nest进程中的IORedis连接
 */
@Module({})
export class RedisModule implements OnModuleDestroy {
    constructor(@Inject(REDIS_CLIENT) private readonly redisClients: Map<string, Redis>) {}

    private readonly logger = new Logger(RedisModule.name);

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
     * @param options redis配置信息，支持数组格式，如果需要同时连接多个redis db可通过名称进行区分配置。例如:redis读写分离或者连接同一个redis实例的多个db
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
    async onModuleDestroy() {
        // 遍历列表Redis连接列表，释放连接
        for (const [key, redisClient] of this.redisClients) {
            // 如果配置信息不需要一直保持redis的连接，在模块实例销毁时，释放redis的连接
            if (!redisClient.options.keepAlive) {
                // 使用quit方法释放连接，可以保证客户端会执行其队列中的所有剩余命令，并将接收来自Redis的每个命令的回复
                await redisClient.quit();

                this.logger.debug(`name:${key} is closed`, RedisModule.name);
            }
        }
    }
}
