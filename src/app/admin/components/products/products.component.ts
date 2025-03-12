import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallScaleMultiple);

    this.httpClientService.get<Create_Product>({
      controller : "products"
    }).subscribe((data) => {console.log(data)});

    // this.httpClientService.post({
    //   controller : "products"
    // }, {
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();


    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "0e480e54-4c98-46f5-bc3a-709e76c1809e",
    //   name: "Pergel",
    //   price: 50,
    //   stock: 100
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // }, "0e480e54-4c98-46f5-bc3a-709e76c1809e").subscribe();

  }
}
