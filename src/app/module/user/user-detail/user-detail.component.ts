import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { LoadingService } from 'src/app/interceptor/loading/loading.service';
import { UserService } from '../user.service';
import { User } from 'src/app/common/model/userModel';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  loading: boolean = false;
  user: User = new User();
  id: string;
  department: any;
  position: any;
  gridString: string;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private _loading: LoadingService,
    private userService: UserService
  ){
    this.route.params.subscribe(res => {
      console.log(res)
      if(res){
        if(res.id){
          this.id = res.id;
        }
        if(res.gridModel){
          this.gridString = res.gridModel;
        }
      }
    })
  }

  ngOnInit(): void {
    this.getUser();
    this.listenToLoading();
  }

  getUser(){
    if(this.id){
      this.userService.getUser(this.id).subscribe(res => {
        if(res){
          this.userService.getOneDepartment(res.departmentId).subscribe(res => {
            if(res){
              this.department = res;
            }
          });
          this.userService.getOnePosition(res.positionId).subscribe(res => {
            if(res){
              this.position = res;
            }
          });
          this.user = res
        }
      })
    }
  }

  back(){
    this.router.navigate(['/user', {gridModel: this.gridString}])
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
