import {Component} from '@angular/core';
import {TelegramService} from "../../services/telegram.service";
import {HttpService} from "../../services/http.service";
import {Observable} from "rxjs";
import {MachineModel} from "../../models/machine.model";
import {OrderModel} from "../../models/order.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger("myAnimation", [
      transition("* => void", [
        style({opacity: 1}),
        animate(
          "1s 1s",
          style({
            opacity: 0
          })
        ),
      ]),
      transition("void => *", [
        style({opacity: 0}),
        animate(
          "1s 2s",
          style({
            opacity: 1
          })
        ),
      ]),
      // transition(":leave", [
      //   style({opacity: 1 }),
      //   animate(
      //     "1000ms",
      //     style({
      //       opacity: 0
      //     })
      //   ),
      // ]),
    ]),
  ]
})
export class HomeComponent {

  isMachinesLoaded = false;
  isAttachmentsLoaded = false;

  machineCounter = 1;
  attachmentCounter = 1;

  private phoneControl = new FormControl('', Validators.required);
  private placeControl = new FormControl('', Validators.required);
  private dateControl = new FormControl(new Date(), Validators.required);
  machineControl = new FormControl(null, Validators.required);
  private attachmentControl = new FormControl(null, Validators.required);

  myForm: FormGroup = new FormGroup({
    "phone": this.phoneControl,
    "place": this.placeControl,
    "date": this.dateControl,
    "machine": this.machineControl,
    "attachment": this.attachmentControl,
  });

  machines$: Observable<MachineModel[]> = this.httpService.getAllMachines();

  constructor(readonly telegramService: TelegramService,
              private readonly httpService: HttpService) {
  }

  ngOnInit(): void {
    this.telegramService.ready();
    this.telegramService.tg.expand();
    this.telegramService.mainButton.show();
    this.telegramService.backButton.show();


    this.telegramService.mainButton.setText('Сделать заказ');

    this.telegramService.mainButton.onClick(() => {
      if (this.myForm.valid) {
        this.httpService.createOrder(this.getData()).subscribe();
        // this.telegramService.tg.showAlert("Заявка оформлена. Водитель свяжется с Вами в течении 10 минут.");
        this.telegramService.tg.close();
      } else {
        this.telegramService.tg.showAlert("Заполните заявку!");
      }
    });

    this.httpService.getAllMachines().subscribe((data) => {
      console.log(data);
    });
  }

  private readonly getData = (): OrderModel => {
    return {
      machine: this.machineControl.value,
      attachment: this.attachmentControl.value,
      place: this.placeControl.value,
      phone: this.phoneControl.value,
      date: this.dateControl.value,
      user: this.telegramService.tg.initDataUnsafe.user
    };
  }

  readonly send = (): void => {
    this.httpService.createOrder(this.getData()).subscribe();
  }

  readonly showImages = (length: number, isMachine = true): void => {
    if (isMachine) {
      this.machineCounter === length ? this.isMachinesLoaded = true : this.machineCounter++;
    } else {
      this.attachmentCounter === length ? this.isAttachmentsLoaded = true : this.attachmentCounter++;
    }
  }
}
