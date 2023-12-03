import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RideService} from "../../../services/ride/ride.service";
import {RideInfo} from "../../../models/RideInfo";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit{
  rides!:RideInfo[] ;
  page =1;


  ngOnInit(): void {
   this.getRides();
  }
  getRides(){
    this.rideService.getLatestRides(this.page,10)
      .subscribe((res:any)=> {
        this.rides = res.rides;
        console.log(this.rides)
      });
  }

  constructor(private http:HttpClient,private rideService:RideService) {

  }

  previousPage() {
    if(this.page>1)
      this.goToPage(this.page-1)
  }

  goToPage(number: number) {
    this.page=number
    this.getRides()
  }

  nextPage() {
    if(this.page<7)
      this.goToPage(this.page+1)


  }
}
