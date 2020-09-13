import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../services/data-service.service'
import {GlobalDatasummary} from '../../models/global-data'
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
data:GlobalDatasummary[];
countries:string[]=[];
totalCase=0;
totalConfirm=0;
totalTest=0;
totalDeath=0;
totalPopulation=0;
totalPositiveRate=0;
toralDeath_per=0;
totalCase_per=0;
totalLife=0;
date:string;
  constructor(private service:DataServiceService) { }


  ngOnInit() {
    this.service.getGlobalData().subscribe(result=>{
      this.data=result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country);

      })
    })
  }
  updateValues(country :string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalCase=cs.totalcases;
        this.totalDeath=cs.deaths;
        this.totalConfirm=cs.confirmed;
        this.totalTest=cs.total_test;
        this.totalPositiveRate=cs.positive_rate;
        this.toralDeath_per=cs.totalDeaths_per;
        this.totalLife=cs.life_expectency;
        this.date=cs.date;

      }
    })
  }

}
