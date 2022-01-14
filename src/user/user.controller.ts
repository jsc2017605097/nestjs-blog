import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Request,
    UseGuards
} from '@nestjs/common';
import {
    UserService
} from './user.service';
import {
    CreateUserDTO
} from './dto/create-user.dto';
import {
    ValidateObjectId
} from '../shared/pipes/validate-object-id.pipes';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('blog') export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('user') async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:userID') async getUser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('/user') async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been submitted successfully!",
            user: newUser
        })
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
        return this.userService.signIn(req.user);
    }

}