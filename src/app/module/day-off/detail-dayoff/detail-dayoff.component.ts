import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayOffService } from '../day-off.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-detail-dayoff',
  templateUrl: './detail-dayoff.component.html',
  styleUrls: ['./detail-dayoff.component.scss']
})
export class DetailDayoffComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = false;
  gridString: string;
  id: string;
  data: any;
  half: string;
  approval: string;
  roles: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DayOffService,
    private us: UserService,
    private _snackBar: MatSnackBar,
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
    this.getData();
    this.us.getCurrentUser().subscribe(res => {
      if(res){
        this.us.getRolesOfUser(res.id).subscribe(res => {
          if(res && res.length > 0){
            this.roles = res[0];
          }
        })
      }
    })
  }

  getData(){
    this.service.getOneDayOff(this.id).subscribe(res => {
      if(res){
        switch(res.halfDate){
          case "1":
            this.half = "Buổi sáng";
            break;
          case "2":
            this.half = "Buổi chiều";
            break;
          case "3":
            this.half = "Cả ngày";
            break;
        }
        switch(res.approval){
          case "1":
            this.approval = "Chờ duyệt";
            break;
          case "2":
            this.approval = "Bị hủy";
            break;
          case "3":
            this.approval = "Đã duyệt";
            break;
        }
        this.data = res;
      }
    })
  }

  openSnackBar(content: string) {
    this._snackBar.open(content, 'Đóng', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  back(){
    this.router.navigate(['/dayoff', {gridModel: this.gridString}])
  }

  actionApproval(status: string){
    this.service.actionApproval({
      Id: this.id, status
    }).subscribe(res => {
      if(res && res.status == "Success"){
        this.openSnackBar(res.message);
        this.getData();
      }
    })
  }
}
