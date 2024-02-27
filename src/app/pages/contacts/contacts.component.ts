import {Component, OnInit} from '@angular/core';
import {TelegramService} from "../../services/telegram.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {OrderModel} from "../../models/order.model";
import {StateService} from "../../services/state.service";
import {MatDialog, MatDialogClose} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  currentMachine = this.stateService.currentMachine.value;
  currentAttachment = this.stateService.currentAttachment.value;

  private phoneControl = new FormControl('+375', [Validators.required, Validators.pattern("\\+375\\(\\d{2}\\)\\d{3}-\\d{2}-\\d{2}")]);
  private placeControl = new FormControl('', Validators.required);
  private dateControl = new FormControl(null, Validators.required);

  myForm: FormGroup = new FormGroup({
    "phone": this.phoneControl,
    "place": this.placeControl,
    "date": this.dateControl
  });

  constructor(public readonly telegramService: TelegramService,
              private readonly stateService: StateService,
              private readonly httpService: HttpService,
              private readonly matDialog: MatDialog,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.telegramService.backButton.show();
    this.telegramService.backButton.onClick(() => this.router.navigate(['attachments']));

    this.telegramService.mainButton.show();

    this.telegramService.mainButton.setText('Сделать заказ');

    this.telegramService.mainButton.onClick(() => {
      if (this.myForm.valid) {
        this.httpService.createOrder(this.getData()).subscribe(() => {
          this.telegramService.tg.close();
        });
      } else {
        this.telegramService.tg.showAlert("Заполните все поля, чтобы мы смогли найти Вам водителя");
      }
    });
  }

  private readonly getData = (): OrderModel => {
    return {
      machine: this.currentMachine,
      attachment: this.currentAttachment,
      place: this.placeControl.value,
      phone: this.phoneControl.value,
      date: this.dateControl.value,
      user: this.telegramService.tg.initDataUnsafe.user
    };
  }

  readonly onclick = (): void => {
    this.httpService.createOrder(this.getData()).subscribe(() => {
        this.matDialog.open(SuccessDialog).afterClosed().subscribe(() => {
          this.router.navigate(['']);
        })
      });
  }
}

@Component({
  selector: 'success-dialog',
  template: '<div><p>Ваша заявка принята!</p><button mat-button mat-dialog-close>Понятно</button></div>',
  styles: 'div {width: 300px; display: flex;\n' +
    '    text-align: center;\n' +
    '    height: 150px;\n' +
    '    flex-direction: column;\n' +
    '    /* align-content: center; */\n' +
    '    justify-content: center;} p {margin-bottom: 30px}',
  standalone: true,
  imports: [MatDialogClose, MatButtonModule]
})
export class SuccessDialog {
}
