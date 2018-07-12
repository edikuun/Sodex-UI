import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { TransferData } from '../model/model.transferdata';
import { ObservableArray } from 'wijmo/wijmo';
import { TransactionData } from '../model/model.transactiondata';
import { Subject, Observable } from '../../../node_modules/rxjs';

@Injectable()
export class ReportService {
    constructor(
        private router: Router,
        private http: Http,
    ) { }

    res: TransactionData[];

    getTransaction(card: string, start: string, end: string): any {
        // let account = AccountDetails;
        // YYYY-MM-DD
        // tslint:disable-next-line:prefer-const
        let gg: TransactionData[];
        const urls = 'http://api.sodex.io/api/Ledger/GetLedger/' + card + '/' + start + '/' + end;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const trans = new ObservableArray();

        this.http.get(urls).subscribe(
            response => {
                const results = new ObservableArray(response.json());
                // console.log(balanceField);
                // gg = {
                //     Id: 1, CardId: 2,
                //     CardNumber: 'sample string 3',
                //     LedgerDateTime: 'sample string 4',
                //     DebitAmount: 5.0,
                //     CreditAmount: 6.0,
                //     Particulars: 'sample string 7'
                //             };
                if (results.length > 0) {
                    for ( let i = 0; i <= results.length - 1; i++) {
                        trans.push({
                            Id: results[i].Id,
                            CardId: results[i].CardId,
                            CardNumber: results[i].CardNumber,
                            LedgerDateTime: results[i].LedgerDateTime,
                            DebitAmount: results[i].DebitAmount,
                            CreditAmount: results[i].CreditAmount,
                            Particulars: results[i].Particulars
                        });
                    }
                }
                console.log(trans);
                this.res = trans;
                console.log('TEST');
                console.log(this.res);
                // balanceField = trans;
                // console.log(balanceField);
            }
        );
    }
}
