/**
 * Redis配置信息在Nest进程中的令牌名称
 */
export const REDIS_MODULE_OPTIONS = Symbol('REDIS_MODULE_OPTIONS');

/**
 * Redis客户端在Nest进程中的令牌名称
 */
export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

/**
 * 默认的Redis连接名称
 */
export const DEFAULT_REDIS_CLIENT = 'DEFAULT_REDIS_CLIENT';
