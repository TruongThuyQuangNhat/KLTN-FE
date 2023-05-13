import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogFilterComponent } from '../dialog-filter/dialog-filter.component';
import { dialogModel } from 'src/app/model/dialog.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent {
  reader!: FileReader;
  imageProduct: string;
  myForm = new FormGroup({
    fileSource: new FormControl(),
    fileControl: new FormControl(),
  });
  constructor(
    public dialogRef: MatDialogRef<DialogFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogModel[],
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    const formData = new FormData();
    const fileSource = this.myForm.get("fileSource");
    if (fileSource?.value != null){
      formData.append("avatar", fileSource.value);
      this.dialogRef.close(formData);
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
