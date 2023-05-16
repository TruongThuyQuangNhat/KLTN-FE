import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogFilterComponent } from '../dialog-filter/dialog-filter.component';
import { dialogModel } from 'src/app/model/dialog.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  reader!: FileReader;
  imageProduct: string;
  myForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogModel[],
  ) {}
  
  ngOnInit(): void {
    let data: any = {};
    this.data.forEach(i => {
      if(i.required){
        data[i.field] = new FormControl("", Validators.required);
      } else {
        data[i.field] = new FormControl();
      }
    })
    data.fileSource = new FormControl();
    this.myForm = new FormGroup(data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    const res: any = {};
    let check: boolean = true;
    this.data.forEach(i => {
      let fileSource: any;
      if(i.field === 'Avatar'){
        fileSource = this.myForm.get("fileSource");
      } else {
        fileSource = this.myForm.get(i.field);
      }
      res[i.field] = fileSource?.value;
      if(i.required){
        if(!fileSource?.value){
          check = false
        }
      }
    })
    console.log(res)
    console.log(check)
    if(check){
      this.dialogRef.close(res);
    }
  }

  onFileSelected(event: Event) {
    this.reader = new FileReader();

    const element = event.target as HTMLInputElement;
    if (element.files) {
      const file = element.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });
    }
    const source = this.myForm.get("fileSource");
    if (source) {
      this.reader.readAsDataURL(source.value);
    }
    this.reader.onload = this.readSuccess;
  }

  readSuccess = () => {
    if (this.reader.result) {
      this.imageProduct = this.reader.result.toString();
    }
  };
}
