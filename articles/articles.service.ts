import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { Article } from './article';
import { ArticleDto } from './articles.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  private articles: Article[] = [];

  create(article: ArticleDto) {
    this.loggerService.log('Creating new article');
    const newArticle = {
      id: this.uniqueIdService.generateIdV4(),
      ...article,
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  getAll() {
    this.loggerService.log('Getting a list of articles');
    return this.articles;
  }

  getById(id: string) {
    this.loggerService.log(`Getting a particular article with id ${id}`);
    const article = this.articles.find((article) => article.id === id);

    if (article) {
      return article;
    }

    this.loggerService.warn('Trying to access an article that does not exist');
    throw new NotFoundException(`Article with id ${id} not found`);
  }

  update(id: string, article: ArticleDto) {
    this.loggerService.log(`Updating article with id ${id}`);
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );
    if (articleIndex === -1) {
      this.loggerService.warn(`No article with id ${id}`);
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    this.articles[articleIndex] = {
      ...this.articles[articleIndex],
      ...article,
    };
    return this.articles[articleIndex];
  }

  delete(id: string) {
    this.loggerService.log(`Delete article with id ${id}`);
    const articleIndex = this.articles.findIndex((article) => article.id == id);
    if (articleIndex === -1) {
      this.loggerService.warn(`No article with id ${id}`);
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    this.articles.splice(articleIndex, 1);
  }
}
