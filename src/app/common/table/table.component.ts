import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { GridModel } from '../model/gridModel';
import { ResUsers } from '../model/listUserModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() data: ResUsers[] = [];
  @Input() dataTable: any[] = [];
  @Input() pageEvent: PageEvent = new PageEvent();
  // @Input("paginatorinput") set setpagi(paginatorinput: {
  //   page: number;
  //   pageSize: number;
  //   totalCount: number;
  // }) {
  //   this.pageEvent.length = paginatorinput.totalCount;
  //   this.pageEvent.pageIndex = paginatorinput.page;
  //   this.pageEvent.pageSize = paginatorinput.pageSize;
  // }
  dataSource = new MatTableDataSource<ResUsers>(this.data);
  @Output() paginator = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();

  ngOnChanges(changes: SimpleChanges): void {
    if("data" in changes){
      this.dataSource = new MatTableDataSource<ResUsers>(this.data);
    }
    if("pageEvent" in changes){
      this.pageEvent.pageIndex;
    }
  }

  ngOnInit(): void {
  }

  handlepaginator(value: PageEvent) {
    this.paginator.emit({
      pageIndex: value.pageIndex + 1,
      pageSize: value.pageSize,
    });
  }

  viewDetail(id: string){
    console.log(id)
  }
  editItem(id: string){
    console.log(id)
  }
  deleteItem(id: string){
    console.log(id)
  }
}