import { FactoryProvider } from '@nestjs/common';
import IORedis from 'ioredis';
/**
 * 通过工厂模式创建redis操作实例
 */
export declare const redisClientProvider: FactoryProvider<Map<string, IORedis.Redis>>;
