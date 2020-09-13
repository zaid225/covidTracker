import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { CountriesComponent } from './component/countries/countries.component';

import {ShowMapComponent} from './component/show-map/show-map.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'countries',component:CountriesComponent
  },
  {
    path:'show-map',component:ShowMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
