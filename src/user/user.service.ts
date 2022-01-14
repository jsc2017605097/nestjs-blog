import {
    Injectable,
    UnauthorizedException
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
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable() export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailService: MailService,
        private jwtService: JwtService
    ) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().select('username').exec();
        return users;
    }
    async getUser(userID): Promise<User> {
        const post = await this.userModel.findById(userID).exec();
        return post;
    }
    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        const { username, password } = createUserDTO;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = { username: username, password: hashedPassword };
        const newUser = await new this.userModel(createUser);
        this.mailService.sendMail(newUser.username);
        return newUser.save();
    }
    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.userModel.findOne({ username });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(pass, user.password);

        if (valid) {
            return user;
        }

        return null;
    }
    async signIn(user: User) {
        const payload = { username: user.username, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    
}