import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../../common/decorators/roles.decorator";
import {Role} from "../roles/models/role.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {ApiValidationPipe} from "../../common/pipes/api-validation.pipe";
import {ResponseUser} from "./response/response-user";


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [ResponseUser] })
    @Get()
    async getAll(): Promise<ResponseUser[]> {
        const users = await this.usersService.getAll();
        return users.map((user) => new ResponseUser(user));
    }

    @ApiOperation({ summary: 'Получение пользователя по id' })
    @ApiResponse({ status: 200, type: ResponseUser })
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<ResponseUser> {
        const user =  await this.usersService.getById(id);
        return new ResponseUser(user);
    }

    @ApiOperation({ summary: 'Блокировака пользователя по id' })
    @ApiResponse({ status: 200, type: ResponseUser })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/block/:id')
    async block(@Param('id') id: number): Promise<ResponseUser> {
        const user = await this.usersService.block(id);
        return new ResponseUser(user);
    }

    @ApiOperation({ summary: 'Разблокировака пользователя по id' })
    @ApiResponse({ status: 200, type: ResponseUser })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post('/unblock/:id')
    async unblock(@Param('id') id: number) {
        const user = await this.usersService.unblock(id);
        return new ResponseUser(user);
    }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ResponseUser })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUser> {
        const user = await this.usersService.create(createUserDto);
        return new ResponseUser(user);
    }

    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiResponse({ status: 200, type: ResponseUser })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
    async update(@Body() dto: UpdateUserDto, @Param('id') id: number): Promise<ResponseUser> {
        const user = await this.usersService.update(id, dto);
        return new ResponseUser(user);
    }

    @ApiOperation({ summary: 'Добавление ролей пользователю' })
    @ApiResponse({ status: 200, type: AddRoleDto })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post('roles')
    addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Удаление ролей пользователя' })
    @ApiResponse({ status: 200, type: AddRoleDto })
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('roles')
    removeRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
        return this.usersService.removeRole(dto);
    }
}
