import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

// интерфейс для функционала кнопок
interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

interface TgWindow {
  mainButton: TgButton;
  backButton: TgButton;
  expand(): void;
  show(): void;
  close(): void;
  ready(): void;
  sendData(text: string): void;
  showAlert(text: string): void;
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private window;
  tg: TgWindow;
  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
  }

  get MainButton(): TgButton {
    return this.tg.mainButton;
  }

  get BackButton(): TgButton {
    return this.tg.backButton;
  }

  sendData(data: object) {
    this.tg.sendData(JSON.stringify(data));
  }

  ready() {
    this.tg.ready();
  }
}
