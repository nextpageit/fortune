import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Prize } from '../prize';

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['../css/layout.css']
})
export class PrizeListComponent implements OnInit {
  @Input() prizes;
  @Output() destroyPrizeEvent = new EventEmitter();
  @Output() updatePrizeEvent = new EventEmitter();
  @Output() getLogEvent = new EventEmitter();
  @Output() editPrizeEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
   
  }
  
  onEdit(prize){
    this.editPrizeEvent.emit(prize);
  }
  logs(prize_id){
     this.getLogEvent.emit(prize_id);
  }
  destroy(prize: Prize){
    const response = confirm('delete?')
    if(response) {
      this.destroyPrizeEvent.emit(prize);      
    }
  }

  update(prize: Prize) {
    this.updatePrizeEvent.emit(prize);
  }
}
