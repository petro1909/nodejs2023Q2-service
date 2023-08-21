import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from '../model/user';
import { UserRepository } from '../repository/userRepository';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private n: number;
  constructor(private readonly userRepository: UserRepository, private readonly configService: ConfigService) {
    this.n = Math.random();
  }

  async getUsers(): Promise<Array<User>> {
    const users = (await this.userRepository.getAll()).map((user) => new User(user)) as Array<User>;
    return users;
  }

  async getUser(inputId: string): Promise<User | null> {
    const findedUser = await this.userRepository.getOne(inputId);
    if (!findedUser) return null;
    return new User(findedUser);
  }

  public async getUserByLoginAndPassword(login: string, password: string) {
    const findedUser = await this.userRepository.getOneByLogin(login);
    if (!findedUser) {
      return;
    }
    if (!(await bcrypt.compare(password, findedUser.password))) {
      throw new Error('input password doesn"t match actual one');
    }
    return findedUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const findedUser = await this.userRepository.getOneByLogin(createUserDto.login);
    if (findedUser) {
      throw new Error('such user already exists');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, +this.configService.get('CRYPT_SALT'));
    const currentTimeStamp = new Date();
    const user = new User({
      ...createUserDto,
      version: 1,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    });
    const createdUser = await this.userRepository.create(user);
    return new User(createdUser);
  }

  async changeUserPassword(inputId: string, updatePasswordDto: UpdatePasswordDto): Promise<User | undefined> {
    const editableUser = await this.userRepository.getOne(inputId);
    if (!editableUser) return;
    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, editableUser.password))) {
      throw new Error('old password is wrong');
    }
    editableUser.password = await bcrypt.hash(updatePasswordDto.newPassword, +this.configService.get('CRYPT_SALT'));
    editableUser.version++;
    editableUser.updatedAt = new Date();

    const editedUser = await this.userRepository.update(inputId, editableUser);
    return new User(editedUser);
  }

  async setRefreshToken(inputId: string, token: string) {
    const editedUser = await this.userRepository.update(inputId, { refreshToken: token });
    return new User(editedUser);
  }

  async deleteUser(inputId: string): Promise<User | undefined> {
    return await this.userRepository.delete(inputId);
  }
}
