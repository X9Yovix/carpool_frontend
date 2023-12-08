import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalService } from 'src/app/services/encryption/local.service';

@Component({
  selector: 'app-driverDashboard',
  templateUrl: './driverDashboard.component.html',
  styleUrls: ['./driverDashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {

  firstName: string | null = null;
  lastName: string | null = null;
  imgUrl: string ='http://localhost:8089/api';
  constructor(
    private router: Router,
    public authService: AuthService,
    private localService: LocalService
  ) { }


  ngOnInit(): void {
    this.firstName = this.localService.getData('first-name');
    this.lastName = this.localService.getData('last-name');
    this.imgUrl = this.imgUrl + this.localService.getData('imgUrl');
  }

}
