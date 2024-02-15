import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";

interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

interface TgInitData {
  user: UserModel;
}

interface TgWindow {
  MainButton: TgButton;
  BackButton: TgButton;
  expand(): void;
  show(): void;
  close(): void;
  ready(): void;
  sendData(text: string): void;
  showAlert(text: string): void;
  initDataUnsafe: TgInitData;
}

@Injectable()
export class TelegramService {
  private window;
  tg: TgWindow;
  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
  }

  get mainButton(): TgButton {
    return this.tg.MainButton;
  }

  get backButton(): TgButton {
    return this.tg.BackButton;
  }

  ready() {
    this.tg.ready();
  }
}
