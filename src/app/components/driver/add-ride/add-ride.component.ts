import {Component, OnInit} from '@angular/core';
import {RideService} from "../../../services/ride/ride.service";
import {AddRideRequest} from "../../../models/AddRideRequest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent implements OnInit{
  rideForm!: FormGroup;

  constructor(private rideService: RideService,private formBuilder:FormBuilder) {
  }
  addRide(){
    this.rideService.addRide(new AddRideRequest(
      this.rideForm.value['depart'],
      this.rideForm.value['arrive'],
      this.rideForm.value['nombrePlace'],
      this.rideForm.value['price'],
      this.rideForm.value['time'],

    ));
  }

  ngOnInit(): void {
    this.rideForm = this.formBuilder.group({
      time: ['', [Validators.required, ]],
      price: ['', [Validators.required, ]],
      nombrePlace: ['', [Validators.required, ]],
      depart: ['', [Validators.required, ]],
      arrive: ['', [Validators.required, ]],
    });

  }
}
