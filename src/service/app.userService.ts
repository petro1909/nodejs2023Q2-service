import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/model/user';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private users: Array<User> = [];
  getUsers(): Array<User> {
    return this.users;
  }

  getUser(inputId: string): User | undefined {
    const findedUser = this.users.find((user) => user.id === inputId);
    return findedUser;
  }

  createUser(createUserDto: CreateUserDto): User {
    const createdUserId = v4();
    const currentTimeStamp = new Date().getTime();
    const createdUser: User = {
      id: createdUserId,
      ...createUserDto,
      version: 0,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    };
    this.users.push(createdUser);
    return createdUser;
  }

  changeUserPassword(inputId: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    const editedUser = this.users.find((user) => user.id === inputId);
    if (!editedUser) return;
    if (editedUser.password !== updatePasswordDto.oldPassword) {
      throw new Error('old password is wrong');
    }
    editedUser.password = updatePasswordDto.newPassword;
    return editedUser;
  }

  deleteUser(inputId: string): User | undefined {
    const deletedUser = this.users.find((user) => user.id === inputId);
    if (!deletedUser) return;

    const foundedUserIndex = this.users.indexOf(deletedUser);
    this.users.splice(foundedUserIndex, 1);
    return deletedUser;
  }
}
