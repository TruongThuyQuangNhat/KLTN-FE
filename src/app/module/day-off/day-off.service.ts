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

  addDateOff(data: any){
    return this.http.post(env.apiUrl + 'dayoff/create', data).pipe(map((res: any) => res));
  }

  getSabbatical(){
    return this.http.get(env.apiUrl + 'dayoff/getSabbatical').pipe(map((res: any) => res));
  }

  getOneDayOff(id: string){
    return this.http.get(env.apiUrl + 'dayoff/get/'+id).pipe(map((res: any) => res));
  }

  actionApproval(data: any){
    return this.http.put(env.apiUrl + 'dayoff/approval', data).pipe(map((res: any) => res));
  }

  updateDateOff(data: any){
    return this.http.put(env.apiUrl + 'dayoff/update', data).pipe(map((res: any) => res));
  }

  delete(id: string){
    return this.http.delete(env.apiUrl + 'dayoff/delete/'+ id).pipe(map((res: any) => res));
  }
}
