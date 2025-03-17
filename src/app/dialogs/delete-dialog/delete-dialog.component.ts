import { Component, Inject, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: false,
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent>{
  // readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  constructor (
    dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState
  ) {
    super(dialogRef)
  }
  // readonly data = inject<DeleteState>(MAT_DIALOG_DATA);

}

export enum DeleteState {
  Yes,
  No
}
