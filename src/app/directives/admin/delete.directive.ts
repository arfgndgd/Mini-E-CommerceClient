import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: false
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer:  Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { 
    const img = _renderer.createElement("img");
    img.setAttribute("src", "images/trashicon.png");
    img.setAttribute("style", "cursor: pointer;");
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.spinner.show(SpinnerType.BallAtom);
    const td: HTMLTableCellElement = this.element.nativeElement;
    console.log(td)
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(1000, () => {
      this.callBack.emit();
    });
  }
}
