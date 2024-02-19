import { Injectable } from '@angular/core';
import { TeachersService, UsersService } from '@org/portal/data-access';

@Injectable()
export class ProfileService {
  constructor(
    private usersService: UsersService,
    private teachersService: TeachersService
  ) {}

  fetchDataStudent(uid: string) {
    return this.usersService.usersUidGet(uid);
  }

  fetchDataProfessor(uid: string) {
    return this.teachersService.teachersUidGet(uid);
  }
}
