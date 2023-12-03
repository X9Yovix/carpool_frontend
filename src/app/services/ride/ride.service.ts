import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Ride} from "../../models/Ride";
import {AddRideRequest} from "../../models/AddRideRequest";
import {FilterRideRequest} from "../../models/FilterRideRequest";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private apiUrl = 'http://localhost:8089/api/rides';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  createRide(request: AddRideRequest): Observable<Object> {
    const url = `${this.apiUrl}/driver`;
    return this.http.post(url, request);
  }

  getRidesCreatedByAuthenticatedDriver(): Observable<Ride[]> {
    const url = `${this.apiUrl}/driver`;
    return this.http.get<Ride[]>(url);
  }

  filterRides(request: FilterRideRequest, page: number, size: number): Observable<Ride[]> {
    const url = `${this.apiUrl}/filter`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // @ts-ignore
    return this.http.get<Ride[]>(url,  { params: {
        params,
        request,
      }});
  }

  getLatestRides(page: number, size: number): Observable<Ride[]> {
    const url = `${this.apiUrl}/latest`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Ride[]>(url, {params});
  }

  handleError(error: HttpErrorResponse) {
    let msg !:string;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
