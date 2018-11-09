import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: User = new User(
    '',
    '',
    '',
    [],
    0,
    ''
  )

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  addInterest(interest): void {
    this.newUser.interests.push(interest);
  }

  deleteInterest(interest: string): void {
    let index = this.newUser.interests.indexOf(interest);
    if (index !== -1) {
      this.newUser.interests.splice(index, 1);
    }
  }

  onAddUser(): void {
    this.router.navigate(['users']);
  }
}
