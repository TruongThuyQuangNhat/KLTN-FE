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

  getListDepartment(gridModel: GridModel){
    return this.http.post(env.apiUrl + 'department/getlist', gridModel).pipe(map((res: any) => res));
  }

  getOneDepartment(id: string){
    return this.http.get(env.apiUrl + 'department/get/' + id).pipe(map((res: any) => res));
  }

  getOnePosition(id: string){
    return this.http.get(env.apiUrl + 'position/get/' + id).pipe(map((res: any) => res));
  }

  getListPosition(gridModel: GridModel){
    return this.http.post(env.apiUrl + 'position/getlist', gridModel).pipe(map((res: any) => res));
  }

  getUser(id: string){
    return this.http.get(env.apiUrl + 'authenticate/get/'+id).pipe(map((res: any) => res));
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