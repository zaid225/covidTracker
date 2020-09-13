import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map}from 'rxjs/operators';
import {GlobalDatasummary} from '../models/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
globalDataUrl="../../assets/data/owid-covid-data (1).csv"
  constructor(private http:HttpClient) { }
  getGlobalData(){
    return this.http.get(this.globalDataUrl,{responseType:'text'}).pipe(
      map(result=>{
        let rows=result.split('\n');
        let raw={};
        rows.splice(0,1);
        let data:GlobalDatasummary[]=[];
        rows.forEach(row=>{
          let cols=row.split(/,(?=\S)/);
          let cs={
            country:cols[2],
          totalcases: +cols[4],
          confirmed: +cols[5],
          deaths: +cols[8],
          totalDeaths:+cols[7],
          positive_rate:+cols[23],
          life_expectency:+cols[39],
          test: +cols[16],
         date: cols[3],
         total_test: +cols[17],
        population: +cols[26],
        totalDeaths_per: +cols[18],
        total_case_per: +cols[10],


          };
         /* data.push({
            country:cols[2],
          totalcases: +cols[4],
          confirmed: +cols[5],
          deaths: +cols[8],
          totalDeaths:+cols[7],
          positive_rate:+cols[23],
          life_expectency:+cols[39],
          test: +cols[16],
         date: cols[3],
         total_test: +cols[17],
        population: +cols[26],
        totalDeaths_per: +cols[18],
        total_case_per: +cols[10],

          })*/
          let temp:GlobalDatasummary=raw[cs.country];
          if(temp){
temp.confirmed=cs.confirmed+temp.confirmed;
temp.deaths=cs.deaths+temp.deaths;
temp.totalcases=cs.totalcases+temp.totalcases;
temp.totalDeaths=cs.totalDeaths+temp.totalDeaths;
temp.positive_rate=cs.positive_rate+temp.positive_rate;
temp.life_expectency=cs.life_expectency+temp.life_expectency;
temp.test=cs.test+temp.test;
temp.date=cs.date+temp.date;
temp.total_test=cs.total_test+temp.total_test;
temp.population=cs.population+temp.population;
temp.totalDeaths_per=cs.totalDeaths_per+temp.totalDeaths_per;
temp.total_case_per=cs.total_case_per+temp.total_case_per;
raw[cs.country]=temp;
          }
          else{
            raw[cs.country]=cs;
          }


        })

  return <GlobalDatasummary[]>Object.values(raw);
      })
    )
  }
}
