import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { MachineModel } from "../models/machine.model";
import { OrderModel } from "../models/order.model";
import { SuggestResponseModel } from "../models/suggest-response.model";

@Injectable()
export class HttpService {
  private readonly BASE_URL = "https://zbuduem.by/backend/";
  private readonly LOCAL_URL = "http://localhost:8080/";

  constructor(private readonly httpClient: HttpClient) {}

  readonly getAllMachines = (userId: number = 0): Observable<MachineModel[]> =>
    this.httpClient.get<MachineModel[]>(this.BASE_URL + "machines/all", { headers: new HttpHeaders({ 'user-id': userId }) });

  readonly createOrder = (order: OrderModel): Observable<void> => {
    return this.httpClient.post<void>(this.BASE_URL + "orders/save", order);
  }

  readonly search = (query: string): Observable<SuggestResponseModel> =>
    this.httpClient.get<SuggestResponseModel>(this.BASE_URL + "search/city?query=" + query);
}
