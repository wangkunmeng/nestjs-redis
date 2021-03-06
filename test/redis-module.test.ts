import { Test, TestingModule } from '@nestjs/testing';
import { RedisService, RedisModule } from '../src';

describe('RedisModule', () => {
    let service: RedisService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [RedisModule.register({ url: 'redis://127.0.0.1:6379/14' })]
        }).compile();

        service = moduleRef.get<RedisService>(RedisService);
    });

    it('set test data', async () => {
        const redis = service.getClient();

        await redis.set(`test:redis:${new Date().toISOString()}`, Date.now(), 'EX', 10 * 60);
    });
});
