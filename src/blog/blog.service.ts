import {
    Injectable
} from '@nestjs/common';
import {
    Model, Types
} from 'mongoose';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    Post
} from './interfaces/post.interface';
import {
    CreatePostDTO
} from './dto/create-post.dto';
import {
    Tag
} from './interfaces/tag.interface';
import {
    CreateTagDTO
} from './dto/create-tag.dto';

@Injectable() export class BlogService {
    constructor(
        @InjectModel('Post') private readonly postModel: Model<Post>,
        @InjectModel('Tag') private readonly tagModel: Model<Tag>,
    ) { }

    // post
    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().populate('tags').exec();
        return posts;
    }
    async getPost(postID): Promise<Post> {
        const post = await this.postModel.findById(postID).populate('tags').exec();
        return post;
    }
    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = await new this.postModel(createPostDTO);
        return newPost.save();
    }
    async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
        const newObj = { ...createPostDTO, updated: Date.now() }
        const editedPost = await this.postModel.findByIdAndUpdate(postID, newObj, {
            new: true
        });
        return editedPost;
    }

    // tag
    async getTags(): Promise<Tag[]> {
        const tags = await this.tagModel.find().exec();
        return tags;
    }
    async getTag(tagID): Promise<Tag> {
        const tag = await this.tagModel.findById(tagID).exec();
        return tag;
    }
    async addTag(createtagDTO: CreateTagDTO): Promise<Tag> {
        const newtag = await new this.tagModel(createtagDTO);
        return newtag.save();
    }
}