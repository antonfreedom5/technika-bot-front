import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {Router} from "@angular/router";
import {MachineModel} from "../../models/machine.model";
import {TelegramService} from "../../services/telegram.service";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss'
})
export class MachinesComponent implements OnInit {
  isMachinesLoaded = false;
  machineCounter = 1;

  machines$ = this.stateService.machines$;

  constructor(private readonly stateService: StateService,
              private readonly telegramService: TelegramService,
              private readonly router: Router) {}

  readonly choose = (machine: MachineModel): void => {
    this.stateService.setCurrentMachine(machine);
    this.router.navigate(['attachments']);
  }

  readonly showImages = (length: number): void => {
    this.machineCounter === length ? this.isMachinesLoaded = true : this.machineCounter++;
  }

  ngOnInit(): void {
    this.telegramService.backButton.hide();
    this.telegramService.mainButton.hide();
  }
}
