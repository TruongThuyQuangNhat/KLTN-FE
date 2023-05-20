import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogModel } from 'src/app/model/dialog.model';
import { FilterModel } from '../model/gridModel';

@Component({
  selector: 'app-dialog-filter',
  templateUrl: './dialog-filter.component.html',
  styleUrls: ['./dialog-filter.component.scss']
})
export class DialogFilterComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  chooseSelect(e: any, field: string){
    this.data.forEach(i => {
      if(i.field == field){
        i.value = e.value;
        const t = i.listSelect.find((a: any) => a.id == e.value);
        if(t){
          i.textOfValue = t.name;
        } else {
          i.textOfValue = ''
        }
      }
    })
    console.log(this.data)

  }

  chooseOperator(e: any, field: string){
    this.data.forEach(i => {
      if(i.field == field){
        i.operator = e.value;
        const t = i.listOperator.find((a: any) => a.value == e.value);
        if(t){
          i.textOperator = t.text;
        } else {
          i.textOperator = ''
        }
      }
    })
    console.log(this.data)
  }

  success(){
    const arr: FilterModel[] = [];
    this.data.forEach(i => {
      const t: FilterModel = {
        filterColumns: i.field,
        filterDirections: i.operator,
        filterData: i.value
      }
      arr.push(t)
    })
    this.dialogRef.close(arr);
  }
}
