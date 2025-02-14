import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListStateService {
  private _listState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get getListStateAsObs(): Observable<boolean> {
    return this._listState$.asObservable();
  }

  public set setListState(value: boolean) {
    this._listState$.next(value);
  }
}
