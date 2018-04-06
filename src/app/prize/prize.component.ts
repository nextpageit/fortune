import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PrizeService } from './prize.service';
import { Prize } from './prize';

import { LogService } from './log.service';
@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./css/layout.css']
})
export class PrizeComponent implements OnInit {
  prizeExceeded: string;
  isEdit: boolean;
  uniprize: any;
  logs: any;
  prizeLogs: boolean = false;
  prizes: Prize[] = [];
  totalPrize: number;
  @Input() editPrizeEvent;
  constructor(
    private _prizeService: PrizeService,
    private _logService: LogService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.getPrizesByBrand(params['brand_name']));

  }

  ngOnInit() {
    // this.getPrizes();
   
  }
  onEdit(prize) {
    this.uniprize = prize;
    this.isEdit = !this.isEdit;
  }
  getPrizes() {
    this._prizeService.getPrizes()
      .then(prizes => this.prizes = prizes)
      .catch(err => console.log(err));
  }

  getPrizesByBrand(brand) {
    let that = this;
    this._prizeService.getPrizesByBrand(brand)
      .then(prizes => this.prizes = prizes
      ).then(prizes =>
        that.totalPrize = prizes.reduce(function (sum, prize) {
          return sum + parseFloat(prize.prize_probability);
        }, 0)
      )
      .catch(err => console.log(err));
  }

  getLogs(prize_id) {
    this.prizeLogs = true;
    this._logService.getLogs(prize_id)
      .then(prizes => this.logs = prizes)
      .catch(err => console.log(err));
  }
  close() {
    this.prizeLogs = false;
  }
  create(prize: Prize) {

    let total = this.totalPrize + prize.prize_probability;
    if (total > 1) {
      this._prizeService.isExceed = true;
      this.prizeExceeded = 'Total prize should be less than or equal to 1 . Total is: ' + total;
      return;
    }
    this._prizeService.isExceed = false;
    this._prizeService.create(prize)
      .then(status => this.getPrizesByBrand(prize.brand_name))
      .catch(err => console.log(err));
  }

  destroy(prize: Prize) {
    this._prizeService.destroy(prize)
      .then(status => this.getPrizesByBrand(prize.brand_name))
      .catch(err => console.log(err));
  }

  amount(item) {
    return item.prize_probability;
  }

  sum(prev, next) {
    return prev + next;
  }


  update(prize: Prize) {
    const toDelete = new Set([prize.prize_value]);
    const newArray = this.prizes.filter(obj => !toDelete.has(obj.prize_value));
    let totalPrize;
    if(newArray.length>0){
     totalPrize = newArray.map(this.amount).reduce(this.sum);
    }else{
     totalPrize = 0;
    }
    let total = parseFloat(totalPrize) + prize.prize_probability;
    if (total > 1) {
      this._prizeService.isExceed = true;
      this.prizeExceeded = 'Total prize should be less than or equal to 1 . Total is: ' + total;
      return;
    }
    this._prizeService.isExceed = false;
    this._prizeService.update(prize)
      .then(status => this.getPrizesByBrand(prize.brand_name))
      .catch(err => console.log(err));
  }

}
