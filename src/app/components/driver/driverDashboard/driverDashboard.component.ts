import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-driverDashboard',
  templateUrl: './driverDashboard.component.html',
  styleUrls: ['./driverDashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
