import {ArticlesService} from './articles.service';
import {
    Body,
    Controller, Delete, Get, Param, ParseIntPipe, Patch,
    Post,
} from '@nestjs/common';
import type {ArticleDto} from './articles.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @Post()
    create(@Body() article: ArticleDto) {
        return this.articlesService.create(article);
    }

    @Get()
    getAll() {
        return this.articlesService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.articlesService.getById(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() article: ArticleDto) {
        return this.articlesService.update(id, article);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.articlesService.delete(id);
    }
}
