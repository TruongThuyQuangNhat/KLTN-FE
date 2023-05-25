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

  Sex: string | null;
  Address: string | null;
  Age: string | null;
  BirthDay: Date | null;
  DateStartWork: Date | null;
  ManagerId: string | null;
  DayOffId: string | null;
  SalaryId: string | null;
  BonusId: string | null;
  AdvanceMoneyId: string | null;
  CCCDNumber: string | null;
  CCCDIssueDate: Date | null;
  CCCDAddress: string | null;
  BHXHNumber: string | null;
  BHXHIssueDate: Date | null;
  BHXHStartDate: Date | null;
  BHYTNumber: string | null;
  BHYTIssueDate: Date | null;
  BHYTAddress: string | null;
  BHTNNumber: string | null;
  BHTNIssueDate: Date | null;
  SLDNumber: string | null;
  SLDAddress: string | null;
  SLDIssueDate: Date | null;
  BankNumber: string | null;
  BankName: string | null;
  BankAccountName: string | null;
  HDLDNumber: string | null;
  HDLDStartDate: Date | null;
  HDLDEndDate: Date | null;
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
          this.userService.getUserInfo(this.id).subscribe(res => {
            if(res){
              this.Sex = res.sex?res.sex:'';
              this.Address = res.address?res.address:'';
              this.Age = res.age?res.age:'';
              this.BirthDay = res.birthDay == "0001-01-01T00:00:00" ? null: new Date(res.birthDay);
              this.DateStartWork = res.dateStartWork == "0001-01-01T00:00:00" ? null: new Date(res.dateStartWork);
              this.CCCDNumber = res.cccdNumber?res.cccdNumber:'';
              this.CCCDIssueDate = res.cccdIssueDate == "0001-01-01T00:00:00" ? null: new Date(res.cccdIssueDate);
              this.CCCDAddress = res.cccdAddress?res.cccdAddress:'';
              this.BHXHNumber = res.bhxhNumber?res.bhxhNumber:'';
              this.BHXHIssueDate = res.bhxhIssueDate == "0001-01-01T00:00:00" ? null: new Date(res.bhxhIssueDate);
              this.BHXHStartDate = res.bhxhStartDate == "0001-01-01T00:00:00" ? null: new Date(res.bhxhStartDate);
              this.BHYTNumber = res.bhytNumber?res.bhytNumber:'';
              this.BHYTIssueDate = res.bhytIssueDate == "0001-01-01T00:00:00" ? null: new Date(res.bhytIssueDate);
              this.BHYTAddress = res.bhytAddress?res.bhytAddress:'';
              this.BHTNNumber = res.bhtnNumber?res.bhtnNumber:'';
              this.BHTNIssueDate = res.bhtnIssueDate == "0001-01-01T00:00:00" ? null: new Date(res.bhtnIssueDate);
              this.SLDNumber = res.sldNumber?res.sldNumber:'';
              this.SLDAddress = res.sldAddress?res.sldAddress:'';
              this.SLDIssueDate = res.sldIssueDate == "0001-01-01T00:00:00" ? null: new Date(res.sldIssueDate);
              this.BankNumber = res.bankNumber?res.bankNumber:'';
              this.BankName = res.bankName?res.bankName:'';
              this.BankAccountName = res.bankAccountName?res.bankAccountName:'';
              this.HDLDNumber = res.hdldNumber?res.hdldNumber:'';
              this.HDLDStartDate = res.hdldStartDate == "0001-01-01T00:00:00" ? null: new Date(res.hdldStartDate);
              this.HDLDEndDate = res.hdldEndDate == "0001-01-01T00:00:00" ? null: new Date(res.hdldEndDate);
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

  saveInfo(){
    console.log(
      {
        Sex: this.Sex,
        Address: this.Address,
        Age: this.Age,
        BirthDay: this.BirthDay?.toISOString(),
        DateStartWork: this.DateStartWork,
        CCCDNumber: this.CCCDNumber,
        CCCDIssueDate: this.CCCDIssueDate,
        CCCDAddress: this.CCCDAddress,
        BHXHNumber: this.BHXHNumber,
        BHXHIssueDate: this.BHXHIssueDate,
        BHXHStartDate: this.BHXHStartDate,
        BHYTNumber: this.BHYTNumber,
        BHYTIssueDate: this.BHYTIssueDate,
        BHYTAddress: this.BHYTAddress,
        BHTNNumber: this.BHTNNumber,
        BHTNIssueDate: this.BHTNIssueDate,
        SLDNumber: this.SLDNumber,
        SLDAddress: this.SLDAddress,
        SLDIssueDate: this.SLDIssueDate,
        BankNumber: this.BankNumber,
        BankName: this.BankName,
        BankAccountName: this.BankAccountName,
        HDLDNumber: this.HDLDNumber,
        HDLDStartDate: this.HDLDStartDate,
        HDLDEndDate: this.HDLDEndDate,
      }
    )
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
