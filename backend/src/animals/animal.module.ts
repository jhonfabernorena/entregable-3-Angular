import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { barnyards } from 'src/barnyards/entities/barnyard.entity';
import { Animal } from './entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, barnyards])],
  providers: [AnimalService],
  controllers: [AnimalController],
})
export class AnimalModule {}
