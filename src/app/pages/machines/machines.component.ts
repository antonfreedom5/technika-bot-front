import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { Router } from "@angular/router";
import { MachineModel } from "../../models/machine.model";
import { TelegramService } from "../../services/telegram.service";
import { map } from "rxjs";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss'
})
export class MachinesComponent implements OnInit {

  machines$ = this.stateService.machines$.pipe(map(machines => machines?.sort((a, b) => a.id - b.id)));

  constructor(private readonly stateService: StateService,
              private readonly telegramService: TelegramService,
              private readonly router: Router) {
  }

  readonly choose = (machine: MachineModel): void => {
    const commands = machine.categories?.length > 0 ? [ 'categories' ] : machine.attachments.length > 0 ? [ 'attachments' ] : [ 'contacts' ];
    this.stateService.setCurrentMachine(machine);
    this.router.navigate(commands);
  }

  ngOnInit(): void {
    this.stateService.currentAttachment.next(null);
    this.stateService.currentCategory.next(null);
    this.telegramService.backButton.hide();
    this.telegramService.mainButton.hide();
  }
}
