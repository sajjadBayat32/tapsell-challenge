import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { IList } from '../models';
import { Observable } from 'rxjs';
import { IError } from '../models/error';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private baseHttp: HttpClient) {}

  getMainLst(): Observable<IList> {
    return this.baseHttp.get<IList>(environment.baseUrl + 'mainList');
  }

  getAllLists(): Observable<IList[]> {
    return this.baseHttp.get<IList[]>(environment.baseUrl + 'lists');
  }

  InsertList(list: IList): Observable<IList | IError> {
    return this.baseHttp.post<IList | IError>(
      environment.baseUrl + 'lists',
      list
    );
  }

  findListById(listId: string): Observable<IList> {
    return this.baseHttp.get<IList>(environment.baseUrl + 'lists/' + listId);
  }

  updateListById(listId: string, list: Omit<IList | IError, 'id'>) {
    return this.baseHttp.put(environment.baseUrl + 'lists/' + listId, list);
  }

  deleteListById(listId: string) {
    return this.baseHttp.delete(environment.baseUrl + 'lists/' + listId);
  }
}
