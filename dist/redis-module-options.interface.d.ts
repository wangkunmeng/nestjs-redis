import { Redis, RedisOptions } from 'ioredis';
export interface IRedisModuleOptions extends RedisOptions {
    url?: string;
    name?: string;
    onClientReady?(client: Redis): void;
}
