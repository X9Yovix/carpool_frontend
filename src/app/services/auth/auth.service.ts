import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {LoginRequest} from 'src/app/models/LoginRequest';
import {RegisterRequest} from 'src/app/models/RegisterRequest';
import {ResetPasswordRequest} from "../../models/ResetPasswordRequest";
import {ForgotPasswordRequest} from "../../models/ForgotPasswordRequest";
import {ToastrService} from "ngx-toastr";
import {VerifyRequest} from "../../models/VerifyRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:8089/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private toastrService: ToastrService, private http: HttpClient, public router: Router) {
  }

  getRoles() {
    const token = this.getToken();
    if (token) {
      try {
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);

        if (decodedJwtData && decodedJwtData.roles) {
          return decodedJwtData.roles;
        } else {
          console.error("Roles not found in decoded JWT data.");
          return null;
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
      }
    } else {
      console.error("Token is null.");
      return null;
    }
  }

  register(user: RegisterRequest) {
    let api = `${this.endpoint}/register`;
    return this.http.post<any>(api, user).subscribe({
      next: (res) => {
        if (res.http_code !== 200) {
          this.toastrService.error(res.errors);
          return;
        }
        localStorage.setItem("email", user.email); // for the OTP REQUEST
        this.toastrService.success(res.message);
        this.router.navigateByUrl('/verify-account')
      },
      error: () => {
        this.toastrService.error("This email is already associated with an account");
        this.handleError.bind(this)
        ;
      } //
    });
  }

  verify(verifyRequest: VerifyRequest) {
    let api = `${this.endpoint}/verify-account`;
    return this.http.put<any>(api, verifyRequest).subscribe({
      next: (res) => {
        if (res.http_code !== 200) {
          this.toastrService.error(res.errors);
          return;
        }
        this.toastrService.success(res.message);
      },
      error: () => {
        this.toastrService.error("An error has occurred");
        this.handleError.bind(this)
      }
    });
  }

  // Sign-in
  login(user: LoginRequest) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe({
        next: (res) => {
          if (res.http_code !== 200) {
            this.toastrService.error(res.errors);
            return;
          }
          if (res.token) {
            localStorage.setItem('access_token', res.token);
            localStorage.setItem('first-name', res.firstName);
            localStorage.setItem('last-name', res.lastName);
            this.toastrService.success(res.message);
            this.navigate();
          }
        },
        error: () => {
          this.toastrService.error("An error occurred");
        }
      });
  }

  navigate() {
    console.log(this.getRoles())
    if (this.getRoles().indexOf('PASSENGER') != -1)
      this.router.navigateByUrl('/user');
    else if (this.getRoles().indexOf('DRIVER') != -1)
      this.router.navigateByUrl('/driver');
    else if (this.getRoles().indexOf('ADMIN') != -1)
      this.router.navigateByUrl('/admin');
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequest) {
    return this.http.post<any>(`${this.endpoint}/forgot-password`, forgotPasswordRequest)
      .subscribe({
        next: (res) => {
          if (res.http_code !== 200) {
            this.toastrService.error(res.errors);
            return;
          }
          this.toastrService.success(res.message);
          this.router.navigate(['/check-email', forgotPasswordRequest.email]);

        },
        error: () => {
          this.toastrService.error("An error occurred");
        }
      });
  }

  resetPassword(resetToken: string, resetPasswordRequest: ResetPasswordRequest) {
    return this.http.patch<any>(`${this.endpoint}/reset-password/${resetToken}`, resetPasswordRequest)
      .subscribe({
        next: (res) => {
          if (res.http_code !== 200) {
            this.toastrService.error(res.errors);
            return;
          }
          this.toastrService.success("Password changed successfully");
          this.router.navigateByUrl('/login');
          console.log(res);
        },
        error: () => {
          this.toastrService.error("An error occurred");
        }
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('first-name');
    localStorage.removeItem('last-name');
    this.toastrService.success("Logout successfully")
    this.router.navigateByUrl('/login');

  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg !:string;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
