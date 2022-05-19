import { FactoryProvider } from '@nestjs/common';
import IORedis from 'ioredis';
export declare const redisClientProvider: FactoryProvider<Promise<Map<string, IORedis.Redis>>>;
