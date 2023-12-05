import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-driverDashboard',
  templateUrl: './driverDashboard.component.html',
  styleUrls: ['./driverDashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {

  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit() {
  }

}
