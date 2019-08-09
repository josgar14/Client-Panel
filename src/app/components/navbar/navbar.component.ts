import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/client';
import { SettingsService } from '../../services/settings.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
	isLoggedIn: boolean;
	loggedInUser: string;
	showRegister: boolean;

	constructor(
		private authService: AuthService,
		private router: Router,
		private flashMessage: FlashMessagesService,
		private settingsService: SettingsService
	) {}

	ngOnInit() {
		this.authService.getAuth().subscribe((auth) => {
			if (auth) {
				this.isLoggedIn = true;
				this.loggedInUser = auth.email;
				console.log('truth');
			} else {
				this.isLoggedIn = false;
				console.log('false');
			}
		});

		this.showRegister = this.settingsService.getSettings().allowRegistration;
	}

	onLogoutClick() {
		this.authService.logout();
		this.flashMessage.show('You are now looged out', {
			cssClass: 'alert-success',
			timeout: 4000
		});
		this.router.navigate([ '/login' ]);
	}
}
