import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { CountriesComponent } from './component/countries/countries.component';
import {HttpClientModule}from '@angular/common/http';
import highmaps from 'highcharts/modules/map.src';
import {HIGHCHARTS_MODULES,ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ShowMapComponent } from './component/show-map/show-map.component';
import {MatCardModule,MatFormFieldModule,MatSelectModule} from '@angular/material';
import {ReactiveFormsModule,FormArray,FormGroup,FormBuilder} from '@angular/forms';
import { DasboardComponent } from './component/dasboard/dasboard.component';
import { Map2Component } from './component/map2/map2.component';
import { AfterViewInit, Component, TemplateRef, ViewChild } from "@angular/core";
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';



export function highchartsmodules(){
  return [highmaps];
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CountriesComponent,
    ShowMapComponent,
    DasboardComponent,
    Map2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,

    ChartModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng2GoogleChartsModule


  ],
  providers: [{provide:HIGHCHARTS_MODULES,useFactory:highchartsmodules}],
  bootstrap: [AppComponent]
})
export class AppModule { }
