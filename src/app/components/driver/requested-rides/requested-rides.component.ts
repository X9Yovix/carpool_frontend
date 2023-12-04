import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {RideRequestService} from "../../../services/ride/ride-request.service";

@Component({
  selector: 'app-requested-rides',
  templateUrl: './requested-rides.component.html',
  styleUrls: ['./requested-rides.component.css']
})
export class RequestedRidesComponent implements OnInit {
  constructor(private toaster: ToastrService, private rideRequestService: RideRequestService) {
  }

  rides!: any[];
  page = 0;

  ngOnInit(): void {
    this.getRequestedRides();
  }

  getRequestedRides() {
    this.rideRequestService.getRequestedRidesForDriver(this.page, 10).subscribe(
      (res: any) => {
        if (res.http_code != 200)
          this.toaster.error(res.message)
        else
          this.rides = res.ridesRequest
      }
    );

  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getRequestedRides()
    }
  }

  nextPage() {
    if (this.page < 3) {
      this.page++;
      this.getRequestedRides()
    }
  }

  goToPage(number: number) {
    if (this.page != number) {
      this.getRequestedRides()
    }
  }

  confirm(id: number) {
    this.rideRequestService.acceptRideRequest(id).subscribe(
      (res: any) => {
        if (res.http_code != 200)
          this.toaster.error("Error")
        else {
          this.toaster.success("Ride Request Accepted");
          this.rides = this.rides.filter((r) => r.id != id);
        }
      }
    )
  }

  decline(id: number) {
    this.rideRequestService.declineRideRequest(id).subscribe(
      (res: any) => {
        if (res.http_code != 200)
          this.toaster.error("Error")
        else {
          this.toaster.warning("Ride Request Declined");
          this.rides = this.rides.filter((r) => r.id != id);
        }
      }
    )
  }
}
