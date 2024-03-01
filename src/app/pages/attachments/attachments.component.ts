import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {map} from "rxjs";
import {MachineModel} from "../../models/machine.model";
import {Router} from "@angular/router";
import {TelegramService} from "../../services/telegram.service";

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent implements OnInit {

  currentMachine = this.stateService.currentMachine.value.name;
  attachments = this.stateService.currentMachine.value.attachments.sort((a, b) => a.id - b.id);

  constructor(private readonly stateService: StateService,
              private readonly router: Router,
              private readonly telegramService: TelegramService) {}

  ngOnInit(): void {
    this.telegramService.mainButton.hide();
    this.telegramService.backButton.show();
    const commands = this.stateService.currentCategory.value ? ['categories'] : ['']
    this.telegramService.backButton.onClick(() => this.router.navigate(commands));
  }

  readonly choose = (attachment: MachineModel): void => {
    this.stateService.setCurrentAttachment(attachment);
    this.router.navigate(['contacts']);
  }

  readonly back = (): void => {
    this.router.navigate(['']);
  }
}
