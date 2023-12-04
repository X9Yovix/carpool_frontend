import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RideService} from "../../../services/ride/ride.service";
import {RideInfo} from "../../../models/RideInfo";
import {RideRequestService} from "../../../services/ride/ride-request.service";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {
  rides!: RideInfo[];
  page = 0;


  ngOnInit(): void {
    this.getRides();
  }

  getRides() {
    this.rideService.getLatestRides(this.page, 10)
      .subscribe((res: any) => {
        this.rides = res.rides;
      });
  }

  constructor(private http: HttpClient, private rideService: RideService, private rideRequestService: RideRequestService) {

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
}
