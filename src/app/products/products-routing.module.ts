import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'events', component: EventsPageComponent },
      { path: 'details/:id', component: DetailsPageComponent },
      { path: '**', redirectTo: 'events' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
