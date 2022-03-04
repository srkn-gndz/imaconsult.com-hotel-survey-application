import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_name = '';
  user_password = '';
  hotel_id = '';
  constructor(private route : Router, public userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {
    if (this.user_name.length == 0 || this.user_password.length == 0 || this.hotel_id.length == 0) {
      this._snackBar.open('fill in all fields completely', '', {
        duration: 5000,
      });
    } else {
      this.userService
        .login({
          username: this.user_name,
          password: this.user_password,
          hotel_id: parseInt(this.hotel_id)
        })
        .subscribe(response => {
          this.userService.user = response.body;
          this.route.navigate(['guest-detail'])
        });
    }
  }

}
