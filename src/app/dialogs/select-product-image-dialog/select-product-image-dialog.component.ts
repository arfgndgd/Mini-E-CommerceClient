import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  standalone: false,
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.css'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  @Output() options!: Partial<FileUploadOptions>; 
  // optionsı mecbur constructor içine aldım. 
  // data henüz constructor’da atanmadan önce çalıştığı için böyle yaptım

  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string
  ) {
    super(dialogRef);
    
    this.options = {
      accept: ".png, .jpeg, .jpg, .gif",
      action: "upload",
      controller: "products",
      explanation: "Ürün resmini seçin",
      isAdminPage: true,
      queryString: `id=${this.data}`
    }
  }
}

export enum SelectProductImageState {
  Close
}