import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/http.service";
import {StateService} from "./services/state.service";
import {TelegramService} from "./services/telegram.service";
import {UserAgentService} from "./services/user-agent.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly httpService: HttpService,
              private readonly stateService: StateService,
              public readonly userAgentService: UserAgentService,
              private readonly telegramService : TelegramService) {}

  ngOnInit(): void {
    this.telegramService.ready();
    this.telegramService.tg.expand();
    this.httpService.getAllMachines(this.telegramService.tg.initDataUnsafe.user?.id).subscribe(this.stateService.setMachines);
  }
}
