import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ShoppingCartComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
