import { Injectable } from '@angular/core';

@Injectable()
export class UserAgentService {

  get isDesktop() {
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent));
  }
}
