import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { Create_Product } from '../../../../contracts/create_product';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent extends BaseComponent implements OnInit{

  constructor(spiner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
    
  }
  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
    if (!name.value) {
      this.alertify.message("Lütfen ürün adını giriniz",
        {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        }
      )
      return;
    }
    if (parseInt(stock.value) < 0) {
      this.alertify.message("Lütfen stok bilgisini giriniz",
        {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        }
      )
      return;
    }
    if (parseFloat(price.value) < 0) {
      this.alertify.message("Lütfen fiyat bilgisini giriniz",
        {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        }
      )
      return;
    }
    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.", {
        dissmissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_product);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dissmissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        }
      )
    });
  }
}
