import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  private loaderTimeout: any;

  show(delay: number = 200): void {
    clearTimeout(this.loaderTimeout);
    this.loaderTimeout = setTimeout(() => {
      this._loading.next(true);
    }, delay);
  }

  hide(): void {
    clearTimeout(this.loaderTimeout);
    this._loading.next(false);
  }
}
