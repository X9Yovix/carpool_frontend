import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RideService} from "../../../services/ride/ride.service";
import {RideInfo} from "../../../models/RideInfo";
import {RideRequestService} from "../../../services/ride/ride-request.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilterRideRequest} from "../../../models/FilterRideRequest";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {
  rides!: RideInfo[];
  page = 0;
  rideFilterForm!: FormGroup;


  ngOnInit(): void {
    this.getRides();
    this.rideFilterForm = this.fb.group({
      departure: [''],
      destination: [''],
      status: [''],
      minPrice: ['', Validators.pattern('^\d{1,3}(?:\.\d{1,2})?$')],
      maxPrice: ['', Validators.pattern('^\d{1,3}(?:\.\d{1,2})?$')]
    });
  }

  getRides() {
    this.rideService.getLatestRides(this.page, 10)
      .subscribe((res: any) => {
        this.rides = res.rides;
      });
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private rideService: RideService, private rideRequestService: RideRequestService) {

  }

  previousPage() {
    if (this.page > 0)
      this.goToPage(this.page - 1)
  }

  goToPage(number: number) {
    this.page = number
    this.getRides()
  }

  nextPage() {
    if (this.page < 5)
      this.goToPage(this.page + 1)
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
      ), this.page, 10).subscribe(
      (res: any) => {
        if (res.http_code != 200)
          console.log("Erreur");
        else
          this.rides = res.rides
      }
    )
  }
}
