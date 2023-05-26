import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/interceptor/loading/loading.service';
import { UserService } from '../../user/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FilterModel, GridModel } from 'src/app/common/model/gridModel';
import { PageEvent } from '@angular/material/paginator';
import { delay } from 'rxjs';
import { HisSalaryService } from './his-salary.service';

@Component({
  selector: 'app-history-salary',
  templateUrl: './history-salary.component.html',
  styleUrls: ['./history-salary.component.scss']
})
export class HistorySalaryComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
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
  gridString: string;
  id: string;
  gridModel: GridModel = new GridModel();
  pageEvent: PageEvent = new PageEvent();
  loading: boolean = false;
  data:any[] = [];
  dataFilter: FilterModel = new FilterModel();
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private _loading: LoadingService,
    private service: HisSalaryService,
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
    this.dataFilter.filterColumns = "FromUserId";
    this.dataFilter.filterDirections = "=";
    this.dataFilter.filterData = this.id;
    if(this.gridString){
      this.gridModel = JSON.parse(this.gridString);
      this.gridModel.listFilter.forEach(i => {})
    } else {
      this.gridModel.page = 0;
      this.gridModel.pageLoading = true;
      this.gridModel.pageSize = 3;
    }
    this.gridModel.listFilter.push(this.dataFilter);
    this.getData();
    this.listenToLoading();
  }

  getData(){
    this.service.getListHisSalary(this.gridModel).subscribe((res: any) => {
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

  openAdd(){
    console.log('xuat ban luong của user này')
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

  back(){
    this.router.navigate(['salary'])
  }

  handleActions(e: any){
    if(e){
      if(e.type == 'detail'){
        this.router.navigate(['dayoff/'+e.id, {gridModel: JSON.stringify(this.gridModel)}])
      } else if(e.type == 'delete'){
        console.log(e.item)
        // var date = new Date(e.item.dateOff);
        // const dialogRef = this.dialog.open(DialogMessageComponent, {
        //   data: {
        //     title: 'Xóa User',
        //     content: 'Bạn có muốn xóa ngày nghỉ '+date.toLocaleDateString('vn-VI')
        //   },
        //   width: '500px',
        // });
    
        // dialogRef.afterClosed().subscribe(result => {
        //   if(result == 'success'){
        //     this.dayOffService.delete(e.item.id).subscribe(res => {
        //       if(res){
        //         this.getData();
        //         this.openSnackBar(res.message)
        //       }
        //     })
        //   }
        // })
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
}
