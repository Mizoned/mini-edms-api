import {BadRequestException, ConflictException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserModel} from "./models/user.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role, RoleModel} from "../roles/models/role.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {ApiException} from "../../common/exeptions/ApiException";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private readonly usersRepository: typeof UserModel,
        private readonly rolesService: RolesService) {
    }

    async getAll(): Promise<UserModel[]> {
        return await this.usersRepository.findAll({
            include: {
                model: RoleModel,
                through: {
                    attributes: []
                }
            }
        });
    }

    async getById(id: number): Promise<UserModel> {
        const user: UserModel = await this.usersRepository.findByPk(id, {
            include: {
                model: RoleModel,
                through: {
                    attributes: []
                }
            }
        });

        if (!user) {
            throw new ApiException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async getByEmail(email: string): Promise<UserModel> {
        return await this.usersRepository.findOne({
            where: { email },
            include: {
                model: RoleModel,
                through: {
                    attributes: []
                }
            }
        });
    }

    async create(userDto: CreateUserDto): Promise<UserModel> {
        const candidate = await this.usersRepository.findOne({ where: { email: userDto.email }});

        if (candidate) {
            throw new ApiException('Ошибка создания пользователя', HttpStatus.CONFLICT,[{
                property: 'email',
                message: 'Пользователь с таким email уже зарегистрирован'
            }])
        }

        const hashedPassword: string = await this.hashPassword(userDto.password);
        const user: UserModel = await this.usersRepository.create({
            fio: userDto.fio,
            email: userDto.email,
            password: hashedPassword
        });

        const roles: RoleModel[] = await this.rolesService.getRolesByValue(userDto.roles);

        const roleIds = roles.map((role) => role.id);

        await user.$add('role', roleIds);

        user.roles = roles;
        return user;
    }

    async block(id: number): Promise<UserModel> {
        const user: UserModel = await this.usersRepository.findByPk(id);

        if (!user) {
            throw new ApiException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        if (user.banned) {
            throw new ApiException('Пользователь уже заблокирован', HttpStatus.CONFLICT)
        }

        user.banned = true;
        await user.save();

        return user;
    }

    async unblock(id: number): Promise<UserModel> {
        const user: UserModel = await this.usersRepository.findByPk(id);

        if (!user) {
            throw new ApiException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        if (!user.banned) {
            throw new ApiException('Пользователь уже разблокирован', HttpStatus.CONFLICT)
        }

        user.banned = false;
        await user.save();

        return user;
    }

    async update(id: number, dto: UpdateUserDto): Promise<UserModel> {
        const user: UserModel = await this.usersRepository.findByPk(id);

        if (!user) {
            throw new ApiException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        if (dto?.password?.length) {
            const hashedPassword = await bcrypt.hash(dto.password, 7);

            await user.update({
                ...dto,
                password: hashedPassword
            });
        } else {
            await user.update(dto);
        }

        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user: UserModel = await this.usersRepository.findByPk(dto.userId);

        const roles: RoleModel[] = await this.rolesService.getRolesByValue(dto.roles);

        const roleIds = roles.map((role) => role.id);

        await user.$add('role', roleIds);

        return dto;
    }

    async removeRole(dto: AddRoleDto) {
        const user: UserModel = await this.usersRepository.findByPk(dto.userId);

        const roles: RoleModel[] = await this.rolesService.getRolesByValue(dto.roles);

        const roleIds = roles.map((role) => role.id);

        await user.$remove('role', roleIds);

        return dto;
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 7);
    }
}