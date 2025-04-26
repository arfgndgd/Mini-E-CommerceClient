import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  { path: "admin", component: LayoutComponent, children: [
    // buradaki loadChildren yapısı lazy loadingi sağlar
    { path: "", component: DashboardComponent }, //admin sayfası olduğu için direkt component üzerinden gidilir
    { path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then( module => module.CustomersModule)},
    { path: "products", loadChildren: () => import("./admin/components/products/products.module").then( module => module.ProductsModule)},
    { path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then( module => module.OrdersModule)}
  ]},
  { path: "", component: HomeComponent}, //anasayfa için direkt component verilir
  { path: "basket", loadChildren : ()=> import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  { path: "register", loadChildren : ()=> import("./ui/components/register/register.module").then(module => module.RegisterModule)},
  { path: "login", loadChildren : ()=> import("./ui/components/login/login.module").then(module => module.LoginModule)},
  { path: "products", loadChildren : ()=> import("./ui/components/products/products.module").then(module => module.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
