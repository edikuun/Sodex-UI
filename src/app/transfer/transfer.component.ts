import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { TransferService } from './transfer.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AfService } from '../providers/af.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import {MatSnackBar} from '@angular/material';

export interface DialogData {
  amount: number;
  balance: string;
}
// tslint:disable-next-line:component-class-suffix
@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
  <div mat-dialog-content>
  <div class="forms-row align-items-center">
    <div class="col-sm-4 my-1">
    <h2 mat-dialog-title>Balance: {{data.balance}}</h2>
    </div>
  </div>
  <div class="col-sm-4 my-1">
  <form #myform="ngForm">
  <mat-form-field>
  <input cdkFocusInitial ng-reflect-model=" " #inAmount id="inputAmount" type="number" matInput placeholder="Enter Amount"
  [(ngModel)]="data.amount" name="amount">
  <span matPrefix>P&nbsp;</span>
</mat-form-field>
  </form>
    </div>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Close</button>
    <button mat-button color="warn" id="test" [mat-dialog-close]="data.amount">Transfer</button>
  </div>
  `
})

export class DialogOverviewExampleDialogComponent implements OnInit {
  @ViewChild('myform') amountModal;
  @ViewChild('inAmount') inAmount;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  focus() {
    document.getElementById('test').focus();
  }

  ngOnInit() {
    this.amountModal.resetForm();
    this.inAmount.value = '';
  }

  transfer() {
    this.dialogRef.close(this.data.amount);
  }
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  private motherCardONSEMI = 14049476;
  private motherSODEX = 13956496;
  amount: number = null;
  balance: string;

  constructor(
    private transferService: TransferService,
    private modalService: NgbModal,
    public auth: AfService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  openDialog(): void {
    const destCard = (<HTMLInputElement>document.getElementById('destCardNo'));
    const destBalance = (<HTMLInputElement>document.getElementById('destBalance'));
    // console.log(this.transferService.destAmount + 'GG');

    setTimeout(() => {
      // console.log('SADSAD' + destBalance.value);
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
        width: '350px',
        data: { amount: this.amount = null, balance: this.transferService.destAmount }
      });
      // dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe(result => {
        if (result == null) {
          console.log('The dialog was closed');
          this.amount = result;
          // console.log(this.amount);
          // destCard.value = '';
          // destBalance.value = '';
          // destCard.focus();
        } else {
          console.log('The dialog was closed');
          this.amount = result;
          // console.log(this.amount);
          // console.log('TRANSFER');
          // destCard.value = '';
          // destBalance.value = '';
          // destCard.focus();
          this.transferModal();
        }
      });
    }, 1000);

  }


  focus() {
    const transferBut = (<HTMLInputElement>document.getElementById('transferModalBut'));
    transferBut.focus();
  }

  toggle() {
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
    } else {
      sourceCard.readOnly = true;
      destCard.readOnly = true;
      amountId.readOnly = true;
      transferBut.disabled = false;
      transferBut.removeAttribute('style');
      lockId.innerHTML = 'Unlock';
    }

  }

  checkSource() {
    const sourceCard = (<HTMLInputElement>document.getElementById('sourceCardNo'));
    const sourceBalance = (<HTMLInputElement>document.getElementById('sourceBalance'));
    if (this.auth.isAdmin()) {
      this.transferService.getBalance(this.motherSODEX, sourceBalance);
    } else {
      this.transferService.getBalance(this.motherCardONSEMI, sourceBalance);
    }
  }

  checkDest() {
    const destCard = (<HTMLInputElement>document.getElementById('destCardNo'));
    const destBalance = (<HTMLInputElement>document.getElementById('destBalance'));
    const amountId = (<HTMLInputElement>document.getElementById('amountId'));
    this.transferService.getBalanceDest(parseInt(destCard.value, 10), destBalance);
  }

  onKeydown(event) {
    const amountId = (<HTMLInputElement>document.getElementById('amountId'));
    this.openDialog();
    this.checkDest();
  }

  transferModal() {
    let transferdata;
    const sourceCard = (<HTMLInputElement>document.getElementById('sourceCardNo'));
    const destCard = (<HTMLInputElement>document.getElementById('destCardNo'));
    const amount = (<HTMLInputElement>document.getElementById('amountId'));
    const modalCont = (<HTMLInputElement>document.getElementById('modalContext'));
    const destBalance = (<HTMLInputElement>document.getElementById('destBalance'));
    const username = this.auth.userDetails.email;
    if (this.auth.isAdmin()) {
      transferdata = {
        SourceCardNumber: this.motherSODEX,
        DestinationCardNumber: destCard.value,
        Amount: this.amount,
        Particulars: username + ' Transfer'
      };
    } else {

      transferdata = {
        SourceCardNumber: this.motherCardONSEMI,
        DestinationCardNumber: destCard.value,
        Amount: this.amount,
        Particulars: username + ' Transfer'
      };
    }

    this.transferService.transfer(transferdata, destCard, destBalance, amount);
    // console.log(JSON.stringify(transferdata));
  }

  transfer() {
    let transferdata;
    const destCard = (<HTMLInputElement>document.getElementById('destCardNo'));
    const amount = (<HTMLInputElement>document.getElementById('amountId'));
    const destBalance = (<HTMLInputElement>document.getElementById('destBalance'));
    const username = this.auth.userDetails.email;
    if (this.auth.isAdmin()) {
      transferdata = {
        SourceCardNumber: this.motherSODEX,
        DestinationCardNumber: destCard.value,
        Amount: parseInt(amount.value, 10),
        Particulars: username + ' Transfer'
      };
    } else {
      transferdata = {
        SourceCardNumber: this.motherCardONSEMI,
        DestinationCardNumber: destCard.value,
        Amount: parseInt(amount.value, 10),
        Particulars: username + ' Transfer'
      };
    }

    this.transferService.transfer(transferdata, destCard, destBalance, amount);

    console.log(JSON.stringify(transferdata));

  }

}
