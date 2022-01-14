import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    UseGuards
} from '@nestjs/common';
import {
    BlogService
} from './blog.service';
import {
    CreatePostDTO
} from './dto/create-post.dto';
import {
    ValidateObjectId
} from '../shared/pipes/validate-object-id.pipes';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@Controller('blog') export class BlogController {
    constructor(private blogService: BlogService) {}

    @UseGuards(JwtAuthGuard)
    @Get('posts') async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @UseGuards(JwtAuthGuard)
    @Get('post/:postID') async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if (!post) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(post);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/post') async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }
}