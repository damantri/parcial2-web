import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditorioService } from './auditorio.service';
import { AuditorioController } from './auditorio.controller';
import { Auditorio } from './entities/auditorio.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Auditorio])],
  controllers: [AuditorioController],
  providers: [AuditorioService],
  exports: [AuditorioService], 
})
export class AuditorioModule {}
