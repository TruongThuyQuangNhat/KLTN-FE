import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { LoadingService } from 'src/app/interceptor/loading/loading.service';
import { UserService } from '../user.service';
import { User } from 'src/app/common/model/userModel';
import { invalid } from 'moment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = false;
  user: User = new User();
  id: string;
  department: any;
  position: any;
  gridString: string;

  UserInfoId: string;
  Sex: string;
  Address: string;
  Age: number = 0;
  BirthDay: Date;
  DateStartWork: Date;
  ManagerId: string;
  DayOffId: string;
  SalaryId: string;
  BonusId: string;
  AdvanceMoneyId: string;
  CCCDNumber: string;
  CCCDIssueDate: Date;
  CCCDAddress: string;
  BHXHNumber: string;
  BHXHIssueDate: Date;
  BHXHStartDate: Date;
  BHYTNumber: string;
  BHYTIssueDate: Date;
  BHYTAddress: string;
  BHTNNumber: string;
  BHTNIssueDate: Date;
  SLDNumber: string;
  SLDAddress: string;
  SLDIssueDate: Date;
  BankNumber: string;
  BankName: string;
  BankAccountName: string;
  HDLDNumber: string;
  HDLDStartDate: Date;
  HDLDEndDate: Date;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private _loading: LoadingService,
    private userService: UserService,
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
    this.getUser();
    this.listenToLoading();
  }

  getUser(){
    if(this.id){
      this.userService.getUser(this.id).subscribe(res => {
        if(res){
          this.userService.getUserInfo(this.id).subscribe(res => {
            console.log(res)
            if(res && res[0]){
              this.UserInfoId = res[0]?.id;
              this.Sex = res[0].sex?res[0].sex:'';
              this.Address = res[0].address?res[0].address:'';
              this.Age = res[0].age?Number.parseInt(res[0].age):0;
              if(res[0].birthDay !== "0001-01-01T00:00:00"){
                this.BirthDay = new Date(res[0].birthDay);
              }
              if(res[0].dateStartWork !== "0001-01-01T00:00:00"){
                this.DateStartWork = new Date(res[0].dateStartWork);
              }
              this.CCCDNumber = res[0].cccdNumber?res[0].cccdNumber:'';
              if(res[0].cccdIssueDate !== "0001-01-01T00:00:00"){
                this.CCCDIssueDate = new Date(res[0].cccdIssueDate);
              }
              this.CCCDAddress = res[0].cccdAddress?res[0].cccdAddress:'';
              this.BHXHNumber = res[0].bhxhNumber?res[0].bhxhNumber:'';
              if(res[0].bhxhIssueDate !== "0001-01-01T00:00:00"){
                this.BHXHIssueDate = new Date(res[0].bhxhIssueDate);
              }
              if(res[0].bhxhStartDate !== "0001-01-01T00:00:00"){
                this.BHXHStartDate = new Date(res[0].bhxhStartDate);
              }
              this.BHYTNumber = res[0].bhytNumber?res[0].bhytNumber:'';
              if(res[0].bhytIssueDate !== "0001-01-01T00:00:00"){
                this.BHYTIssueDate = new Date(res[0].bhytIssueDate);
              }
              this.BHYTAddress = res[0].bhytAddress?res[0].bhytAddress:'';
              this.BHTNNumber = res[0].bhtnNumber?res[0].bhtnNumber:'';
              if(res[0].bhtnIssueDate !== "0001-01-01T00:00:00"){
                this.BHTNIssueDate = new Date(res[0].bhtnIssueDate);
              }
              this.SLDNumber = res[0].sldNumber?res[0].sldNumber:'';
              this.SLDAddress = res[0].sldAddress?res[0].sldAddress:'';
              if(res[0].sldIssueDate !== "0001-01-01T00:00:00"){
                this.SLDIssueDate = new Date(res[0].sldIssueDate);
              }
              this.BankNumber = res[0].bankNumber?res[0].bankNumber:'';
              this.BankName = res[0].bankName?res[0].bankName:'';
              this.BankAccountName = res[0].bankAccountName?res[0].bankAccountName:'';
              this.HDLDNumber = res[0].hdldNumber?res[0].hdldNumber:'';
              if(res[0].hdldStartDate !== "0001-01-01T00:00:00"){

                this.HDLDStartDate = new Date(res[0].hdldStartDate);
              }
              if(res[0].hdldEndDate !== "0001-01-01T00:00:00"){
                this.HDLDEndDate = new Date(res[0].hdldEndDate);
              }
            }
          })
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

  invalidDate(date: any){
    if(date?._d){
      return true;
    }
    return date instanceof Date && !isNaN(date.getTime())
  }

  saveInfo(){
    const data = 
      {
        Id: this.UserInfoId,
        Sex: this.Sex,
        Address: this.Address,
        Age: this.Age,
        BirthDay: this.invalidDate(this.BirthDay)?this.BirthDay.toISOString():null,
        DateStartWork: this.invalidDate(this.DateStartWork)?this.DateStartWork.toISOString():null,
        CCCDNumber: this.CCCDNumber,
        CCCDIssueDate: this.invalidDate(this.CCCDIssueDate)?this.CCCDIssueDate.toISOString():null,
        CCCDAddress: this.CCCDAddress,
        BHXHNumber: this.BHXHNumber,
        BHXHIssueDate: this.invalidDate(this.BHXHIssueDate)?this.BHXHIssueDate.toISOString():null,
        BHXHStartDate: this.invalidDate(this.BHXHStartDate)?this.BHXHStartDate.toISOString():null,
        BHYTNumber: this.BHYTNumber,
        BHYTIssueDate: this.invalidDate(this.BHYTIssueDate)?this.BHYTIssueDate.toISOString():null,
        BHYTAddress: this.BHYTAddress,
        BHTNNumber: this.BHTNNumber,
        BHTNIssueDate: this.invalidDate(this.BHTNIssueDate)?this.BHTNIssueDate.toISOString():null,
        SLDNumber: this.SLDNumber,
        SLDAddress: this.SLDAddress,
        SLDIssueDate: this.invalidDate(this.SLDIssueDate)?this.SLDIssueDate.toISOString():null,
        BankNumber: this.BankNumber,
        BankName: this.BankName,
        BankAccountName: this.BankAccountName,
        HDLDNumber: this.HDLDNumber,
        HDLDStartDate: this.invalidDate(this.HDLDStartDate)?this.HDLDStartDate.toISOString():null,
        HDLDEndDate: this.invalidDate(this.HDLDEndDate)?this.HDLDEndDate.toISOString():null,
      };
    this.userService.updateUserInfo(data).subscribe(res => {
      if(res && res.status == 'Success'){
        this.openSnackBar(res.message)
      }
    })
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

  openSnackBar(content: string) {
    this._snackBar.open(content, 'Đóng', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
