import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Prize } from './prize';
import { environment } from '../../environments/environment';

import "rxjs";
import { Observable } from 'rxjs';

@Injectable()
export class LogService {

    constructor(
        private _http: Http
    ) { }

    create(log: Prize) {
        return this._http.post(environment.apiUrl+'/logs', log)
            .map(data => data.json()).toPromise()
    }

    getLogs(prize_id) {
        // return this._http.get(environment.apiUrl+'/logs')
        //     .map(data => data.json()).toPromise()
        return this._http.get(environment.apiUrl+'/prizelogs/'+ prize_id)
            .map(data => data.json()).toPromise()
    }

    getLog(log: Prize) {
        return this._http.get(environment.apiUrl+'/logs/' + log._id)
            .map(data => data.json()).toPromise()
    }

}
