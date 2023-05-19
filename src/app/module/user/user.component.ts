import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DialogFilterComponent } from 'src/app/common/dialog-filter/dialog-filter.component';
import { dialogModel, radio } from 'src/app/model/dialog.model';
import { selectModel } from 'src/app/model/select.model';
import { UserService } from './user.service';
import { GridModel } from 'src/app/common/model/gridModel';
import { ResUsers } from 'src/app/common/model/listUserModel';
import { DialogAddComponent } from 'src/app/common/dialog-add/dialog-add.component';
import { LoadingService } from 'src/app/interceptor/loading/loading.service';
import { delay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { DialogMessageComponent } from 'src/app/common/dialog-message/dialog-message.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = false;
  data: ResUsers[] = [];
  listDepartment: radio[] = []
  listPosition: radio[] = []
  displayedColumns: string[] = ['fullName', 'email', 'avatar', 'departmentName', 'positionName', 'roles'];
  dataTable: any[] = [
    {
      field: "fullName",
      text: "Tên",
    },
    {
      field: "departmentName",
      text: "Phòng Ban",
    },
    {
      field: "email",
      text: "Email",
    },
    {
      field: "positionName",
      text: "Chức Vụ",
    },
    {
      field: "avatar",
      text: "Hình ảnh",
    },
    {
      field: "roles",
      text: "Quyền",
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
      type: 'text',
      title: 'User Name:',
      field: 'Username',
      subTitle: 'username, vd: ttqnhat',
      required: true,
      value: '',
    },
    {
      type: 'text',
      title: 'Tên:',
      field: 'FirstName',
      subTitle: 'Tên, vd: Nhật',
      required: true,
      value: '',
    },
    {
      type: 'text',
      title: 'Họ:',
      field: 'LastName',
      subTitle: 'Họ, vd: Trương',
      required: true,
      value: '',
    },
    {
      type: 'text',
      title: 'Email:',
      field: 'Email',
      subTitle: 'Email, vd: ttqnhat@email.com',
      required: true,
      value: '',
    },
    {
      type: 'upload',
      title: 'Avatar:',
      field: 'Avatar',
      required: false,
      value: '',
    },
    {
      type: 'text',
      title: 'Phone:',
      field: 'PhoneNumber',
      subTitle: 'vd: 098877665522',
      required: false,
      value: '',
    },
    {
      type: 'password',
      title: 'Mật Khẩu:',
      field: 'Password',
      required: true,
      value: '',
    },
    {
      type: 'password',
      title: 'Lặp Lại Mật Khẩu:',
      field: 'RepeatPassword',
      required: true,
      value: '',
    },
    {
      type: 'select',
      title: 'Chọn Phòng Ban:',
      value: '0',
      field: 'DepartmentId',
      required: true,
      listSelect: []
    },
    {
      type: 'select',
      title: 'Chọn Chức Vụ:',
      value: '',
      field: 'PositionId',
      required: true,
      listSelect: []
    },
  ];
  dataSelect = selectData;

  constructor(
    private userService: UserService,
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
    } else {
      this.gridModel.page = 0;
      this.gridModel.pageLoading = true;
      this.gridModel.pageSize = 3;
    }
    this.getData();
    this.listenToLoading();
    this.getListDepartment();
    this.getListPosition();
  }

  getData(){
    this.userService.getUsers(this.gridModel).subscribe((res: any) => {
      if(res){
        this.data = res.data;
        const temp: PageEvent = {
          length: res.totalCount,
          pageIndex: res.page-1,
          pageSize: res.pageSize
        }
        this.pageEvent = temp;
      }
    })
  }

  getListDepartment(){
    const gridModel: GridModel = new GridModel();
    gridModel.pageLoading = false;
    this.userService.getListDepartment(gridModel).subscribe(res => {
      if(res){
        this.listDepartment = res.data;
        this.dataDialog.forEach(i => {
          if(i.field === 'DepartmentId'){
            i.listSelect = this.listDepartment;
          }
        })
      }
    })
  }

  getListPosition(){
    const gridModel: GridModel = new GridModel();
    gridModel.pageLoading = false;
    this.userService.getListPosition(gridModel).subscribe(res => {
      if(res){
        this.listPosition = res.data;
        this.dataDialog.forEach(i => {
          if(i.field === 'PositionId'){
            i.listSelect = this.listPosition;
          }
        })
      }
    })
  }

  handlePaginator(value: { pageIndex: number; pageSize: number }){
    console.log(value)
    this.gridModel.page = value.pageIndex-1;
    this.gridModel.pageSize = value.pageSize;
    this.getData();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFilterComponent, {
      data: this.dataDialog,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogAddComponent, {
      data: this.dataDialog,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.Avatar){
          const formImage = new FormData();
          formImage.append('Avatar', result?.Avatar);
          this.userService.uploadImage(formImage).subscribe(res => {
            if(res && res.url){
              result.Avatar = res.url;
              this.userService.createUser(result).subscribe(res => {
                this.openSnackBar(res.message)
              })
            }
          })
        } else {
          this.userService.createUser(result).subscribe(res => {
            this.openSnackBar(res.message)
          })
        }
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
        this.userService.getUser(e.id).subscribe(res => {
          console.log(res)
          const dep = this.listDepartment.find(i => i.id == res.departmentId)
          const po = this.listPosition.find(i => i.id == res.positionId)
          if(res){
            const dataDialogEdit: dialogModel[] = [
              {
                type: 'text',
                title: 'Tên:',
                field: 'FirstName',
                subTitle: 'Tên, vd: Nhật',
                required: true,
                value: res.firstName,
              },
              {
                type: 'text',
                title: 'Họ:',
                field: 'LastName',
                subTitle: 'Họ, vd: Trương',
                required: true,
                value: res.lastName,
              },
              {
                type: 'text',
                title: 'Email:',
                field: 'Email',
                subTitle: 'Email, vd: ttqnhat@email.com',
                required: true,
                value: res.email,
              },
              {
                type: 'upload',
                title: 'Avatar:',
                field: 'Avatar',
                required: false,
                value: res.avatar,
              },
              {
                type: 'text',
                title: 'Phone:',
                field: 'PhoneNumber',
                subTitle: 'vd: 098877665522',
                required: false,
                value: res.phoneNumber,
              },
              {
                type: 'select',
                title: 'Chọn Phòng Ban:',
                value: dep?.name,
                field: 'DepartmentId',
                required: false,
                listSelect: this.listDepartment
              },
              {
                type: 'select',
                title: 'Chọn Chức Vụ:',
                value: po?.name,
                field: 'PositionId',
                required: false,
                listSelect: this.listPosition
              },
            ];
            console.log(dataDialogEdit)
            const dialogRef = this.dialog.open(DialogAddComponent, {
              data: dataDialogEdit,
              width: '700px',
            });
        
            dialogRef.afterClosed().subscribe(result => {
              console.log(result);
              if(result){
                result.Id = res.id;
                if(!result.PositionId){
                  result.PositionId = res.positionId
                }
                if(!result.DepartmentId){
                  result.DepartmentId = res.departmentId
                }
                if(result.Avatar){
                  const formImage = new FormData();
                  formImage.append('Avatar', result?.Avatar);
                  this.userService.uploadImage(formImage).subscribe(res => {
                    if(res && res.url){
                      result.Avatar = res.url;
                      this.userService.updateUser(result).subscribe(res => {
                        this.getData();
                        this.openSnackBar(res.message);
                      })
                    }
                  })
                } else {
                  result.Avatar = res.avatar;
                  this.userService.updateUser(result).subscribe(res => {
                    this.getData();
                    this.openSnackBar(res.message);
                  })
                }
              }
            });
          }
        })
      } else if(e.type == 'delete'){
        const dialogRef = this.dialog.open(DialogMessageComponent, {
          data: {
            title: 'Xóa User',
            content: 'Bạn có muốn xóa user: ' + e.item.lastName + ' ' + e.item.firstName,
          },
          width: '500px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result == 'success'){
            this.userService.deleteUser(e.item.id).subscribe(res => {
              if(res){
                this.getData();
                this.openSnackBar(res.message)
              }
            })
          }
        })
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

const selectData: selectModel[] = [
  { value: 'A', viewValue: 'Phòng Ban A'},
  { value: 'B', viewValue: 'Phòng Ban B'},
  { value: 'C', viewValue: 'Phòng Ban C'},
  { value: 'D', viewValue: 'Phòng Ban D'}
]


