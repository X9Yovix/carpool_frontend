import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-userDashboard',
  templateUrl: './userDashboard.component.html',
  styleUrls: ['./userDashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

}
