import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Ride} from "../../models/Ride";
import {UpdateRideRequest} from "../../models/UpdateRideRequest";
import {AddRideRequest} from "../../models/AddRideRequest";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private baseUrl = 'http://localhost:8089/api/ride';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  addRide(addRideRequest: AddRideRequest): Observable<Ride> {
    return this.http.post<Ride>(`${this.baseUrl}/add`, addRideRequest);
  }

  findByDepart(depart: string): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.baseUrl}/find/depart/${depart}`);
  }

  findByArrive(arrive: string): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.baseUrl}/find/arrive/${arrive}`);
  }

  findByTime(time: string): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.baseUrl}/find/date/${time}`);
  }

  findAllRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(`${this.baseUrl}/find/all`);
  }

  updateRide(id: number, ride: UpdateRideRequest): Observable<Ride> {
    return this.http.put<Ride>(`${this.baseUrl}/update/${id}`, ride);
  }

  deleteRide(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
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
