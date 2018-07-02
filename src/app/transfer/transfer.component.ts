import { Component, OnInit } from '@angular/core';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  modalText = '';

  constructor(
    private transferService: TransferService
  ) { }

  ngOnInit() { }

  toggle() {
    // TODO: Add API for Check Balance
    const sourceCard = (<HTMLInputElement>document.getElementById('sourceCardNo'));
    const destCard = (<HTMLInputElement>document.getElementById('destCardNo'));
    const transferBut = (<HTMLInputElement>document.getElementById('transferId'));
    const sourceBalance = (<HTMLInputElement>document.getElementById('sourceBalance'));
    const amountId = (<HTMLInputElement>document.getElementById('amountId'));
    const lockId = (<HTMLInputElement>document.getElementById('lockId'));
    if (sourceCard.readOnly === true) {
      sourceCard.readOnly = false;
      destCard.readOnly = false;
      amountId.readOnly = false;
      transferBut.disabled = true;
      transferBut.setAttribute('style', 'pointer-events: none;');
      lockId.innerHTML = 'Lock';
    }
    // tslint:disable-next-line:one-line
    else {
      sourceCard.readOnly = true;
      destCard.readOnly = true;
      amountId.readOnly = true;
      transferBut.disabled = false;
      transferBut.removeAttribute('style');
      lockId.innerHTML = 'Unlock';
      this.transferService.getBalance(parseInt(sourceCard.value, 10), sourceBalance);
    }

  }

  transfer() {
    let transferdata;
    const sourceCard = (<HTMLInputElement>document.getElementById('sourceCardNo'));
    const destCard = (<HTMLInputElement>document.getElementById('destCardNo'));
    const amount = (<HTMLInputElement>document.getElementById('amountId'));
    const modalCont = (<HTMLInputElement>document.getElementById('modalContext'));
    transferdata = {
      SourceCardNumber: sourceCard.value,
      DestinationCardNumber: destCard.value,
      Amount: parseInt(amount.value, 10),
      Particulars: 'Initial ON Semi Load'
    };

    this.transferService.transfer(transferdata, modalCont);

    console.log(JSON.stringify(transferdata));
  }

}
