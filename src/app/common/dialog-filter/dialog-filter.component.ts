import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogModel } from 'src/app/model/dialog.model';

@Component({
  selector: 'app-dialog-filter',
  templateUrl: './dialog-filter.component.html',
  styleUrls: ['./dialog-filter.component.scss']
})
export class DialogFilterComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogModel[],
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
