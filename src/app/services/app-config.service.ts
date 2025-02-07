import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

export let environment = {
  apiKey: 'key'
}

@Injectable()
export class AppConfigService {

  private config;

  constructor(private readonly http: HttpClient) {}

  public async loadAppConfig(): Promise<void> {
    this.config = await firstValueFrom(this.http.get('/assets/data/app-config.json')) as any;
  }

  get key(): string {
    return this.config["api_key"];
  }
}
