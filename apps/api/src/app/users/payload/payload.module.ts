import { Module } from '@nestjs/common';
import { ConfigModule } from '@psb-shared';
import { PayloadService } from './payload.service';

@Module({
  imports: [ConfigModule],
  providers: [PayloadService],
  exports: [],
})
export class PayloadModule {}
