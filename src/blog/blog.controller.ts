import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    UseGuards,
    Put
} from '@nestjs/common';
import {
    BlogService
} from './blog.service';
import {
    CreatePostDTO
} from './dto/create-post.dto';
import {
    CreateTagDTO
} from './dto/create-tag.dto';
import {
    ValidateObjectId
} from '../shared/pipes/validate-object-id.pipes';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@Controller('blog') export class BlogController {
    constructor(private blogService: BlogService) { }

    // post
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

    @UseGuards(JwtAuthGuard)
    @Put('/post/:postID') async editPost(@Res() res, @Param('postID', new ValidateObjectId()) postID, @Body() createPostDTO: CreatePostDTO) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }

    // tag
    @UseGuards(JwtAuthGuard)
    @Get('tags') async getTags(@Res() res) {
        const tags = await this.blogService.getTags();
        return res.status(HttpStatus.OK).json(tags);
    }

    @UseGuards(JwtAuthGuard)
    @Get('tag/:tagID') async getTag(@Res() res, @Param('tagID', new ValidateObjectId()) tagID) {
        const tag = await this.blogService.getTag(tagID);
        if (!tag) throw new NotFoundException('Tag does not exist!');
        return res.status(HttpStatus.OK).json(tag);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/tag') async addTag(@Res() res, @Body() createTagDTO: CreateTagDTO) {
        const newTag = await this.blogService.addTag(createTagDTO);
        return res.status(HttpStatus.OK).json({
            message: "Tag has been submitted successfully!",
            post: newTag
        })
    }
}