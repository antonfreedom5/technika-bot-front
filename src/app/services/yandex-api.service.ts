import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { map, Observable, of } from "rxjs";

import {AppConfigService} from "./app-config.service";

@Injectable()
export class YandexApiService {

  constructor(private http: HttpClient, private readonly appConfigService: AppConfigService) {}

  getCitySuggestions(query: string): Observable<string[]> {
    if (query.length < 2) return of([]);

    const url = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${this.appConfigService.key}&text=${query}&lang=ru_RU&types=locality&bbox=23.1783,51.2577~32.7768,56.1719&strict_bounds=1&results=3`;

    return this.http.get<any>(url).pipe(
      map(response => response.results.map((item: any) => {
        return !!item.subtitle ? item.title.text + ', ' + item.subtitle.text : item.title.text;
      }))
    );
  }
}
