import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
      alert("başarılı");
    },(errorResponse: HttpErrorResponse) => { //client hata mesajı
      const _error: Array<{key: string, value: Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, index) => {
          message += `${_v}<br>`
        })
      });
      errorCallBack(message);
    });
  }

  async get(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) : Promise<{totalCount: number; products: List_Product[]}> {
    const promiseData : Promise<{totalCount: number; products: List_Product[]}> = this.httpClientService.get<{totalCount: number; products: List_Product[]}>(
    {
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack()) // d => gelecek olan veriyle ilgili bir parametre veriyi de dönüyor olabilir
    .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getProductImages",
      controller: "products"
    }, id);
    debugger;
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    console.log(images);
    if (successCallBack) successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteProductImage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id);
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
