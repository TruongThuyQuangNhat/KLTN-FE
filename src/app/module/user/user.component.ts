import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogFilterComponent } from 'src/app/common/dialog-filter/dialog-filter.component';
import { dialogModel } from 'src/app/model/dialog.model';
import { selectModel } from 'src/app/model/select.model';
import { UserService } from './user.service';
import { GridModel } from 'src/app/common/model/gridModel';
import { ResUsers } from 'src/app/common/model/listUserModel';
import { DialogAddComponent } from 'src/app/common/dialog-add/dialog-add.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data: ResUsers[] = [];
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
  pageEvent: PageEvent = new PageEvent()
  gridModel: GridModel = new GridModel();
  dataDialog: dialogModel[] = [
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
  ]
  dataSelect = selectData;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.gridModel.page = 0;
    this.gridModel.pageLoading = true;
    this.gridModel.pageSize = 3;
    this.pageEvent.pageIndex = this.gridModel.page;
    this.pageEvent.pageSize = this.gridModel.pageSize
    this.getData()
  }

  getData(){
    this.userService.getUsers(this.gridModel).subscribe((res: any) => {
      if(res){
        this.data = res.data;
        this.pageEvent.length = res.totalCount;
        console.log(res)
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
        this.userService.uploadImage(result).subscribe(res => {
          console.log(res)
        })
      }
    });
  }
}

const selectData: selectModel[] = [
  { value: 'A', viewValue: 'Phòng Ban A'},
  { value: 'B', viewValue: 'Phòng Ban B'},
  { value: 'C', viewValue: 'Phòng Ban C'},
  { value: 'D', viewValue: 'Phòng Ban D'}
]


