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
import { FilterModel, GridModel } from 'src/app/common/model/gridModel';
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
      type: "fullName",
      main: true,
    },
    {
      field: "departmentName",
      text: "Phòng Ban",
      type: "text",
    },
    {
      field: "email",
      text: "Email",
      type: "text",
    },
    {
      field: "positionName",
      text: "Chức Vụ",
      type: "text",
    },
    {
      field: "avatar",
      text: "Hình ảnh",
      type: "avatar",
    },
    {
      field: "roles",
      text: "Quyền",
      type: "text",
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
      value: '',
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

  idDepartment: string = '';
  textDepartment: string = '';
  idPosition: string = '';
  textPosition: string = '';
  dataFilterDepartment: FilterModel = new FilterModel();
  dataFilterPosition: FilterModel = new FilterModel();

  dataFilterDialog: any[] = [
    {
      title: "Phòng Ban",
      field: 'Department',
      description: 'Chọn User có Phòng Ban',
      value: '',
      textOfValue: '',
      listSelect: [],
      operator: '',
      textOperator: '',
      listOperator: [
        {
          text: 'Bằng Với',
          value: '='
        },
        {
          text: 'Khác Với',
          value: '!='
        },
      ]
    },
    {
      title: "Chức Vụ",
      field: 'Position',
      description: 'Chọn User có Chức Vụ',
      value: '',
      textOfValue: '',
      listSelect: [],
      operator: '',
      textOperator: '',
      listOperator: [
        {
          text: 'Bằng Với',
          value: '='
        },
        {
          text: 'Khác Với',
          value: '!='
        },
      ]
    },
    {
      title: "Sắp xếp theo Họ Tên",
      field: 'OrderBy',
      description: 'User được sắp xếp theo',
      value: '',
      textOfValue: '',
      listSelect: [
        {
          id: 'FirstName',
          name: 'Tên'
        },
        {
          id: 'LastName',
          name: 'Họ'
        },
      ],
      operator: '',
      textOperator: '',
      listOperator: [
        {
          text: 'A-Z',
          value: 'asc'
        },
        {
          text: 'Z-A',
          value: 'desc'
        },
      ]
    }
  ];

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
      this.gridModel.listFilter.forEach(i => {
        if(i.filterColumns == 'Position'){
          this.idPosition = i.filterData
        }
        if(i.filterColumns == 'Department'){
          this.idDepartment = i.filterData
        }
      })
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
        this.dataFilterDialog.forEach(i => {
          if(i.field === 'Department'){
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
        });
        this.dataFilterDialog.forEach(i => {
          if(i.field === 'Position'){
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


  openDialogFilter(): void {
    if(this.idDepartment || this.idPosition){
      this.dataFilterDialog.forEach(i => {
        if(i.field !== 'OrderBy'){
          if(i.field == 'Position'){
            i.value = this.idPosition?this.idPosition:'';
            i.textOfValue = this.idPosition?this.textPosition:'';
            i.operator = this.idPosition?'=':'';
            i.textOperator = this.idPosition?'Bằng Với':'';
          } else if(i.field == 'Department'){
            i.value = this.idDepartment?this.idDepartment:'';
            i.textOfValue = this.idDepartment?this.textDepartment:'';
            i.operator = this.idDepartment?'=':'';
            i.textOperator = this.idDepartment?'Bằng Với':'';
          }
        }
      })
    }
    const dialogRef = this.dialog.open(DialogFilterComponent, {
      data: this.dataFilterDialog,
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.length != 0){
        this.gridModel.listFilter = [];
        this.idDepartment = '';
        this.idPosition = '';
        result?.forEach((i: any) => {
          if(i.filterColumns !== 'OrderBy'){
            if(i.filterColumns && i.filterDirections && i.filterData){
              this.gridModel.listFilter.push(i);
              if(i.filterDirections == '='){
                if(i.filterColumns == "Department"){
                  this.idDepartment = i.filterData
                } else if(i.filterColumns == "Position"){
                  this.idPosition = i.filterData
                }
              }
            }
          } else {
            if(i.filterColumns && i.filterDirections && i.filterData){
              this.gridModel.srtColumns = i.filterData,
              this.gridModel.srtDirections = i.filterDirections
            }
          }
        });
        this.gridModel.page = 0;
        this.getData()
      }
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
                console.log(res)
                this.openSnackBar(res.message)
              })
            }
          })
        } else {
          this.userService.createUser(result).subscribe(res => {
            console.log(res)
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

  chooseDepartment(id: any){
    this.gridModel.listFilter = this.gridModel.listFilter.filter(i => i.filterColumns !== 'Department')
    if(id.value){
      this.idDepartment = id.value;
      this.listDepartment.forEach(i => {
        if(i.id == id.value){
          this.textDepartment = i.name;
        }
      })
      this.dataFilterDepartment.filterData = this.idDepartment;
      this.dataFilterDepartment.filterDirections = '=';
      this.dataFilterDepartment.filterColumns = 'Department';
      this.gridModel.listFilter.push(this.dataFilterDepartment)
    } else {
      this.idDepartment = '';
    }
    this.gridModel.page = 0;
    this.getData();
  }

  choosePosition(id: any){
    this.gridModel.listFilter = this.gridModel.listFilter.filter(i => i.filterColumns !== 'Position')
    if(id.value){
      this.idPosition = id.value;
      this.listPosition.forEach(i => {
        if(i.id == id.value){
          this.textPosition = i.name;
        }
      })
      this.dataFilterPosition.filterData = this.idPosition;
      this.dataFilterPosition.filterDirections = '=';
      this.dataFilterPosition.filterColumns = 'Position';
      this.gridModel.listFilter.push(this.dataFilterPosition)
    } else {
      this.idPosition = '';
    }
    this.gridModel.page = 0;
    this.getData();
  }
}


