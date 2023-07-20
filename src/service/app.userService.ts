import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/model/user';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private users: Array<User> = [];

  getUsers(): Array<User> {
    const usersWithoutPassword = this.users.map((user) => this.excludeUserPassword(user));
    return usersWithoutPassword;
  }

  getUser(inputId: string): User | undefined {
    const findedUser = this.users.find((user) => user.id === inputId);
    if (!findedUser) return;

    return this.excludeUserPassword(findedUser);
  }

  createUser(createUserDto: CreateUserDto): User {
    const createdUserId = v4();
    const currentTimeStamp = new Date().getTime();
    const createdUser: User = {
      id: createdUserId,
      ...createUserDto,
      version: 1,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    };
    this.users.push(createdUser);

    return this.excludeUserPassword(createdUser);
  }

  changeUserPassword(inputId: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    const editedUser = this.users.find((user) => user.id === inputId);
    if (!editedUser) return;
    if (editedUser.password !== updatePasswordDto.oldPassword) {
      throw new Error('old password is wrong');
    }
    editedUser.password = updatePasswordDto.newPassword;
    editedUser.version++;
    editedUser.updatedAt = new Date().getTime();
    return this.excludeUserPassword(editedUser);
  }

  deleteUser(inputId: string): User | undefined {
    const deletedUser = this.users.find((user) => user.id === inputId);
    if (!deletedUser) return;

    const foundedUserIndex = this.users.indexOf(deletedUser);
    this.users.splice(foundedUserIndex, 1);
    return deletedUser;
  }

  private excludeUserPassword(user: User) {
    const userClone = Object.assign({}, user);
    delete userClone.password;
    return userClone;
  }
}
