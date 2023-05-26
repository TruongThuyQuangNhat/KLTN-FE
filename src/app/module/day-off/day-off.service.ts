import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GridModel } from 'src/app/common/model/gridModel';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  constructor(private http: HttpClient) { }

  getListDayOff(gridModel: GridModel){
    return this.http.post(env.apiUrl + 'dayoff/getlist', gridModel).pipe(map((res: any) => res));
  }
}
