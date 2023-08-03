import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from '../model/user';
import { UserRepository } from '../repository/userRepositoty';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<Array<User>> {
    const users = (await this.userRepository.getAll()) as Array<User>;
    return users;
  }

  async getUser(inputId: string): Promise<User | null> {
    const findedUser = await this.userRepository.getOne(inputId);
    if (!findedUser) return null;
    return findedUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const currentTimeStamp = new Date();
    const user = new User({
      ...createUserDto,
      version: 1,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    });
    const createdUser = await this.userRepository.create(user);
    return new User({
      id: createdUser.id,
      login: createdUser.login,
      password: createdUser.password,
      version: createdUser.version,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async changeUserPassword(inputId: string, updatePasswordDto: UpdatePasswordDto): Promise<User | undefined> {
    const editableUser = await this.userRepository.getOne(inputId);
    if (!editableUser) return;
    if (editableUser.password !== updatePasswordDto.oldPassword) {
      throw new Error('old password is wrong');
    }
    editableUser.password = updatePasswordDto.newPassword;
    editableUser.version++;
    editableUser.updatedAt = new Date();

    const editedUser = await this.userRepository.update(inputId, editableUser);
    return new User({
      id: editedUser.id,
      login: editedUser.login,
      password: editedUser.password,
      version: editedUser.version,
      createdAt: editedUser.createdAt,
      updatedAt: editedUser.updatedAt,
    });
  }

  async deleteUser(inputId: string): Promise<User | undefined> {
    return await this.userRepository.delete(inputId);
  }
}
