import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { SampleserviceService } from 'src/app/service/sampleservice.service';
import { colorid } from 'src/models/colorid.model';
import { SamplerComponent } from './game-component/sampler/sampler.component';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.css']
})
export class MastermindComponent implements OnInit {
  numberOf: number = 4;
  numberOfTry: number = 10;
  colorsTab: string[] = ["red","blue","yellow","green","black","white"];
  colorToFind: string[]= []
  next: Array<string[]> = []
  player: 'solo'|'duo' = 'solo';
  winInputs: string[] = [];
  finish: boolean = false;

  testTab: any[] = [];
  constructor(
    private route:Router,
    private data: SampleserviceService
  ) {}

  ngOnInit(): void {
    
    this.data.returnParam().subscribe(x =>{
      this.testTab.push(x)
    })
    this.colorsTab = this.colorsTab.slice(0,this.testTab[0]);
    this.numberOfTry = this.testTab[1];
    this.player = this.testTab[2];
    this.winInputs = this.data.getArraySample();
    this.initColors();
    console.log(this.colorToFind);
    
  
  }

  initColors(){
    if(this.player == 'solo'){
      for(let i = 0; i < this.numberOf;i++){
        this.colorToFind.push(this.colorsTab[Math.floor(Math.random()*this.colorsTab.length)]);
      }
    }else{
      alert("p2 set colors")
    }
  }

  getNextSample(tab: string[]){
    if(this.player === 'duo' && this.colorToFind.length == 0){
      this.colorToFind = tab;
    }else{
      const newTry: string[]= [];
      tab.forEach( (x)=> newTry.push(x));
      this.next.push(newTry)
      if(_.isEqual(newTry,this.colorToFind)){
        alert("win");
        this.finish = true;
      }else{
        this.numberOfTry--;
      }
      if(this.numberOfTry==0){
        alert("lose");
        this.finish = true;
      }

    }
    
  }
  showWin(color: colorid){
    this.winInputs[color.id] = color.color;
    this.data.updateArray(color);
    
  }
  changer(values: string[]){
    console.log("done  "+values);
    
  }

}
