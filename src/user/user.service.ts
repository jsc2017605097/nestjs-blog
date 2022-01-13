import {
    Injectable
} from '@nestjs/common';
import {
    Model
} from 'mongoose';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    User
} from './interface/user.interface';
import {
    CreateUserDTO
} from './dto/create-user.dto';
import {
    MailService
} from '../mail/mail.service';

@Injectable() export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailService: MailService
    ) { }

    async getUsers(): Promise<User[]> {
        const posts = await this.userModel.find().exec();
        return posts;
    }
    async getUser(userID): Promise<User> {
        const post = await this.userModel.findById(userID).exec();
        return post;
    }
    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = await new this.userModel(createUserDTO);
        this.mailService.sendMail(newUser.username);
        return newUser.save();
    }
}