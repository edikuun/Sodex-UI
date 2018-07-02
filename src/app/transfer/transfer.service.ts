import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { TransferData } from '../model/model.transferdata';

@Injectable()
export class TransferService {
    constructor(
        private router: Router,
        private http: Http,
    ) { }

    getBalance(id: number, balanceField: HTMLInputElement) {
        // let account = AccountDetails;
        const urls = 'http://api.sodex.io/api/Ledger/GetBalance?cardNumber=' + id;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        this.http.get(urls).subscribe(
            response => {
                balanceField.value = parseInt(response.text(), 10).toString();
                // console.log(response);
            }
        );
    }

    transfer(transData: TransferData, modalCont: HTMLInputElement) {
        const url = 'http://api.sodex.io/api/Ledger/Transfer';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/plain');
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Access-Control-Allow-Origin', '*');

        const options = new RequestOptions({ headers: headers });

        this.http.post(url, JSON.stringify(transData), options).subscribe(
            res => {
                console.log(res);
                modalCont.value = res.text();
                // alert(res.text());
            },
            err => {
                modalCont.value = 'Error occured';
                // alert('Error occured');
                console.log('Error occured');
            }
        );
    }
}
