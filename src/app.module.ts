import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import Joi from "joi";
import {ArticlesModule} from "./articles/articles.module";

@Module({
    imports: [
        ArticlesModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required()
            })
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
