import {Component, OnInit} from '@angular/core';
import {RideService} from "../../../services/ride/ride.service";

@Component({
  selector: 'app-list-driver-rides',
  templateUrl: './list-driver-rides.component.html',
  styleUrls: ['./list-driver-rides.component.css']
})
export class ListDriverRidesComponent implements OnInit{

  driverRides!:any[];
  page=0;
  ngOnInit(): void {
    this.getDriverRides();
  }

  constructor(private rideService:RideService) {
  }

  getDriverRides(){
    this.rideService.getRidesCreatedByAuthenticatedDriver().subscribe(
      (res:any)=>this.driverRides=res.rides
    )
  }
  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getDriverRides()
    }
  }

  nextPage() {
    if (this.page < 3) {
      this.page++;
      this.getDriverRides()
    }
  }

  goToPage(number: number) {
    if (this.page != number) {
      this.getDriverRides()
    }
  }

}
