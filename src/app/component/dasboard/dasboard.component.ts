import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  @Input('totalConfirm')
  totalConfirm;
  @Input('totalCase')
  totalCase;
  constructor() { }
  @Input('totalDeaths')
  totalDeaths;
 
 
  @Input('totalLife')
  totalLife;
  @Input('totalPositiveRate')
  totalPositiveRate;
  @Input('totalTest')
  totalTest;
  @Input('toralDeath_per')
  toralDeath_per
  
  ngOnInit() {
  }

}
