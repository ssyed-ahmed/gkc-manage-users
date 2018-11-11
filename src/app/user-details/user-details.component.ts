import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router/src/shared';
import { User } from '../user';
import { PhoneFormat } from '../phoneformat.pipe';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private userService: UserService, 
    private location: Location,
    
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.userId = id;
      
      this.userService.getUser(id)
        .subscribe(user => { 
          this.user = user;
        });
    })
  }

  goBack(): void {
    this.router.navigate(['users', {id: this.userId}]);
  }
}

