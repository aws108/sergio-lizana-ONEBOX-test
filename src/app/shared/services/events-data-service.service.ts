import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsDataServiceService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get('assets/data/events.json');
  }

  getEventsById(id:number): Observable<any> {
    return this.http.get(`assets/data/event-info-${id}.json`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'No hay datos para este evento';
    return throwError(() => new Error(errorMessage));
  }

  saveCartInfo(cartInfoToSave: any): void {
    sessionStorage.setItem('showCartInfo', JSON.stringify(cartInfoToSave));
  }

  getCartInfo(): any {
    const storedCartInfo = sessionStorage.getItem('showCartInfo');

    if(storedCartInfo) {
      return JSON.parse(storedCartInfo);
    } else{
      return [];
    }
  }
}
