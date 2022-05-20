import { FactoryProvider } from '@nestjs/common';
import IORedis from 'ioredis';
/**
 * 通过工厂模式创建redis操作实例的provide
 */
export declare const redisClientProvider: FactoryProvider<Promise<Map<string, IORedis.Redis>>>;
