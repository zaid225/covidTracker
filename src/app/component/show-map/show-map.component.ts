import { Component, OnInit } from '@angular/core';
import {MapChart} from 'angular-highcharts'
import {forkJoin,of} from 'rxjs'
import {catchError,delay} from 'rxjs/operators'
let highcharts=require('highcharts/highmaps.js'),map=require('@highcharts/map-collection/custom/world.geo.json');
//import { map}from '@highcharts/map-collection';
//let maps=highcharts.geojson(Highcharts.maps['custom/world']);
import {DataServiceService} from '../../services/data-service.service';
import { GlobalDatasummary } from '../../models/global-data';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule,FormArray,FormGroup,FormBuilder} from '@angular/forms';
import { arrayMax } from 'highcharts';
import * as Highcharts from 'highcharts';



@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css']
})

export class ShowMapComponent implements OnInit {
globalData:[]=[];
 //ChartData:GlobalDatasummary[];
 ChartData:any[]=[];
totalCase=0;
totalConfirm=0;
totalTest=0;
totalDeath=0;
totalPopulation=0;
totalPositiveRate=0;
toralDeath_per=0;
totalCase_per=0;
totalLife=0;
mapChart;
isLoading=false;
data:GlobalDatasummary[];
mapData:any[]=[];
country;

mapForm:FormGroup;
data1:any[]=[];
  constructor(private dataService:DataServiceService,private http:HttpClient,) { }

  ngOnInit() {
/*this.dataService.getGlobalData().subscribe(data=>{
  this.globalData.push({
    country:data['data'][0].country,

  })
})
*/
    map.features.forEach(element => {

  this.http.get(this.dataService.globalDataUrl +element.id).pipe(catchError(error=> of(error)))
    })



this.dataService.getGlobalData().subscribe({
  next:result=>{
    result.forEach(cs=>{
      if(!Number.isNaN(cs.confirmed)){

        this.totalDeath+=cs.totalDeaths
        this.totalCase+=cs.totalcases;
        this.totalConfirm+=cs.confirmed;
        this.totalTest+=cs.total_test;
        this.totalPopulation+=cs.population;
        this.totalPositiveRate+=cs.positive_rate;
        this.totalLife+=cs.life_expectency;
        this.toralDeath_per+=cs.totalDeaths_per;
        this.totalCase_per+=cs.total_case_per;
        this.country=cs.country;
      //  console.log(this.totalDeath);
        //console.log(this.totalCase)
       // this.ChartData=result;
this.ChartData.push( {
  totalcases:this.totalCase,
  totalDeaths:this.totalDeath,
  total_test:this.totalTest,
  confirmed:this.totalConfirm,
  population:this.totalPopulation,
  positive_rate:this.totalPositiveRate,
  life_expectency:this.totalLife,
  totalDeaths_per:this.toralDeath_per,
  total_case_per:this.totalCase_per,
  country:this.country


});


//console.log(this.ChartData)
        }

    })

    this.preparteChat();
  }
})
this.dataService.getGlobalData().subscribe(result=>{
  this.data=result;
  this.data.forEach(cs=>{
   //console.log(cs.country);
   if(cs.country==cs.country){
     if(cs.totalcases){
    map.features.forEach((country,i)=>{
      console.log(country);
      if(cs.totalcases){
        country.color='blue'
      }
    })
     }

   }
  })
/*  this.data.forEach(cs=>{
    this.mapData.push(cs.confirmed,cs.country,cs.deaths,cs.totalDeaths,cs.positive_rate,cs.life_expectency,cs.total_test)
  })*/
})
forkJoin(this.mapData).subscribe(result=>{
  result.forEach(data=>{

  })
})

}

  preparteChat(){
    this.mapChart=new MapChart({
      chart:{
        borderWidth:0,
        backgroundColor:{
          linearGradient:{
            x1: 0,
            y1:0,
            x2:0,
            y2:1,

          },
          stops:[
            [0,"#4a0000"],
            [1,"#000000"]
          ]
        },
        height:(9/16) * 100-15 + "%",
        map:map,



      },
      title:{
        text:"COVID-19",
        style:{
          color:"white",
          fontWeight:"bold",
          fontSize:"2em",
          opacity:0.8
        }
      },
      subtitle:{
        text:"to see Cases And Recovery",
        style:{
          color:"white",
          fontSize:"1em",
          opacity:0.8
        }
      },
      mapNavigation:{
        enabled:true,
        buttonOptions:{
          verticalAlign:"top"
        }

      },
      colors:['red','orange','yellow','green'],
      colorAxis:{


       dataClasses:[
          {
            from:1000,
            to:10000,
            color:"#FBEFEF"
          },{
            from:1000000,
            to:1000000,
            color:"#FA5858"
          },{
            from:3000000,
            to:6000000,
            color:"#500000"
          },{
            from:3556722783,
            to:300000000,
            color:"#880000"
          },{
            from:55218816,
            to:200000000,
            color:"#b10000"
          },
          {
            from:20001,
            to:50000,
            color:"#FE2E2E"
          },{
            from:50001,
            color:"#ff0000"
          }
        ]
      },



series:[
{
  type:undefined,
  title:"covid",
  animation:{
    duration:2000,
  },
  enableMouseTracking:true,
  borderColor:"#FFDFF0",
  joinBy:["isoa3","country"],
  data:[this.ChartData],



  dataLabels:{
    enabled:true,
    format:"{point.country}"
  },
  minSize:4,
  maxSize:"40%",

  tooltip:{

    headerFormat:"",
    pointFormat:`<b>
    {point.country}</b><br/> totalCases:{totalCase}
    <br/>TotalCases:{point.totalcases}
    <br/>Confirmed:{totalConfirm}
    <br/>TotalDeath:{point.totalDeaths}
    <br/>RecoveredFactor:{point.life_expectency}
    <br/>TotalTest:{point.total_test}
    <br/>PositiveRate:{point.positive_rate}
    <br/>population :{point.population}

     `
  }
}
]

    })
     }

    }
