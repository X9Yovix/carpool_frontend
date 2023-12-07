import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RideRequestService } from 'src/app/services/ride/ride-request.service';
import { RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  latestRides!: any[];

  constructor(
    private rideService: RideService,
    private rideRequestService: RideRequestService,
    private authSerice: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rideService.getLatestRides(0, 10).subscribe(
      (res: any) => {
        this.latestRides = res.rides
      }
    );

  }

  viewRideDetails(rideId: number): void {
    // this.router.navigate(['/ride-details', rideId]);
    console.log('View ride details for ride ID:', rideId);
  }

  joinRide(rideId: number): void {
    if (this.authSerice.getToken()) {
      this.rideRequestService.applyForRide(rideId).subscribe(
        (response) => {
          console.log('Successfully joined the ride:', response);
        },
        (error) => {
          console.error('Error joining the ride:', error);
        }
      );
      console.log('Join ride with ID:', rideId);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
