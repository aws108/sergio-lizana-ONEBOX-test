import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventsPageComponent,
    DetailsPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    EventsPageComponent,
    DetailsPageComponent,
  ]
})
export class ProductsModule { }
