import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/http.service";
import {StateService} from "./services/state.service";
import {TelegramService} from "./services/telegram.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly httpService: HttpService,
              private readonly stateService: StateService,
              private readonly telegramService : TelegramService) {}

  ngOnInit(): void {
    this.telegramService.ready();
    this.telegramService.tg.expand();
    this.httpService.getAllMachines().subscribe(this.stateService.setMachines);
  }
}
