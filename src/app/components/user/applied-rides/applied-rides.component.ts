import {Component, OnInit} from '@angular/core';
import {RideRequestService} from "../../../services/ride/ride-request.service";

@Component({
  selector: 'app-applied-rides',
  templateUrl: './applied-rides.component.html',
  styleUrls: ['./applied-rides.component.css']
})
export class AppliedRidesComponent implements OnInit{
  page=0;
  status="";
  rides!: any[];
  constructor(private requestRideService:RideRequestService) {
  }

  ngOnInit(): void {
  this.getAppliedRides();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getAppliedRides()
    }
  }
  getAppliedRides(){
    this.requestRideService.getAppliedRides(this.page,10,this.status)
      .subscribe((res:any)=> {
        if(res.http_code!=200)
          console.log("Erreur !")
        else
        this.rides = res.ridesRequest
      });
  }

  nextPage() {
    if (this.page < 4) {
      this.page++;
      this.getAppliedRides()
    }
  }

  goToPage(number: number) {
    if (this.page != number) {
      this.page = number;
      this.getAppliedRides()
    }
  }
}
