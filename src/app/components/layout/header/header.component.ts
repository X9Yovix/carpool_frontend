import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/dark-mode.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalService } from 'src/app/services/encryption/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public darkModeService: DarkModeService,
    private localService: LocalService
    ) { }
  firstName: string | null = null;
  lastName: string | null = null;
  ngOnInit(): void {
    this.firstName = this.localService.getData('first-name') ;
    this.lastName = this.localService.getData('last-name') ;
  }
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

}
