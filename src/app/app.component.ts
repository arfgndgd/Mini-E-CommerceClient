import { Component, OnInit } from '@angular/core';
// declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ECommerceClient';

  ngOnInit(): void {
    // $.get("https://localhost:7005/api/products", (data) => {
    //   console.log('API Response:', data);
    // }).fail((error) => {
    //   console.error('API Error:', error);
    // });
  }
}


