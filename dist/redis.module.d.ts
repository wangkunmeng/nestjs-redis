import { DynamicModule, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IRedisModuleOptions } from './redis-module-options.interface';
export declare class RedisModule implements OnModuleDestroy {
    private readonly redisClients;
    constructor(redisClients: Map<string, Redis>);
    static register(options: IRedisModuleOptions | IRedisModuleOptions[]): DynamicModule;
    onModuleDestroy(): void;
}
