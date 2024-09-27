import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { barnyardsModule } from './barnyards/barnyard.module';
import { AnimalModule } from './animals/animal.module';
import { ConfigModule } from '@nestjs/config';
import { barnyards } from './barnyards/entities/barnyard.entity';
import { Animal } from './animals/entities/animal.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [barnyards, Animal],
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    barnyardsModule,
    AnimalModule,
  ],
})
export class AppModule {}
