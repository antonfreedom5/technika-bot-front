import {Component, OnInit} from '@angular/core';
import {TelegramService} from "./services/telegram.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly telegramService: TelegramService, private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.telegramService.ready();
    this.telegramService.tg.expand();
    this.telegramService.MainButton.show();
    this.telegramService.MainButton.setText('Сделать заказ');
    this.telegramService.tg.show();

    this.telegramService.MainButton.onClick(() => {
      this.httpClient.post('http://localhost/backend', this.getData()).subscribe(() => {
        this.telegramService.tg.showAlert("Заявка оформлена. Водитель свяжется с Вами в течении 10 минут.");
        this.telegramService.tg.close();
      });
    });
  }

  private readonly getData = () => {
    const machineId = document.querySelector('input[name="machine"]:checked')['value'];
    const attachmentId = document.querySelector('input[name="machine"]:checked')['value'];
    const place = document.getElementById('place')['value'];
    const phone = document.getElementById('phone')['value'];
    const date = document.getElementById('date')['value'];
    return {machineId, attachmentId, place, phone, date};
  }
}
