import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {VerifyRequest} from "../../../models/VerifyRequest";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalService} from "../../../services/encryption/local.service";


@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  verifyForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService
    , private formBuilder: FormBuilder,
  private localService:LocalService) {
  }
  get f(): { [key: string]: AbstractControl } {
    return this.verifyForm.controls;
  }
  ngOnInit(): void {
    if(this.authService.getToken())
      this.authService.navigate()
    this.verifyForm = this.formBuilder.group({
        otp: ['', Validators.required],
        email: [this.localService.getData("email"), [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],

      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.verifyForm.invalid)
      return;
    this.authService.verify(
      new VerifyRequest(
        this.verifyForm.value['email'],
        this.verifyForm.value['otp'])
    );
  }

}
