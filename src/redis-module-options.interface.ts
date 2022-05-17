import { Redis, RedisOptions } from 'ioredis';

/**
 * Redis 配置信息模型，继承ioredis的配置模板
 *
 * eg:
 *  { url: 'redis://127.0.0.1:6379/3' }
 *  { host: '127.0.0.1', port: 6379, db: 3 }
 */
export interface IRedisModuleOptions extends RedisOptions {
    /** 通过url方式配置redis连接信息 */
    url?: string;
    /** 连接的名称，应用程序同时需要连接多个redis db时，必须通过该字段进行区分名称 */
    name?: string;
    /** 监听Redis的连接事件 */
    onClientReady?(client: Redis): void;
}
