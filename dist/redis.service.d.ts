import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly redisClients;
    constructor(redisClients: Map<string, Redis>);
    /**
     * 获取redis操作客户端
     *
     * @param name
     * @returns
     */
    getClient(name?: string): Redis;
}
