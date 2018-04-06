import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-prize-new',
  templateUrl: './prize-new.component.html',
  styleUrls: ['../css/layout.css']
})
export class PrizeNewComponent implements OnInit {
  isPrizeExceded: boolean;
  newform: FormGroup;
  @Input() prize: Prize;
  @Input() isedit;
  @Input() prizeExceeded;
  @Output() createNewPrizeEvent = new EventEmitter();
  @Output() updatePrizeEvent = new EventEmitter();
  types = ['freeplay', 'spins', 'cash'];
  brands = ['youwager', 'betpop', 'brand3', 'brand4'];
  newPrize = new Prize;
  editPrize: Prize = new Prize;
  createnew: string = "Create New Prize";
  updatenew: string = "Update Prize";
  edit: string = "Update";
  add: string = "Add New Prize";

  constructor(private router: Router, private _prizeService: PrizeService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    Object.assign(this.editPrize, this.prize);
    this.newform = new FormGroup({
      _id: new FormControl(this.editPrize._id),
      prize_value: new FormControl(this.editPrize.prize_value),
      prize_type: new FormControl(this.editPrize.prize_type),
      prize_probability: new FormControl(this.editPrize.prize_probability),
      prize_spots: new FormControl(this.editPrize.prize_spots),
      brand_name: new FormControl(this.editPrize.brand_name)
    });
  }
  
  ngDoCheck(){
    this.isPrizeExceded = this._prizeService.isExceed;
  }
  create() {
    this.newform.value['brand_name'] = this.activatedRoute.snapshot.url[1].path;
    this.createNewPrizeEvent.emit(this.newform.value);
    this.newPrize = new Prize();
    if (!this._prizeService.isExceed) {
      this.newform.reset();
    }
  }

  update() {
    this.editPrize.editable = false;
    this.updatePrizeEvent.emit(this.newform.value);
    if (!this._prizeService.isExceed) {
      this.newform.reset();
    }
  }
}
