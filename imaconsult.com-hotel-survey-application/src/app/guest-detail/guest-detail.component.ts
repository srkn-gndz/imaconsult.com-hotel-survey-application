import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.scss']
})
export class GuestDetailComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.me();
  }

  me() {
    this.userService
    .me()
    .subscribe(response => {
      this.userService.user_me = response.body;
    });
  }

}
