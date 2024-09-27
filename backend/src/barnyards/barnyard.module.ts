import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { barnyardsService } from './barnyard.service';
import { barnyardsController } from './barnyard.controller';
import { barnyards } from './entities/barnyard.entity';
import { Animal } from 'src/animals/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([barnyards, Animal])],
  providers: [barnyardsService],
  controllers: [barnyardsController],
})
export class barnyardsModule {}
