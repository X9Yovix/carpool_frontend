import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice:AuthService,private formBuilder: FormBuilder){
  }
  userForm!: FormGroup;

  ngOnInit() {
    if (this.authservice.getToken()!= null)
      this.authservice.navigate();

      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: ['', Validators.required]
      });

  }

  onLogin(){
    if (this.userForm.invalid) {
      return;
    }
    this.authservice.login(new LoginRequest(this.userForm.value['email'],this.userForm.value['password']));
  }

}
