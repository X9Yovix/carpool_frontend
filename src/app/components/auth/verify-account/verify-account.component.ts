import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {VerifyRequest} from "../../../models/VerifyRequest";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  verifyForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService
    , private formBuilder: FormBuilder) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.verifyForm.controls;
  }
  ngOnInit(): void {
    this.verifyForm = this.formBuilder.group({
        otp: ['', Validators.required]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.verifyForm.invalid)
      return;
    this.authService.verify(
      new VerifyRequest(
        localStorage.getItem("email"),
        this.verifyForm.value['otp'])
    );
  }

}
