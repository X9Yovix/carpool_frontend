import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class RideRequestService {



  private apiUrl = 'http://localhost:8089/api/ride-requests';

  constructor(private toastrService: ToastrService, private http: HttpClient, public router: Router) { }

  applyForRide(rideId:number): Observable<Object> {
    const url = `${this.apiUrl}/passenger/apply`;
    return this.http.post(url, rideId);
  }
  getAppliedRides(page: number, size: number, status?: string): Observable<Object> {
    const url = `${this.apiUrl}/passenger/applied`;
    const params = {
      page: page.toString(),
      size: size.toString(),
      status: status || ''
    };
    return this.http.get(url, { params });
  }
  getRequestedRidesForDriver(page: number, size: number): Observable<Object> {
    const url = `${this.apiUrl}/driver`;
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get(url, { params });
  }
  acceptRideRequest(rideRequestId: number): Observable<Object> {
    const url = `${this.apiUrl}/driver/accept?rideRequestId=${rideRequestId}`;
    return this.http.post(url, {});
  }
  declineRideRequest(rideRequestId: number): Observable<Object> {
    const url = `${this.apiUrl}/driver/decline?rideRequestId=${rideRequestId}`;
    return this.http.post(url, {});
  }
}
