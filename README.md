# @tiger/nestjs-redis

Nestjs框架Redis(ioredis)连接管理模块

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
