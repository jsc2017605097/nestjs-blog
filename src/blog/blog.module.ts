import {
  Module
} from '@nestjs/common';
import {
  BlogController
} from './blog.controller';
import {
  BlogService
} from './blog.service';
import {
  MongooseModule
} from '@nestjs/mongoose';
import {
  BlogSchema
} from './schemas/blog.schema';
import {
  TagSchema
} from './schemas/tag.schemas';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Post',
          schema: BlogSchema
        },
        {
          name: 'Tag',
          schema: TagSchema
        }
      ]
    )
  ],
  controllers: [BlogController],
  providers: [BlogService]
}) export class BlogModule { }