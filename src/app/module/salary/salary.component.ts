import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GridModel } from 'src/app/common/model/gridModel';
import { LoadingService } from 'src/app/interceptor/loading/loading.service';
import { DayOffService } from '../day-off.service';
import { delay } from 'rxjs';
import { DialogMessageComponent } from 'src/app/common/dialog-message/dialog-message.component';
import { ResSalary } from 'src/app/common/model/listSalary.Model';
import { SalaryService } from './salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = false;
  data: ResSalary[] = [];
  displayedColumns: string[] = ['name', 'avatar', 'money', 'fuelAllowance', 'lunchAllowance'];
  dataTable: any[] = [
    {
      field: "name",
      text: "Tên",
      type: "text",
      main: true,
      delete: false,
      edit: false,
    },
    {
      field: "avatar",
      text: "Hình ảnh",
      type: "avatar",
    },
    {
      field: "money",
      text: "Lương cố định",
      type: "text",
    },
    {
      field: "fuelAllowance",
      text: "Phụ cấp xăng đi làm",
      type: "text",
    },
    {
      field: "lunchAllowance",
      text: "Phụ cấp ăn trưa",
      type: "text",
    },
  ];
  pageEvent: PageEvent = new PageEvent();
  gridModel: GridModel = new GridModel();
  gridString: string;


  constructor(
    private service: SalaryService,
    public dialog: MatDialog,
    private _loading: LoadingService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.route.params.subscribe(res => {
      console.log(res)
      if(res){
        if(res.gridModel){
          this.gridString = res.gridModel;
        }
      }
    })
  }

  ngOnInit(): void {
    if(this.gridString){
      this.gridModel = JSON.parse(this.gridString);
      this.gridModel.listFilter.forEach(i => {})
    } else {
      this.gridModel.page = 0;
      this.gridModel.pageLoading = true;
      this.gridModel.pageSize = 3;
    }
    this.getData();
    this.listenToLoading();
  }

  getData(){
    this.service.getListSalary(this.gridModel).subscribe((res: any) => {
      if(res){
        this.data = res.data;
        const temp: PageEvent = {
          length: res.totalCount,
          pageIndex: res.page-1,
          pageSize: res.pageSize
        }
        this.pageEvent = temp;
        console.log(this.data)
      }
    })
  }

  handlePaginator(value: { pageIndex: number; pageSize: number }){
    console.log(value)
    this.gridModel.page = value.pageIndex-1;
    this.gridModel.pageSize = value.pageSize;
    this.getData();
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

  handleActions(e: any){
    console.log(e)
    if(e){
      if(e.type == 'detail'){
        this.router.navigate(['salary/history/'+e.id, {gridModel: JSON.stringify(this.gridModel)}])
      }
    }
  }

  search(e: any){
    if(e.target.value){
      this.gridModel.page = 0;
      this.gridModel.searchText = e.target.value;
      this.getData();
    } else {
      this.gridModel.page = 0;
      this.gridModel.searchText = '';
      this.getData();
    }
  }

  getNumberOfSabbatical(){
    const gridModel = new GridModel();
    gridModel.pageLoading = false;
    gridModel.listFilter
  }
}
