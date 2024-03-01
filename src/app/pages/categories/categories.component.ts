import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { Router } from "@angular/router";
import { TelegramService } from "../../services/telegram.service";
import { MachineModel } from "../../models/machine.model";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  currentMachine = this.stateService.currentMachine.value.name;
  categories = this.stateService.currentMachine.value.categories.sort((a, b) => a.id - b.id);

  constructor(private readonly stateService: StateService,
              private readonly router: Router,
              private readonly telegramService: TelegramService) {}

  ngOnInit(): void {
    this.telegramService.mainButton.hide();
    this.telegramService.backButton.show();
    this.telegramService.backButton.onClick(() => this.router.navigate(['']));
  }

  readonly choose = (category: MachineModel): void => {
    this.stateService.setCurrentCategory(category);
    this.router.navigate(['attachments']);
  }

  readonly back = (): void => {
    this.router.navigate(['']);
  }
}
