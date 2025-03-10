import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(private toastrService: CustomToastrService) {
    // toastrService.message("Merhaba", "Arif", {messageType: ToastrMessageType.Error, position: ToastrPosition.BottomCenter});
    // toastrService.message("Merhaba", "Arif", {messageType: ToastrMessageType.Info, position: ToastrPosition.BottomLeft});
    // toastrService.message("Merhaba", "Arif", {messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight});
    // toastrService.message("Merhaba", "Arif", {messageType: ToastrMessageType.Warning, position: ToastrPosition.TopLeft});

  }

}
