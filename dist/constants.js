"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REDIS_CLIENT = exports.REDIS_CLIENT = exports.REDIS_MODULE_OPTIONS = void 0;
/**
 * Redis配置信息在Nest进程中的令牌名称
 */
exports.REDIS_MODULE_OPTIONS = Symbol('REDIS_MODULE_OPTIONS');
/**
 * Redis客户端在Nest进程中的令牌名称
 */
exports.REDIS_CLIENT = Symbol('REDIS_CLIENT');
/**
 * 默认的Redis连接名称
 */
exports.DEFAULT_REDIS_CLIENT = 'DEFAULT_REDIS_CLIENT';
//# sourceMappingURL=constants.js.map