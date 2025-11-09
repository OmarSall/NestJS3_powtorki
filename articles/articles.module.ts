import { UniqueIdModule } from '../unique-id/unique-id.module';
import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [UniqueIdModule, DatabaseModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
