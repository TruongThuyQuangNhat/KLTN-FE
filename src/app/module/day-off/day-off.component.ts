import { Component } from '@angular/core';
import { FilterModel, GridModel } from 'src/app/common/model/gridModel';
import { UserService } from '../user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/interceptor/loading/loading.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogModel, radio } from 'src/app/model/dialog.model';
import { ResUsers } from 'src/app/common/model/listUserModel';
import { PageEvent } from '@angular/material/paginator';
import { DialogFilterComponent } from 'src/app/common/dialog-filter/dialog-filter.component';
import { DialogAddComponent } from 'src/app/common/dialog-add/dialog-add.component';
import { delay } from 'rxjs';
import { DialogMessageComponent } from 'src/app/common/dialog-message/dialog-message.component';
import { DayOffService } from './day-off.service';
import { ResDayOff } from 'src/app/common/model/listDayOff.Model';

@Component({
  selector: 'app-day-off',
  templateUrl: './day-off.component.html',
  styleUrls: ['./day-off.component.scss']
})
export class DayOffComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = false;
  data: ResDayOff[] = [];
  displayedColumns: string[] = ['name', 'dateOff', 'halfDate', 'approval', 'note', 'sabbaticalDayOff'];
  dataTable: any[] = [
    {
      field: "name",
      text: "Tên",
      type: "text",
      main: true,
    },
    {
      field: "dateOff",
      text: "Ngày ghỉ",
      type: "date",
    },
    {
      field: "halfDate",
      text: "Chi tiết",
      type: "text",
    },
    {
      field: "approval",
      text: "Tình trạng",
      type: "text",
    },
    {
      field: "note",
      text: "Lý do",
      type: "text",
    },
    {
      field: "sabbaticalDayOff",
      text: "Nghỉ phép",
      type: "tick",
    },
  ];
  pageEvent: PageEvent = new PageEvent();
  gridModel: GridModel = new GridModel();
  gridString: string;
  dataDialogTemp: any[] = [
    {
      type: 'text',
      title: 'Họ và tên:',
      value: '',
    },
    {
      type: 'number',
      title: 'Tuổi:',
      value: 0,
    },
    {
      type: 'upload',
      title: 'Avatar:',
      value: '',
    },
    {
      type: 'radio',
      title: 'Gới tính:',
      value: '0',
      listRadio: [
        {text: 'Nam', value: '0'},
        {text: 'Nữ', value: '1'}
      ]
    },
    {
      type: 'select',
      title: 'Chọn Phòng Ban:',
      value: '0',
      listSelect: [
        {text: 'none', value: '0'},
        {text: 'Phòng Nhân Sự', value: '11'},
        {text: 'Phòng IT', value: '12'},
        {text: 'Phòng Khách Hàng', value: '13'},
        {text: 'Phòng R&D', value: '14'},
      ]
    },
    {
      type: 'date',
      title: 'Ngày sinh:',
      value: new Date(),
    },
    {
      type: 'dateTime',
      title: 'Chọn ngày và giờ:',
      value: new Date(),
    },
  ];

  dataDialog: dialogModel[] = [
    {
      type: 'date',
      title: 'Ngày nghỉ:',
      field: 'DateOff',
      subTitle: 'vd: 01/06/2023',
      required: true,
      value: '',
    },
    {
      type: 'select',
      title: 'Thời gian nghỉ:',
      value: '',
      field: 'HalfDate',
      required: true,
      listSelect: [
        {
          id: "1",
          name: "Buổi sáng",
        },
        {
          id: "2",
          name: "Buổi chiều",
        },
        {
          id: "3",
          name: "Cả ngày",
        }
      ]
    },
    {
      type: 'text',
      title: 'Lý do:',
      field: 'Note',
      subTitle: 'vd: khám bệnh',
      required: true,
      value: '',
    },
    {
      type: 'toggle',
      title: '',
      field: 'SabbaticalDayOff',
      subTitle: 'Sử dụng phép',
      required: false,
      value: true,
    },
  ];

  approval: string;

  listApproval: any[] = [
    {
      id: "1",
      name: "Chờ duyệt",
    },
    {
      id: "2",
      name: "Bị hủy",
    },
    {
      id: "3",
      name: "Đã duyệt",
    }
  ]

  startDate: Date;
  endDate: Date;
  dataFilterStartDate: FilterModel = new FilterModel();
  dataFilterEndDate: FilterModel = new FilterModel();
  dataFilterApproval: FilterModel = new FilterModel();
  sabbatical: number = 0;

  constructor(
    private dayOffService: DayOffService,
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
    this.getSabbatical();
  }

  getData(){
    this.dayOffService.getListDayOff(this.gridModel).subscribe((res: any) => {
      if(res){
        res.data?.forEach((i: any) => {
          switch (i.halfDate){
            case '1':
              i.halfDate = "Buổi sáng";
              break;
            case '2':
              i.halfDate = "Buổi chiều";
              break;
            case '3':
              i.halfDate = "Cả ngày"
          }
          switch (i.approval){
            case '1':
              i.approval = "Chờ duyệt";
              break;
            case '2':
              i.approval = "Bị hủy";
              break;
            case '3':
              i.approval = "Đã duyệt"
          }
        })
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

  onChangeStartDate(e: any){
    if(e.value){
      this.startDate = new Date(e.value);
    }
    if(this.startDate){
      this.dataFilterStartDate.filterColumns = "FromDate";
      this.dataFilterStartDate.filterData = this.startDate.toISOString();
      this.gridModel.listFilter = this.gridModel.listFilter.filter(i => i.filterColumns != "FromDate");
      this.gridModel.listFilter.push(this.dataFilterStartDate);
      this.data = [];
      this.gridModel.page = 0;
      this.getData();
    }
  }
  onChangeEndDate(e: any){
    if(e.value){
      this.endDate = new Date(e.value);
    }

    if(this.endDate){
      this.dataFilterEndDate.filterColumns = "ToDate";
      this.dataFilterEndDate.filterData = this.endDate.toISOString();
      this.gridModel.listFilter = this.gridModel.listFilter.filter(i => i.filterColumns != "ToDate");
      this.gridModel.listFilter.push(this.dataFilterEndDate);
      this.data = [];
      this.gridModel.page = 0;
      this.getData();
    }
  }

  getSabbatical(){
    this.dayOffService.getSabbatical().subscribe(res => {
      this.sabbatical = 12 - res?res:0;
      this.dataDialog.forEach(i => {
        if(i.field == "SabbaticalDayOff"){
          i.title = "Số phép trong 1 năm là 12. Số phép còn lại của bạn là: " + this.sabbatical;
        }
      })
    })
  }

  handlePaginator(value: { pageIndex: number; pageSize: number }){
    console.log(value)
    this.gridModel.page = value.pageIndex-1;
    this.gridModel.pageSize = value.pageSize;
    this.getData();
  }

  chooseApproval(id: any){
    this.gridModel.listFilter = this.gridModel.listFilter.filter(i => i.filterColumns !== 'Approval')
    if(id.value){
      console.log(id.value)
      this.approval = id.value;
      this.dataFilterApproval.filterData = this.approval;
      this.dataFilterApproval.filterDirections = '=';
      this.dataFilterApproval.filterColumns = 'Approval';
      this.gridModel.listFilter.push(this.dataFilterApproval)
    }
    this.gridModel.page = 0;
    this.getData();
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogAddComponent, {
      data: this.dataDialog,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const DateOff = new Date(result.DateOff);
        const data = {
          DateOff, HalfDate: result.HalfDate, Note: result.Note, SabbaticalDayOff: result.SabbaticalDayOff
        }
        this.dayOffService.addDateOff(data).subscribe(res => {
          this.getSabbatical();
          if(res && res.status == "Success"){
            this.openSnackBar(res.message);
            this.getData();
          }
        })
      }
    });
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
    if(e){
      if(e.type == 'detail'){
        this.router.navigate(['user/'+e.id, {gridModel: JSON.stringify(this.gridModel)}])
      } else if(e.type == 'edit'){
        // this.userService.getUser(e.id).subscribe(res => {
        //   console.log(res)
        //   const dep = this.listDepartment.find(i => i.id == res.departmentId)
        //   const po = this.listPosition.find(i => i.id == res.positionId)
        //   if(res){
        //     const dataDialogEdit: dialogModel[] = [
        //       {
        //         type: 'text',
        //         title: 'Tên:',
        //         field: 'FirstName',
        //         subTitle: 'Tên, vd: Nhật',
        //         required: true,
        //         value: res.firstName,
        //       },
        //       {
        //         type: 'text',
        //         title: 'Họ:',
        //         field: 'LastName',
        //         subTitle: 'Họ, vd: Trương',
        //         required: true,
        //         value: res.lastName,
        //       },
        //       {
        //         type: 'text',
        //         title: 'Email:',
        //         field: 'Email',
        //         subTitle: 'Email, vd: ttqnhat@email.com',
        //         required: true,
        //         value: res.email,
        //       },
        //       {
        //         type: 'upload',
        //         title: 'Avatar:',
        //         field: 'Avatar',
        //         required: false,
        //         value: res.avatar,
        //       },
        //       {
        //         type: 'text',
        //         title: 'Phone:',
        //         field: 'PhoneNumber',
        //         subTitle: 'vd: 098877665522',
        //         required: false,
        //         value: res.phoneNumber,
        //       },
        //       {
        //         type: 'select',
        //         title: 'Chọn Phòng Ban:',
        //         value: dep?.name,
        //         field: 'DepartmentId',
        //         required: false,
        //         listSelect: this.listDepartment
        //       },
        //       {
        //         type: 'select',
        //         title: 'Chọn Chức Vụ:',
        //         value: po?.name,
        //         field: 'PositionId',
        //         required: false,
        //         listSelect: this.listPosition
        //       },
        //     ];
        //     console.log(dataDialogEdit)
        //     const dialogRef = this.dialog.open(DialogAddComponent, {
        //       data: dataDialogEdit,
        //       width: '700px',
        //     });
        
        //     dialogRef.afterClosed().subscribe(result => {
        //       console.log(result);
        //       if(result){
        //         result.Id = res.id;
        //         if(!result.PositionId){
        //           result.PositionId = res.positionId
        //         }
        //         if(!result.DepartmentId){
        //           result.DepartmentId = res.departmentId
        //         }
        //         if(result.Avatar){
        //           const formImage = new FormData();
        //           formImage.append('Avatar', result?.Avatar);
        //           this.userService.uploadImage(formImage).subscribe(res => {
        //             if(res && res.url){
        //               result.Avatar = res.url;
        //               this.userService.updateUser(result).subscribe(res => {
        //                 this.getData();
        //                 this.openSnackBar(res.message);
        //               })
        //             }
        //           })
        //         } else {
        //           result.Avatar = res.avatar;
        //           this.userService.updateUser(result).subscribe(res => {
        //             this.getData();
        //             this.openSnackBar(res.message);
        //           })
        //         }
        //       }
        //     });
        //   }
        // })
      } else if(e.type == 'delete'){
        // const dialogRef = this.dialog.open(DialogMessageComponent, {
        //   data: {
        //     title: 'Xóa User',
        //     content: 'Bạn có muốn xóa user: ' + e.item.lastName + ' ' + e.item.firstName,
        //   },
        //   width: '500px',
        // });
    
        // dialogRef.afterClosed().subscribe(result => {
        //   if(result == 'success'){
        //     this.userService.deleteUser(e.item.id).subscribe(res => {
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

  getNumberOfSabbatical(){
    const gridModel = new GridModel();
    gridModel.pageLoading = false;
    gridModel.listFilter
  }
}
