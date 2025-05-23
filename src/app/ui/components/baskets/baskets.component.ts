import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.css'
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallScaleMultiple);
  }
}
