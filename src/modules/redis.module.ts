import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'Redis',
      useFactory: (configService: ConfigService) => {
        const isDocker = process.env.DOCKER;
        const redisHost = isDocker
          ? configService.get('REDIS_HOST_DOCKER')
          : configService.get('REDIS_HOST');
        return new Redis({
          host: redisHost || 'localhost',
          port: Number(configService.get('REDIS_PORT')) || 6379,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['Redis'],
})
export class RedisModule {}
