import {Component, OnInit} from '@angular/core';
import {TelegramService} from "../../services/telegram.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {OrderModel} from "../../models/order.model";
import {StateService} from "../../services/state.service";
import {MatDialog} from "@angular/material/dialog";
import {SuccessDialogComponent} from "../../shared/success-dialog/success-dialog.component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  currentMachine = this.stateService.currentMachine.value;
  currentAttachment = this.stateService.currentAttachment.value;
  currentCategory = this.stateService.currentCategory.value;

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
    const commands = !!this.currentAttachment ? ['attachments'] : [''];

    this.telegramService.backButton.show();
    this.telegramService.backButton.onClick(() => this.router.navigate(commands));

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
      category: this.currentCategory,
      place: this.placeControl.value,
      phone: this.phoneControl.value,
      date: this.dateControl.value,
      user: this.telegramService.tg.initDataUnsafe.user
    };
  }

  readonly onclick = (): void => {
    this.httpService.createOrder(this.getData()).subscribe(() => {
        this.matDialog.open(SuccessDialogComponent).afterClosed().subscribe(() => {
          this.router.navigate(['']);
        })
      });
  }
}
