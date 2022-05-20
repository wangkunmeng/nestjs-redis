# @tiger/nestjs-redis

Nestjs框架Redis(ioredis)连接管理模块

## 创建原因

目前nestjs官方没有推荐使用的redis封装模块，我们的nestjs项目在7.x.x版本时，一直使用的是相对比较稳定的@skunight/nestjs-redis第三方redis包，但是该包无法兼容nestjs^8.x.x的版本，该包的更新也非常的慢。考虑上述的问题，包括之后的维护和升级的需要，所以封装我们自己的redis操作管理模块。

## 安装

```bash
$ npm install @tiger/nestjs-redis --save
```

## 如何使用

```typescript
import { Logger } from '@nestjs/common';
import config from 'config';
import { RedisModule } from '@tiger/nestjs-redis';

export const Redis: any = RedisModule.register({
    url: config.REDIS_URL,
    enableReadyCheck: true,
    onClientReady: async client => {
        client.on('ready', () => {
            Logger.log('Redis client is ready.', 'RedisService');
        });

        client.on('error', error => {
            Logger.error(error.message, error.stacks, 'RedisService');
        });
    }
});

```
