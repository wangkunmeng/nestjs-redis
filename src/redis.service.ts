import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { DEFAULT_REDIS_CLIENT, REDIS_CLIENT } from './constants';

@Injectable()
export class RedisService {
    constructor(@Inject(REDIS_CLIENT) private readonly redisClients: Map<string, Redis>) {}

    /**
     * 获取redis操作客户端
     *
     * @param name
     * @returns
     */
    getClient(name: string = DEFAULT_REDIS_CLIENT) {
        // 先判断需要获取的Redis连接实例是否存在
        if (!this.redisClients.has(name)) {
            throw new Error(`name [${name}] is not existed`);
        }

        return this.redisClients.get(name)!;
    }
}
