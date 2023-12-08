import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { RideRequestService } from 'src/app/services/ride/ride-request.service';
import { RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  latestRides!: any[];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  countdown: { days: number, hours: number, minutes: number, seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  private countdownSubscriptions: Subscription[] = [];

  constructor(
    private rideService: RideService,
    private rideRequestService: RideRequestService,
    private authSerice: AuthService,
    private router: Router,
    private countdownService: CountdownService,
  ) { }


  ngOnInit(): void {
    this.getLatestRides(this.currentPage, this.itemsPerPage);
  }


  ngOnDestroy(): void {
    this.stopCountdown();
  }

  stopCountdown(): void {
    this.countdownSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.countdownSubscriptions = [];
    this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  getLatestRides(page: any, size: any) {
    this.stopCountdown();

    this.rideService.getLatestRides(page - 1, size).subscribe((res: any) => {
      this.latestRides = res.rides;
      this.latestRides.forEach(ride => this.startCountdown(ride.departureDate));
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

  get availableSeatsArray(): number[] {
    return Array.from({ length: this.latestRides.length }, (_, index) => index);
  }

  getAvatarImage(index: number): string {
    const ride = this.latestRides[index];
    const takenSeats = ride.carSeats - ride.carAvailableSeats;
    if (index < takenSeats) {
      return 'assets/img/avatar/avatar_2.png';
    } else {
      return 'assets/img/avatar/avatar_1.png';
    }
  }
}
