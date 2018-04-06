import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Prize } from './prize';

import "rxjs";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class PrizeService {
   public isExceed:boolean = false;
  constructor(
    private _http:Http
  ) { }

  create(prize: Prize) {
      return this._http.post(environment.apiUrl + '/prizes/', prize)
      .map(data => data.json()).toPromise()
  }

  destroy(prize: Prize) {
    return this._http.delete(environment.apiUrl+'/prizes/' + prize._id)
    .map(data => data.json()).toPromise()
  }

  update(prize: Prize) {
    return this._http.put(environment.apiUrl+'/prizes/' + prize._id, prize)
    .map(data => data.json()).toPromise()
  }

  getPrizes() {
    return this._http.get(environment.apiUrl+'/prizes')
    .map(data => data.json()).toPromise()
  }

  getPrizesByBrand(brand) {
      return this._http.get(environment.apiUrl+'/prizes/'+brand)
          .map(data => data.json()).toPromise()
  }

  getPrize(prize: Prize) {
    return this._http.get(environment.apiUrl+'/prizes/' + prize._id)
    .map(data => data.json()).toPromise()
  }
  
}
