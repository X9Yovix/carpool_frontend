import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { RideService } from "../../../services/ride/ride.service";
import { RideInfo } from "../../../models/RideInfo";
import { RideRequestService } from "../../../services/ride/ride-request.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FilterRideRequest } from "../../../models/FilterRideRequest";
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css'],
})
export class RideComponent implements OnInit, OnDestroy {
  rides!: RideInfo[];
  totalItems: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  rideFilterForm!: FormGroup;

  countdown: { days: number, hours: number, minutes: number, seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  private countdownSubscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private rideService: RideService,
    private rideRequestService: RideRequestService,
    private countdownService: CountdownService,
  ) { }



  ngOnInit(): void {
    this.getRides(this.currentPage, this.itemsPerPage);
    this.rideFilterForm = this.fb.group({
      departure: [''],
      destination: [''],
      status: [''],
      minPrice: ['', Validators.pattern('^\d{1,3}(?:\.\d{1,2})?$')],
      maxPrice: ['', Validators.pattern('^\d{1,3}(?:\.\d{1,2})?$')]
    });
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  stopCountdown(): void {
    this.countdownSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.countdownSubscriptions = [];
    this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  getRides(page: any, size: any) {
    this.stopCountdown();

    this.rideService.getLatestRides(page - 1, size).subscribe((res: any) => {
      this.rides = res.rides;
      this.totalItems = res.totalElements;
      this.rides.forEach(ride => this.startCountdown(ride.departureDate));
    });
  }


  startCountdown(dateDep: Date): void {
    const countdownDate = new Date(dateDep);
    this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
    this.stopCountdown();
  
    const subscription: Subscription = this.countdownService.startCountdown(countdownDate).subscribe(distance => {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      this.countdown = { days, hours, minutes, seconds };
    });
  
    this.countdownSubscriptions.push(subscription);
  }
  


  request(id: number) {
    this.rideRequestService.applyForRide(id).subscribe(
      (res: any) => {
        if (res.http_code == 200)
          console.log("Ride " + id + " requested successfully")
      }
    )
  }

  getFiltredRide() {
    this.rideService.filterRides(
      new FilterRideRequest(
        this.rideFilterForm.value['departure'],
        this.rideFilterForm.value['destination'],
        this.rideFilterForm.value['status'],
        this.rideFilterForm.value['minPrice'],
        this.rideFilterForm.value['maxPrice']
      ), this.currentPage - 1, this.itemsPerPage).subscribe(
        (res: any) => {
          if (res.http_code != 200)
            console.log("Erreur");
          else
            this.rides = res.rides
        }
      )
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRides(this.currentPage, this.itemsPerPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRides(this.currentPage, this.itemsPerPage);
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.getRides(this.currentPage, this.itemsPerPage);
    }
  }
}
