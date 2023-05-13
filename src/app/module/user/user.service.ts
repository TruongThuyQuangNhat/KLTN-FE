import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GridModel } from 'src/app/common/model/gridModel';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}

  getUsers(gridModel: GridModel){
    return this.http.post(env.apiUrl + 'user/getlist', gridModel).pipe(map((res: any) => res));
  }

  uploadImage(image: any){
    return this.http.post(env.apiUrl + 'authenticate/upload', image).pipe(map((res: any) => res));
  }

  createUser(data: CreateUserModel){
    return this.http.post(env.apiUrl + 'authenticate/register', data).pipe(map((res: any) => res));
  }
}

class CreateUserModel {
  Username: string;
  Email: string;
  Password: string;
  RepeatPassword: string;
  FirstName: string;
  LastName: string;
  DepartmentId: string;
  PositionId: string;
  Avatar: string;
}