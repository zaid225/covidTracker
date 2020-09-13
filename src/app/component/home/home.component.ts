import { Component, OnInit } from '@angular/core';
import { GlobalDatasummary } from '../../models/global-data';
import {DataServiceService}from '../../services/data-service.service';
//import {GlobalDatasummary}from '../../models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService:DataServiceService) { }
totalCase=0;
totalConfirm=0;
totalTest=0;
totalDeath=0;
totalPopulation=0;
totalPositiveRate=0;
toralDeath_per=0;
totalCase_per=0;
totalLife=0;
country:string;
pieChart:GoogleChartInterface={
  chartType:'PieChart'
};
columnChart:GoogleChartInterface={
  chartType:'ColumnChart'
}
GeoChart:GoogleChartInterface={
  chartType:'GeoChart'
};
population;
cases;
globalData:GlobalDatasummary[];
/*map(){
  let dataTables=[];
  dataTables.push(["Country","Cases"])
  this.globalData.forEach(cs=>{

    dataTables.push([
      cs.country,cs.totalcases
    ])

  })



}*/
initChart(caseType:string){
  let dataTable:any[]=[];

  dataTable.push(["Country","cases"])
  this.globalData.forEach(cs=>{
    let value:number;
/*this.country=cs.country
this.cases=cs.totalcases
this.population=cs.population*/
if(caseType=='c'){
  value=cs.confirmed
  dataTable.push([
    cs.country,value
  ])
}
if(caseType=='tc'){
  value=cs.totalcases
  dataTable.push([
    cs.country,value
  ])
}

if(caseType=='pr'){
  value=cs.positive_rate
  dataTable.push([
    cs.country,value
  ])
}
 

if(caseType=='td')
  value=cs.totalDeaths_per
  if(caseType=='p'){
    value=cs.population
    dataTable.push([
      cs.country,value
    ])
  }
 

   /* dataTable.push([
      cs.country,value
    ])*/

  })
  this.pieChart={
    chartType:'PieChart',
    dataTable:dataTable,
    options:{height:500}
  }
  this.columnChart={
    chartType:'ColumnChart',
    dataTable:dataTable,
    options:{height:500}
  }
  this.GeoChart={
    chartType:'GeoChart',
    dataTable:dataTable,
    options:{height:500,showTip:true, colorAxis: {colors: ['#00F919', '#0FFFE4', '#1FA20F','blue','green']}, backgroundColor: '#00000', resolution:'world',
    datalessRegionColor: 'skyblue',  defaultColor: 'green',displayMode:'text',region:'world',dataMode:'markers',colors:[0xFF8747, 0xFFB581, 0xc06000]}}
  

}
  ngOnInit() {
    this.dataService.getGlobalData().subscribe({
      next:result=>{
        this.globalData=result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
          this.totalCase+=cs.totalcases;
          this.totalConfirm+=cs.confirmed;
          this.totalTest+=cs.total_test;
          this.totalPopulation+=cs.population;
          this.totalPositiveRate+=cs.positive_rate;
          this.totalLife+=cs.life_expectency;
          this.toralDeath_per+=cs.totalDeaths_per;
          this.totalCase_per+=cs.total_case_per;
          }
        })
        this.initChart('c');
       // this.map();
        console.log(result);
      }
    })
  }
updateChart(input:HTMLInputElement){
  this.initChart(input.value)
console.log(input.value)
}
}
