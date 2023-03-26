import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}
  testWeather(){
    return this.http.get<any>(env.apiUrl + 'weatherforecast').pipe()
  }
}
