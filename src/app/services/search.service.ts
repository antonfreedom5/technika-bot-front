import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { SuggestResult } from "../models/suggest-response.model";
import { HttpService } from "./http.service";

@Injectable()
export class SearchService {

  constructor(private httpService: HttpService) {}

  search(query: string): Observable<string[]> {
    if (query.length < 2) return of([]);

    return this.httpService.search(query).pipe(
      map(response => response.results.map((item: SuggestResult) => {
        return !!item.subtitle ? item.title.text + ', ' + item.subtitle.text : item.title.text;
      }))
    );
  }
}
