import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly redisClients;
    constructor(redisClients: Map<string, Redis>);
    getClient(name?: string): Redis;
}
